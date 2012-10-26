function showModal(argUrl, argTitle, argWidth, argHeight, argPath) {
    // showWaitCursor();
    if (argWidth == null || argWidth == "") argWidth = "550px";
    if (argHeight == null || argHeight == "") argHeight = "350px";
    var sContainer = "../Master/ModalContainer.aspx";
    if (argPath != null) {
        sContainer = argPath + sContainer;
    }
    var sUrl = sContainer + "?url=" + argUrl + "-title=" + argTitle + "-tt=" + (new Date()).getTime();
    var oRet = window.open(sUrl, "", "height=" + argHeight + ",width=" + argWidth + ",resizable=Yes,status=No,scrollbars=No");
    // hideWaitCursor();
    $.blockUI({ overlayCSS: { background: '#4C6F86', opacity: '.80', filter: 'Alpha(Opacity=80)'} });
    return oRet;
}

function showModal_usetag(argUrl, argTitle, argWidth, argHeight, argPath) {
    var oRet = showModal(argUrl, argTitle, argWidth, argHeight, argPath);
    var bRet = false;
    if (oRet != null) {
        if (typeof (setPageTag) == "function") {
            setPageTag(oRet.retText);
            setPageTagValue(oRet.retValue);
            bRet = true;
        }
    }
    else {
        if (typeof (setPageTag) == "function") {
            setPageTag("");
            setPageTagValue("");
            bRet = false;
        }
    }
    return bRet;
}

function showModalNoFrame(argUrl, argTitle, argWidth, argHeight) {
    if (argWidth == null) argWidth = "450px";
    if (argHeight == null) argHeight = "250px";
    var sUrl = argUrl
    return window.open(sUrl, argTitle, "dialogHeight:" + argHeight + ";dialogWidth:" + argWidth + ";center:Yes;resizable:No;status:No;location:no;scrollbars:no;scroll:0;");
}

function refreshWindow() {
    document.location.reload()
}
function getObj(argObj) {
    var o = argObj
}
function getC(argID) {
    if (argID == null)
        return null;
    else
        return document.getElementById(argID);
}
function fileDownLoad(argFile) {
    window.open("FileDownLoad.aspx?b32f=" + argFile);
}

var hfClose;

function CheckModalClose(argHFClose) {
    if (argHFClose != null)
        hfClose = argHFClose;
    var hfCloseControl = $get(hfClose);
    if (hfCloseControl != null)
        if (hfCloseControl.value != "") {
            window.returnValue = hfCloseControl.value;
            window.close();
        }
    setTimeout(CheckModalClose, 500);
}

//==================================
function pageSelector(argID, argUnitId) {
    var s1 = window.open("PageSelector.aspx?ID=" + argID + "&UID=" + argUnitId + "&ti=" + Date());
    if (s1 == null) {
        s1 = "0";
    }
    return s1;
}

function fnOpenWindow(argUrl, argName, argSize) {
    var retValue = window.open(argUrl, argName, "status = yes, toolbar = no, menubar = no, location = yes, resizable = yes, scrollbars = yes " + argSize);
}

function PDFOpenWindow(argUrl, argName, argSize) {
    var retValue = window.open(argUrl, "testName", "status = yes, toolbar = no, menubar = no, location = yes, resizable = yes, scrollbars = yes");
}

function navigateTo(argUrl) {
    window.location = argUrl;
}

function checkGridViewCheckbox(argSender) {
    if (argSender.checked)
        $(".checkItem").attr("checked", "true");
    else
        $(".checkItem").attr("checked", "");
}

function closeInFrame(argReturnValue) {
    if (argReturnValue != null) {
        parent.window.returnValue = argReturnValue;
    }
    parent.close();
    return false;
}

function ajaxFunc(argPara, argCallback) {
    $.ajaxSetup({ cache: false });
    $.get("ajaxFunc.aspx", argPara, argCallback, "json");
}

//Sync get a server page
//return: json
function call(argPara) {
    $.ajaxSetup({ cache: false });
    var sRet = $.ajax({
        url: "ajaxFunc.aspx",
        data: argPara,
        dataType: "json",
        async: false
    }).responseText;
    return eval("(" + sRet + ")");
}


function delay(n, argCaption, argWidth, argHeight) {
    var sFeatures = "";
    var sWidth = "dialogWidth='200px';";
    if (argWidth != null)
        sFeatures = "dialogWidth='" + argWidth + "px';";
    var sHeight = "dialogHeight='100px';";
    if (argHeight != null)
        sFeatures = "dialogHeight='" + argHeight + "px';";
    sFeatures = sWidth + sHeight;
    showOpen("wait.htm?t=" + n + "&c=" + argCaption, "", sFeatures);
}

// t:title
// maxl: maxlength
// d:default value
function inputBox(argTitle, argDefault, argMaxlen, argWidth, argHeight) {
    if (argHeight == null)
        argHeight = "150px";
    if (argWidth == null)
        argWidth = "400px";
    if (argMaxlen == null)
        argMaxlen = 20;
    var oRet = showModalNoFrame("../dialogs/prompt.htm?d=" + argDefault + "&t=" + argTitle + "&maxl=" + argMaxlen + "&tmp=" + Date, argTitle, argWidth, argHeight);
    if (oRet != null && oRet != "")
        if (typeof (setPageTag) == "function")
            setPageTag(oRet);
    return oRet;
}

function getQueryString(paramName) {
    paramName = paramName.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]").toLowerCase();
    var reg = "[\\?&]" + paramName + "=([^&#]*)";
    var regex = new RegExp(reg);
    var regResults = regex.exec(window.location.href.toLowerCase());
    if (regResults == null) return "";
    else return regResults[1];
}

function uploadFiles(argId, argIdType) {
    var sUrl = "frmUpload.aspx?id=" + argId + "-idt=" + argIdType;
    return showModal(sUrl, "Upload Files", "450px", "200px");
}

function showErr(argTitle, argErr, argStayTime) {
    if (detailStatus_showErr != null)
        detailStatus_showErr('Error: ' + argTitle, argErr, argStayTime);
}
function showInfo(argTitle, argInfo, argStayTime) {
    if (detailStatus_showInfo != null)
        detailStatus_showInfo(argTitle, argInfo, argStayTime);
}
function showSuccess(argTitle, argInfo, argStayTime) {
    if (detailStatus_showSuccess != null)
        detailStatus_showSuccess(argTitle, argInfo, argStayTime);
}

function setValue(argId, argValue) {
    var oControl = document.getElementById(argId);
    if (oControl != null)
        oControl.value = argValue;
}

function clearValue(argId) {
    setValue(argId, "");
}

function getAttr(argC, argAttr) {
    return argC.attributes[argAttr].value;
}

function getAttrById(argId, argAttr) {
    return getAttr(getC(argId), argAttr);
}

function LTrim(str) {
    var i;
    for (i = 0; i < str.length; i++) {
        if (str.charAt(i) != " " && str.charAt(i) != " ") break;
    }
    str = str.substring(i, str.length);
    return str;
}
function RTrim(str) {
    var i; for (i = str.length - 1; i >= 0; i--) {
        if (str.charAt(i) != " " && str.charAt(i) != " ") break;
    }
    str = str.substring(0, i + 1);
    return str;
}
function Trim(str) {
    return LTrim(RTrim(str));
}

function showWaitCursor() {
    if ($('#showdialog_waitCursor').length == 0) {
        var oc = $('<div id="showdialog_waitCursor" style="height:100%; width:100%; position:absolute; top:0;left:0; cursor:wait; background-color:gray; filter: Alpha(Opacity=50);"> </div>');
        document.body.appendChild(oc[0]);
    }
    $('#showdialog_waitCursor').show();
}

function hideWaitCursor() {
    $('#showdialog_waitCursor').hide();
}

function hasStringValue(argValue) {
    var bRet = false;
    if (argValue != null)
        if (argValue.length > 0)
            bRet = true;
    return bRet;
}

function loadJsOrCssFile(filename, filetype) {
    if (filetype == "js") { //if filename is a external JavaScript file
        var fileref = document.createElement('script')
        fileref.setAttribute("type", "text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype == "css") { //if filename is an external CSS file
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}

/************
* digital clock
***********/
function liveClock(id, displayTzo, tzo, dtf) {
	var now = new Date();
	now.setTime(now.getTime() + (tzo * 60 * 60 * 1000));
	var e = document.getElementById(id);
	if (e != null) {
		e.innerHTML = dateFormat(now, dtf + ' (Z' + displayTzo + ')', true);
	}
}

/****
* Date Format 1.2.3
* (c) 2007-2009 Steven Levithan <stevenlevithan.com>
* MIT license
*
* Includes enhancements by Scott Trenda <scott.trenda.net>
* and Kris Kowal <cixar.com/~kris.kowal/>
*
* Accepts a date, a mask, or a date and a mask.
* Returns a formatted version of the given date.
* The date defaults to the current date/time.
* The mask defaults to dateFormat.masks.default.
*****/
var dateFormat = function () {
    var token = /[X]|d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
        timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        timezoneClip = /[^-+\dA-Z]/g,
        pad = function (val, len) {
            val = String(val);
            len = len || 2;
            while (val.length < len) val = "0" + val;
            return val;
        };

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var _ = utc ? "getUTC" : "get",
            d = date[_ + "Date"](),
            D = date[_ + "Day"](),
            m = date[_ + "Month"](),
            y = date[_ + "FullYear"](),
            H = date[_ + "Hours"](),
            M = date[_ + "Minutes"](),
            s = date[_ + "Seconds"](),
            L = date[_ + "Milliseconds"](),
            o = utc ? 0 : date.getTimezoneOffset(),
            flags = {
                d: d,
                dd: pad(d),
                ddd: dF.i18n.dayNames[D],
                dddd: dF.i18n.dayNames[D + 7],
                m: m + 1,
                mm: pad(m + 1),
                mmm: dF.i18n.monthNames[m],
                mmmm: dF.i18n.monthNames[m + 12],
                yy: String(y).slice(2),
                yyyy: y,
                h: H % 12 || 12,
                hh: pad(H % 12 || 12),
                H: H,
                HH: pad(H),
                M: M,
                MM: pad(M),
                s: s,
                ss: pad(s),
                l: pad(L, 3),
                L: pad(L > 99 ? Math.round(L / 10) : L),
                t: H < 12 ? "a" : "p",
                tt: H < 12 ? "am" : "pm",
                T: H < 12 ? "A" : "P",
                TT: H < 12 ? "AM" : "PM",
                X: dF.i18n.todNames[H < 12 ? 0 : H < 18 ? 1 : 2],
                Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
            };

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
} ();

// Some common format strings
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
    customDate1: "'It is currently' ddd mmm d, yyyy h:MM:ss tt",
    customDate2: "'Good' X'! Today is ' dddd, dd mmmm yyyy '&bull;' h:MM:ss tt",
    customDate3: "'Good' X'! Today is ' dddd, dd mmmm yyyy '&bull;' HH:MM:ss"
};

// Internationalization strings
dateFormat.i18n = {
    todNames: [
        "Morning", "Afternoon", "Evening"
    ],
    dayNames: [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    monthNames: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
};

function OnstatusChangeSetViewValue(thisClientID, viewClientID) {
    var othischk = document.getElementById(thisClientID);
    if (othischk.checked) {

        var Viewchk = document.getElementById(viewClientID);
        Viewchk.checked = true;
    }
}

function getKeyValueFrom(keyValues, key, keyDelimeter, valueDelimeter) {
    var index = keyValues.indexOf(key + valueDelimeter, 0)
    var retVal = "";
    if (index != -1) {
        keyValues = keyValues.substring(index + key.length + keyDelimeter.length);
        index = keyValues.indexOf(keyDelimeter);
        if (index != -1) {
            retVal = keyValues.substring(0, index);
        }
        else {
            retVal = keyValues;
        }
    }
    return retVal;
}

function isSessionExpired(request, status, exception) {
    var ret = false;
    if (status == 'parsererror') {
        if ($.trim(request.responseText).indexOf('<meta name="loginpage" content="loginpage" />') > 0) {
            alert('Session is expired.');
            location.href = '../Master/Login.aspx?err=Login+required&url=' + location.href;
        }
    }
    return ret;
}

function fixGridview(gridviewObjId, isEnableTooltip, isEnableColumnResize, isPostback) {
    var tableObj = $("table#" + gridviewObjId);
    if (tableObj != null) {
        if (isEnableTooltip) {
            tableObj.find("td:not(:has(input))").each(function (index) { $(this).attr("title", $(this).text().trim()) });
        }
        if (isEnableColumnResize) {
            if (!isPostback) {
                tableObj.find("th:has(.chkAll,.chkSingle,.chkSelectAll)").each(function (index) { $(this).css("width", "28px") });
            }
            else {
                tableObj.colResizable({ disable: true }); // required to re-enable resizing especially on partial updates
            }
            tableObj.colResizable({ minWidth: 28, postbackSafe: true, flush: !isPostback });
        }
    }
}






function openURL(winName, winURL) {
    var w = 1080;
    var h = 830;
    var t = Math.round((screen.height / 2) - (h / 2));
    var l = Math.round((screen.width / 2) - (w / 2));
    var props = "'_blank, channelmode=no,directories=no,fullscreen=no,location=no,menubar=no,resizable=no,";
    props += "scrollbars=yes,status=no,titlebar=no,toolbar=no,";
    props += "top=" + t + ",left=" + l + ",height=" + h + ",width=" + w;

    win = window.open("", winName, props, false);
    win.top.location.href = winURL;
}
