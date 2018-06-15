//Library Section
/* jsep v0.3.1 (http://jsep.from.so/) */
!function (a) { "use strict"; var b = "Compound", c = "Identifier", d = "MemberExpression", e = "Literal", f = "ThisExpression", g = "CallExpression", h = "UnaryExpression", i = "BinaryExpression", j = "LogicalExpression", k = "ConditionalExpression", l = "ArrayExpression", m = 46, n = 44, o = 39, p = 34, q = 40, r = 41, s = 91, t = 93, u = 63, v = 59, w = 58, x = function (a, b) { var c = new Error(a + " at character " + b); throw c.index = b, c.description = a, c }, y = !0, z = { "-": y, "!": y, "~": y, "+": y }, A = { "||": 1, "&&": 2, "|": 3, "^": 4, "&": 5, "==": 6, "!=": 6, "===": 6, "!==": 6, "<": 7, ">": 7, "<=": 7, ">=": 7, "<<": 8, ">>": 8, ">>>": 8, "+": 9, "-": 9, "*": 10, "/": 10, "%": 10 }, B = function (a) { var b, c = 0; for (var d in a) (b = d.length) > c && a.hasOwnProperty(d) && (c = b); return c }, C = B(z), D = B(A), E = { "true": !0, "false": !1, "null": null }, F = "this", G = function (a) { return A[a] || 0 }, H = function (a, b, c) { var d = "||" === a || "&&" === a ? j : i; return { type: d, operator: a, left: b, right: c } }, I = function (a) { return a >= 48 && a <= 57 }, J = function (a) { return 36 === a || 95 === a || a >= 65 && a <= 90 || a >= 97 && a <= 122 || a >= 128 && !A[String.fromCharCode(a)] }, K = function (a) { return 36 === a || 95 === a || a >= 65 && a <= 90 || a >= 97 && a <= 122 || a >= 48 && a <= 57 || a >= 128 && !A[String.fromCharCode(a)] }, L = function (a) { for (var i, j, y = 0, B = a.charAt, L = a.charCodeAt, M = function (b) { return B.call(a, b) }, N = function (b) { return L.call(a, b) }, O = a.length, P = function () { for (var a = N(y); 32 === a || 9 === a;)a = N(++y) }, Q = function () { var a, b, c = S(); return P(), N(y) !== u ? c : (y++ , a = Q(), a || x("Expected expression", y), P(), N(y) === w ? (y++ , b = Q(), b || x("Expected expression", y), { type: k, test: c, consequent: a, alternate: b }) : void x("Expected :", y)) }, R = function () { P(); for (var b = a.substr(y, D), c = b.length; c > 0;) { if (A.hasOwnProperty(b)) return y += c, b; b = b.substr(0, --c) } return !1 }, S = function () { var a, b, c, d, e, f, g, h; if (f = T(), b = R(), !b) return f; for (e = { value: b, prec: G(b) }, g = T(), g || x("Expected expression after " + b, y), d = [f, e, g]; (b = R()) && (c = G(b), 0 !== c);) { for (e = { value: b, prec: c }; d.length > 2 && c <= d[d.length - 2].prec;)g = d.pop(), b = d.pop().value, f = d.pop(), a = H(b, f, g), d.push(a); a = T(), a || x("Expected expression after " + b, y), d.push(e, a) } for (h = d.length - 1, a = d[h]; h > 1;)a = H(d[h - 1].value, d[h - 2], a), h -= 2; return a }, T = function () { var b, c, d; if (P(), b = N(y), I(b) || b === m) return U(); if (b === o || b === p) return V(); if (J(b) || b === q) return Y(); if (b === s) return $(); for (c = a.substr(y, C), d = c.length; d > 0;) { if (z.hasOwnProperty(c)) return y += d, { type: h, operator: c, argument: T(), prefix: !0 }; c = c.substr(0, --d) } return !1 }, U = function () { for (var a, b, c = ""; I(N(y));)c += M(y++); if (N(y) === m) for (c += M(y++); I(N(y));)c += M(y++); if (a = M(y), "e" === a || "E" === a) { for (c += M(y++), a = M(y), "+" !== a && "-" !== a || (c += M(y++)); I(N(y));)c += M(y++); I(N(y - 1)) || x("Expected exponent (" + c + M(y) + ")", y) } return b = N(y), J(b) ? x("Variable names cannot start with a number (" + c + M(y) + ")", y) : b === m && x("Unexpected period", y), { type: e, value: parseFloat(c), raw: c } }, V = function () { for (var a, b = "", c = M(y++), d = !1; y < O;) { if (a = M(y++), a === c) { d = !0; break } if ("\\" === a) switch (a = M(y++)) { case "n": b += "\n"; break; case "r": b += "\r"; break; case "t": b += "\t"; break; case "b": b += "\b"; break; case "f": b += "\f"; break; case "v": b += "\x0B"; break; default: b += "\\" + a } else b += a } return d || x('Unclosed quote after "' + b + '"', y), { type: e, value: b, raw: c + b + c } }, W = function () { var b, d = N(y), g = y; for (J(d) ? y++ : x("Unexpected " + M(y), y); y < O && (d = N(y), K(d));)y++; return b = a.slice(g, y), E.hasOwnProperty(b) ? { type: e, value: E[b], raw: b } : b === F ? { type: f } : { type: c, name: b } }, X = function (a) { for (var c, d, e = [], f = !1; y < O;) { if (P(), c = N(y), c === a) { f = !0, y++; break } c === n ? y++ : (d = Q(), d && d.type !== b || x("Expected comma", y), e.push(d)) } return f || x("Expected " + String.fromCharCode(a), y), e }, Y = function () { var a, b; for (a = N(y), b = a === q ? Z() : W(), P(), a = N(y); a === m || a === s || a === q;)y++ , a === m ? (P(), b = { type: d, computed: !1, object: b, property: W() }) : a === s ? (b = { type: d, computed: !0, object: b, property: Q() }, P(), a = N(y), a !== t && x("Unclosed [", y), y++) : a === q && (b = { type: g, arguments: X(r), callee: b }), P(), a = N(y); return b }, Z = function () { y++; var a = Q(); return P(), N(y) === r ? (y++ , a) : void x("Unclosed (", y) }, $ = function () { return y++ , { type: l, elements: X(t) } }, _ = []; y < O;)i = N(y), i === v || i === n ? y++ : (j = Q()) ? _.push(j) : y < O && x('Unexpected "' + M(y) + '"', y); return 1 === _.length ? _[0] : { type: b, body: _ } }; if (L.version = "0.3.1", L.toString = function () { return "JavaScript Expression Parser (JSEP) v" + L.version }, L.addUnaryOp = function (a) { return C = Math.max(a.length, C), z[a] = y, this }, L.addBinaryOp = function (a, b) { return D = Math.max(a.length, D), A[a] = b, this }, L.addLiteral = function (a, b) { return E[a] = b, this }, L.removeUnaryOp = function (a) { return delete z[a], a.length === C && (C = B(z)), this }, L.removeBinaryOp = function (a) { return delete A[a], a.length === D && (D = B(A)), this }, L.removeLiteral = function (a) { return delete E[a], this }, "undefined" == typeof exports) { var M = a.jsep; a.jsep = L, L.noConflict = function () { return a.jsep === L && (a.jsep = M), L } } else "undefined" != typeof module && module.exports ? exports = module.exports = L : exports.parse = L }(this);
//# sourceMappingURL=jsep.min.js.map

/* stringTools v0.0.1 */
!function (root) {
    "use strict";

    var stringTools = {};

    // Normalizes a string, by removing all alphanumeric characters and using mixed case
    // to separate words. The output will always start with a lower case letter.
    // This function is designed to produce JavaScript object property names.
    // Arguments:
    //   - header: string to normalize
    // Examples:
    //   "First Name" -> "firstName"
    //   "Market Cap (millions) -> "marketCapMillions
    //   "1 number at the beginning is ignored" -> "numberAtTheBeginningIsIgnored"
    stringTools.toJavascriptNotation = function (header) {
        var key = "";
        var aux = header.toCamelCase();
        var letter = aux[0];

        if (!isDigit(letter)) {
            key += letter; //First character shouldn't be a number
        }
        for (var index = 1; index < aux.length; index++) {
            letter = aux[index];
            if (isAlnum(letter) || isValidSpecialChar(letter)) {
                key += letter;
            }
        }
        return key;
    };

    // Returns true if the character char is alphabetical, false otherwise.
    function isAlnum(char) {
        return char >= 'A' && char <= 'Z' ||
            char >= 'a' && char <= 'z' ||
            isDigit(char);
    }

    function isValidSpecialChar(char) {
        return char == '_';
    }

    // Returns true if the character char is a digit, false otherwise.
    function isDigit(char) {
        return char >= '0' && char <= '9';
    }

    // In desktop environments, have a way to restore the old value for `jsep`
    if (typeof exports === 'undefined') {
        var old_stringTools = root.stringTools;
        // The star of the show! It's a function!
        root.stringTools = stringTools;
        // And a courteous function willing to move out of the way for other similarly-named objects!
        stringTools.noConflict = function () {
            if (root.stringTools === stringTools) {
                root.stringTools = old_stringTools;
            }
            return stringTools;
        };
    } else {
        // In Node.JS environments
        exports.stringTools = stringTools;
    }
}(this);
///



//////////////////////////////////////////////////////////////////////////////////////////
//
// The code below is reused from the 'Reading Spreadsheet data using JavaScript Objects'
// tutorial.
//
//////////////////////////////////////////////////////////////////////////////////////////

// getRowsData iterates row by row in the input range and returns an array of objects.
// Each object contains all the data for a given row, indexed by its normalized column name.
// Arguments:
//   - sheet: the sheet object that contains the data to be processed
//   - range: the exact range of cells where the data is stored
//   - columnHeadersRowIndex: specifies the row number where the column names are stored.
//       This argument is optional and it defaults to the row immediately above range;
// Returns an Array of objects.

function SheetDataParser(spreadsheet, sheetName) {

    var sheet = spreadsheet.getSheetByName(sheetName);
    var range = sheet.getRange(2, 1, sheet.getMaxRows() - 1, sheet.getMaxColumns());


    function getRowsData(sheet, range, columnHeadersRowIndex) {
        columnHeadersRowIndex = columnHeadersRowIndex || range.getRowIndex() - 1;
        var numColumns = range.getEndColumn() - range.getColumn() + 1;
        var headersRange = sheet.getRange(columnHeadersRowIndex, range.getColumn(), 1, numColumns);
        var headers = headersRange.getValues()[0];
        return getObjects(range.getValues(), normalizeHeaders(headers));
    }

    // For every row of data in data, generates an object that contains the data. Names of
    // object fields are defined in keys.
    // Arguments:
    //   - data: JavaScript 2d array
    //   - keys: Array of Strings that define the property names for the objects to create
    function getObjects(data, keys) {
        var objects = [];

        function getSheetMetadata() {
            return keys;
        };

        for (var i = 0; i < data.length; ++i) {
            var object = {};
            var hasData = false;
            for (var j = 0; j < data[i].length; ++j) {
                var cellData = data[i][j];
                hasData = hasData || !isCellEmpty(cellData);
                if (cellData instanceof Date) {
                    cellData = parseInt(cellData.toyyyymmdd());
                }
                object[keys.objectKeys[j]] = cellData;
            }
            if (hasData) {
                object.getSheetMetadata = getSheetMetadata;
                objects.push(object);
            }
        }
        return objects;
    }

    // Returns an Array of normalized Strings.
    // Arguments:
    //   - headers: Array of Strings to normalize
    function normalizeHeaders(headers) {
        var keys = [];
        for (var i = 0; i < headers.length; ++i) {
            var key = stringTools.toJavascriptNotation(headers[i]);
            if (key.length > 0) {
                keys.push(key);
            }
            else if (headers[i].length > 0) {
                keys.push("_prop" + i);
            }
        }
        return {
            originalHeaders: headers,
            objectKeys: keys,
        }
    };

    // Returns true if the cell where cellData was read from is empty.
    // Arguments:
    //   - cellData: string
    function isCellEmpty(cellData) {
        return typeof (cellData) == "string" && cellData == "";
    }

    return {
        getSheetDataAsJsonArray: function () {
            return getRowsData(this.sheet, this.range);
        },
        sheet: sheet,
        range: range
    };
}

function JsonExpressionTreeComparer(functionString) {
    var operators = {
        "==": function (a, b) { return a == b; },
        "=!": function (a, b) { return a = !b; },
        "!=": function (a, b) { return a != b; },
        ">": function (a, b) { return a > b; },
        "<": function (a, b) { return a < b; },
        ">=": function (a, b) { return a >= b; },
        "<=": function (a, b) { return a <= b; },
        "&&": function (a, b) { return a && b; },
        "||": function (a, b) { return a || b; }
    };

    var functionTree = null;

    function resolverValueFromUnaryExpression(unaryExpression) {
        var value = unaryExpression.argument.value;
        if (unaryExpression.operator == "-") {
            value = -1 * value;
        }
        return value;
    }

    function evaluateTree(operation, data) {
        if ((!operation || !data) && (operation.type != "LogicalExpression" || operation.type != "BinaryExpression" || operation.type != "UnaryExpression")) {
            return false;
        }
        if (operation.type === "LogicalExpression") {
            return operators[operation.operator](evaluateTree(operation.left, data), evaluateTree(operation.right, data));
        }
        else {
            if (operation.right.type === "UnaryExpression") {
                operation.right.value = resolverValueFromUnaryExpression(operation.right);
            }
            else if (operation.right.type === "Identifier") {
                operation.right.value = data[stringTools.toJavascriptNotation(operation.right.name)]
            }
            var isTrue = operators[operation.operator](data[stringTools.toJavascriptNotation(operation.left.name)], operation.right.value);
            return isTrue;
        }
    }

    return {
        isTrue: function (data) {
            functionTree = functionTree || (functionTree = jsep(functionString));
            return evaluateTree(functionTree, data);
        },
        functionTree: functionTree,
        functionString: functionString
    };

    ///
}

function EmailBuilder(emailTo, subject) {
    var newLine = "\n\r",
        tempBody = "";
    var result = {
        to: emailTo,
        subject: subject,
        noReplay: true,
        name: "Auto Spreadhsheet App",
        body: null
    };
    // var htmlBody = HtmlService.createHtmlOutputFromFile('email_template').getContent();
    function updateBody() {
        result.body = "Hi ".concat(emailTo, newLine, newLine, tempBody, newLine, newLine, "Thanks");
    };

    return {
        getEmail: function () {
            updateBody();
            return result;
        },
        appendText: function (text) {
            tempBody += text;
        },
        appendLine: function (text) {
            tempBody += newLine + text;
        },
        appendFormat: function (format, object) {
            tempBody += newLine + Mustache.to_html(format, object);//stringTools.fillInTemplateFromObject(format, object);
        },
        isBodyEmpty: function () {
            return tempBody == "";
        }
    };
}

function HtmlEmailBuilder(emailTo, subject) {
    var newLine = "\n\r",
        dataContext = {
            emailTo: emailTo,
            notifications: [],
        }
        ,
        itemTemplate = null,
        result = {
            to: emailTo,
            subject: subject,
            noReplay: true,
            name: "Auto Spreadhsheet App",
            htmlBody: null
        };

    function updateBody() {
        var htmlBody = HtmlService.createHtmlOutputFromFile('email_template').getContent();
        result.htmlBody = Mustache.to_html(htmlBody, dataContext, itemTemplate);
    };

    return {
        getEmail: function () {
            updateBody();
            return result;
        },

        addNotification: function (notificationData, items) {
            dataContext.notifications.push({
                data: notificationData,
                matches: items
            });
            itemTemplate = { itemTemplate: notificationData.template };
        },

        isBodyEmpty: function () {
            return dataContext.notifications.length == 0;
        }
    };
}

function GroupHtmlEmailBuilder(groupName, subject) {
    var newLine = "\n\r",
        dataContext = {
            emailTo: groupName,
            notifications: [],
        }
        ,
        itemTemplate = null,
        result = {
            to: "",
            subject: groupName +" "+ subject,
            noReplay: true,
            name: "Auto reporting script",
            htmlBody: null
        };

    function updateBody() {
        var htmlBody = HtmlService.createHtmlOutputFromFile('group_email_template').getContent();
        result.htmlBody = Mustache.to_html(htmlBody, dataContext, itemTemplate);
    };

    return {
        getEmail: function () {
            updateBody();
            return result;
        },
        addDestination: function (emails) {
            emails = emails.replace(/\s+/g, '');
            if (result.to.length > 0)
                result.to += ","
            result.to += emails;
            return result;
        },
        setFileUrl: function (url) {
            dataContext.fileUrl = url;
        },
        addNotification: function (notificationData, items) {
            dataContext.notifications.push({
                data: notificationData,
                matches: items
            });
            itemTemplate = { itemTemplate: notificationData.template };
        },
        isBodyEmpty: function () {
            return dataContext.notifications.length == 0;
        }
    };
}

function EmailBuilderList(builderFactoryFunction) {
    var emailBuilders = {};
    var builderFactoryFunction_ = builderFactoryFunction;
    return {
        getByName: function (name) {
            return emailBuilders[name] || (emailBuilders[name] = builderFactoryFunction_(name, Constants.emailSubject()));
        },
        sendAll: function () {
            for (var key in emailBuilders) {
                if (emailBuilders.hasOwnProperty(key)) {
                    var builder = emailBuilders[key];
                    if (!builder.isBodyEmpty()) {
                        var mailToBeSend = builder.getEmail();
                        MailApp.sendEmail(mailToBeSend);

                    }
                }
            }
        }
    }
}

function SheetBuilder(name, spreadsheet) {
    var sheetName = name;
    var headers = null;
    var rows = [];
    var sheet = null;
    var hasHeaders = false;
    var parent = spreadsheet;
    var headerColor = "#6496e5";

    function updateSheet(setActive) {
        if (sheet != null || parent.getSheetByName(sheetName) != null) {
            sheetName += " " + (new Date()).toLocaleDateString();
        }
        sheet = parent.insertSheet(0);
        sheet.setName(sheetName);
        for (var i = 0; i < rows.length; i++) {
            var data = rows[i];
            sheet.appendRow(data);
        }
        if (headers)
            sheet.getRange(1, 1, 1, headers.length).setBackground(headerColor).setFontWeight("bold");

    };

    function appendRow(dataArray) {
        rows.push(dataArray);
    };

    return {
        setParentSpreadsheet: function (spreadsheet) {
            parent = spreadsheet;
        },
        createSheet: function (setActive) {
            if (rows.length > 0) {
                updateSheet(setActive);
            }
            return sheet;
        },
        setHeaders: function (headersArray, headersData) {
            if (hasHeaders || !Array.isArray(headersArray)) {
                return;
            }
            hasHeaders = true;
            headers = headersArray;
            appendRow(headersData);
        },
        appendRow: appendRow,
        appendBlobRow: function (blob) {
            var arrayToAppend = [];
            for (var i = 0; i < headers.length; i++) {
                var headerName = headers[i];
                arrayToAppend.push(blob[headerName] || "");
            }
            appendRow(arrayToAppend);
        }
    };
}

function SheetBuilderList(builderFactoryFunction) {
    var sheetBuilders = {};
    var builderFactoryFunction_ = builderFactoryFunction;

    return {
        getByName: function (name) {
            return sheetBuilders[name] || (sheetBuilders[name] = builderFactoryFunction_(name));
        },
        createAll: function () {
            for (var key in sheetBuilders) {
                if (sheetBuilders.hasOwnProperty(key)) {
                    var builder = sheetBuilders[key];
                    builder.createSheet();
                }
            }
        }
    }
}

function SpreadsheetResolverDefault() {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    return {
        get: function (name) {
            return spreadsheet;
        }
    }
}

function SecuredSpreadsheetResolver(folderId) {
    var folder = DriveApp.getFolderById(folderId);
    var errorCallback = null;
    var sheets = {};
    function resolveFile(name) {

        if (sheets.hasOwnProperty(name)) {
            return sheets[name];
        }

        var newSpreadsheet = SpreadsheetApp.create(name + " - " + (new Date()).toyyyymmdd());
        Utilities.sleep(400);
        // newSpreadsheet.deleteSheet(newSpreadsheet.getSheets()[0]); //You cannot delete ir since is the only one.
        var file = DriveApp.getFileById(newSpreadsheet.getId());
        folder.addFile(file);
        file.getParents().next().removeFile(file);
        sheets[name] = newSpreadsheet;

        return newSpreadsheet;
    }

    function fireOnError(error) {
        if (errorCallback)
            errorCallback(error);
    }

    return {
        get: function (name) {
            if (!folder) {
                fireOnError("Invalid folder");
                return;
            }
            var sheet = resolveFile(name);
            return SpreadsheetApp.openById(sheet.getId());
        },
        addEditors: function (name, editorsMails) {
            var sheet = resolveFile(name);
            var file = SpreadsheetApp.openById(sheet.getId());
            file.addEditors(editorsMails.replace(/\s+/g, '').split(","));
            return file;
        },
        onError: function (callback) {
            errorCallback = callback;
        }
    }
}

function DataEvaluator(filter, data) {
    var dataRows = data;
    var expressionTreeComparer = JsonExpressionTreeComparer(filter);
    var matches = null;
    var errors = [];

    function evaluate() {
        matches = [];
        dataRows.forEach(function (element) {
            try {
                if (expressionTreeComparer.isTrue(element)) {
                    matches.push(element);
                }
            } catch (error) {
                errors.push(error);
            }
        });
    };

    return {
        getMatches: function () {
            if (!matches) {
                evaluate();
            }
            return matches;
        },
        getErrors: function () {
            return errors;
        }
    };
}

function NotificationList(notificationItems, dataItems) {
    var onItemFound = null;
    var dataRows = dataItems;
    var notificationsRows = notificationItems;

    function fireItemFound(item) {
        if (onItemFound) {
            onItemFound(item);
        }
    };

    var self = {
        forEachEnabled: function (callback) {
            onItemFound = callback;

            notificationsRows.forEach(function (item) {
                if (typeof item.enabled == 'undefined' || item.enabled) {
                    item.evaluator = DataEvaluator(item.filter, dataRows);
                    fireItemFound(item);
                }
            });

            return self;
        }
    };

    return self;
}

var jsep = this["jsep"] || module.exports || module.parse;
var stringTools = this["stringTools"] || exports.stringTools;