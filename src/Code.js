var isDailyTriggerSet = false;

function onOpen() {
    var userName = Session.getActiveUser().getEmail();
    Logger.log("Sheet opened by " + userName);

    var trigerMenuItemName = 'Toggle daily trigger (';
    if (isDailyTriggerSet)
        trigerMenuItemName += 'On)';
    else
        trigerMenuItemName += 'Off)';

    var menu = [
        { name: 'Send notifications', functionName: 'analizeAndSendHtmlEmails' },
        { name: 'Send notifications to ' + userName, functionName: 'analizeAndSendMyHtmlEmail' },
        { name: 'Create reports', functionName: 'analizeAndCreateSheets' },
        { name: 'Create secured reports', functionName: 'openSecureReporstDialog' },
        { name: trigerMenuItemName, functionName: 'toggleNotificationTrigger' },
        { name: 'Help (How To..)', functionName: 'showHelpPage' }
    ];
    SpreadsheetApp.getActive().addMenu('Notification Utils', menu);
}

function openSecureReporstDialog() {
    var ui = SpreadsheetApp.getUi();
    var html = HtmlService.createHtmlOutputFromFile('secure_sheet_dialog');
    html.setTitle("Secured report generator");
    ui.showSidebar(html);
}

function showHelpPage() {
    var html = HtmlService.createHtmlOutputFromFile('help_page')
        .setWidth(400)
        .setHeight(300);
    SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
        .showModalDialog(html, 'Help');
}


function toggleNotificationTrigger() {
    ScriptApp.newTrigger("analizeAndSendHtmlEmails").timeBased().everyDays(1).atHour(8).create();
    isDailyTriggerSet = true;
    Logger.log("Trigger set to");
}

function analizeAndSendTextEmails() {

    var spreadSheetResolver = SpreadsheetResolverDefault();
    var spreadsheet = spreadSheetResolver.get();
    var notificationList = NotificationList(
        SheetDataParser(spreadsheet, Constants.notificationsSheetName()).getSheetDataAsJsonArray(),
        SheetDataParser(spreadsheet, Constants.dataSheetName()).getSheetDataAsJsonArray());

    var emailBuildersList = EmailBuilderList(function (name, subject) {
        return EmailBuilder(name, subject)
    });

    notificationList.forEachEnabled(function (item) {
        // Creating only one creator per email to concat all data at once.
        var emailBuilder = emailBuildersList.getByName(item.email);
        if (item.evaluator.getMatches().length > 0) {
            emailBuilder.appendLine("---" + item.filter + "---");
            item.evaluator.getMatches().forEach(function (match) {
                emailBuilder.appendFormat(item.template, match);
            });
            emailBuilder.appendLine("------------");
        }
    });
    emailBuildersList.sendAll();
}

function analizeAndSendHtmlEmails(userEmail) {

    var spreadsheet = SpreadsheetResolverDefault().get();
    var notificationList = NotificationList(
        SheetDataParser(spreadsheet, Constants.notificationsSheetName()).getSheetDataAsJsonArray(),
        SheetDataParser(spreadsheet, Constants.dataSheetName()).getSheetDataAsJsonArray());

    var emailBuildersList = EmailBuilderList(function (name, subject) {
        return HtmlEmailBuilder(name, subject);
    });

    notificationList.forEachEnabled(function (item) {
        // Creating only one creator per email to concat all data at once.
        if (!userEmail || item.email == userEmail) {
            var emailBuilder = emailBuildersList.getByName(item.email);
            if (item.evaluator.getMatches().length > 0) {
                emailBuilder.addNotification(item, item.evaluator.getMatches());
            }
        }
    });
    emailBuildersList.sendAll();
}

function analizeAndSendMyHtmlEmail() {
    analizeAndSendHtmlEmails(Session.getActiveUser().getEmail());
}

function analizeAndCreateSheets() {

    var spreadSheetResolver = SpreadsheetResolverDefault();
    var spreadsheet = spreadSheetResolver.get();
    var notificationList = NotificationList(
        SheetDataParser(spreadsheet, Constants.notificationsSheetName()).getSheetDataAsJsonArray(),
        SheetDataParser(spreadsheet, Constants.dataSheetName()).getSheetDataAsJsonArray());

    var sheetBuildersList = SheetBuilderList(function (name) {
        return SheetBuilder(name, spreadSheetResolver.get())
    });

    notificationList.forEachEnabled(function (item) {
        // Creating only one creator per email to concat all data at once.
        var sheetName = item.email;
        var sheetBuilder = sheetBuildersList.getByName(sheetName);
        var matches = item.evaluator.getMatches();
        if (matches.length > 0) {
            sheetBuilder.setHeaders(matches[0].getSheetMetadata().objectKeys, matches[0].getSheetMetadata().originalHeaders);
            matches.forEach(sheetBuilder.appendBlobRow);
        }
    });
    sheetBuildersList.createAll();
}

function analizeAndCreateSecureSheets(folderId, defaultFileName, propName, sendNotification) {
    // folderId = "1mircVI8kG6ioz5iEjMIOODyJTqflukex";defaultFileName="Reports";propName="Account"; sendNotification = true;
    Logger.log("Creating reports. Folder:%s, File Name: %s, Property: %s, Notification?: %s",folderId, defaultFileName, propName, sendNotification);
    var folder = DriveApp.getFolderById(folderId);
    if (folder) {

        var spreadSheetResolver = SpreadsheetResolverDefault();
        var spreadsheet = spreadSheetResolver.get();
        spreadsheet.toast('Reports generation Started', 'Status');
        var notificationList = NotificationList(
            SheetDataParser(spreadsheet, Constants.notificationsSheetName()).getSheetDataAsJsonArray(),
            SheetDataParser(spreadsheet, Constants.dataSheetName()).getSheetDataAsJsonArray());

        var secureSpreadsheetResolver = SecuredSpreadsheetResolver(folderId);

        var sheetBuildersList = SheetBuilderList(function (name) {
            return SheetBuilder(name);
        });

        spreadsheet.toast('Creating reports.', 'Status');
        var groups = {};
        notificationList.forEachEnabled(function (item) {
            // Creating only one creator per email to concat all data at once.
            var matches = item.evaluator.getMatches();
            if (matches.length > 0) {

                var groupName = defaultFileName + "_" + item[stringTools.toJavascriptNotation(propName)];

                if (!groups.hasOwnProperty(groupName)) {
                    groups[groupName] = {
                        data: item,
                        propertyName: propName,
                        fileNamePrefix: defaultFileName,
                        groupName: groupName,
                        notifications: []
                    };
                    groups[groupName].sheetBuilder = sheetBuildersList.getByName(groupName);
                    var secureSpreadsheet = secureSpreadsheetResolver.get(groupName);
                    groups[groupName].fileUrl = secureSpreadsheet.getUrl();
                    groups[groupName].sheetBuilder.setParentSpreadsheet(secureSpreadsheet);
                    groups[groupName].sheetBuilder.setHeaders(matches[0].getSheetMetadata().objectKeys, matches[0].getSheetMetadata().originalHeaders);
                }

                groups[groupName].notifications.push(item);
                matches.forEach(function (item) {
                    groups[groupName].sheetBuilder.appendBlobRow(item);
                });
            }
        });

        var emailBuildersList = EmailBuilderList(function (name, subject) {
            return GroupHtmlEmailBuilder(name, subject);
        });

        for (var key in groups) {
            groups[key].sheetBuilder.createSheet(true);
            if (sendNotification) {
                groups[key].notifications.forEach(function (item) {
                    secureSpreadsheetResolver.addEditors(key, item.email);
                    var emailBuilder = emailBuildersList.getByName(item[stringTools.toJavascriptNotation(propName)]);
                    emailBuilder.setFileUrl(groups[key].fileUrl);
                    emailBuilder.addDestination(item.email);
                    emailBuilder.addNotification(item, item.evaluator.getMatches());
                });
            }
        }
        emailBuildersList.sendAll();
        spreadsheet.toast('Reports generation finished', 'Status');
    }
    else {
        SpreadsheetApp.getActiveSpreadsheet().toast('Folder not found', 'Error');
        Logger.log("Folder not found!");
    }
}