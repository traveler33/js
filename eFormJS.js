

//Js function only for e form
function EFormShowPanel(IsShow, ID) {
    if (IsShow == true) {
        $("#" + ID).css({ visibility: "visible" });
        $("#" + ID).css({ display: "block" });
    }
    else {
        $("#" + ID).css({ visibility: "hidden" });
        $("#" + ID).css({ display: "none" });
    }

}


function eFormChangeClassForDrag(cssClass, IsSetClass) {

    for (i = 0; i < ArrayclientID.length; i++) {
        var ID = ArrayclientID[i];

        var obj = GetDivObject(ID);

        if (IsSetClass) {
            // alert(cssClass);
            if (obj != null) {
                obj.className = cssClass;
            }
        }
        else {
            obj.className = '';
        }



    }
    // alert( ArrayLabelID.length);
    //    for (i = 0; i < ArrayLabelID.length; i++) {
    //        var LabelID = ArrayLabelID[i];
    //        // alert( LabelID);
    //        var objLabel = GetDivObject(LabelID);

    //        if (IsSetClass) {

    //            objLabel.className = labelClass;
    //            objLabel.title = TranslationLabelTitle;

    //        }
    //        else {
    //            objLabel.className = '';
    //        }


    //    }


}

function GeteFormDivObject(Div_ID) {
    /* MSIE, Konqueror, Opera : */
    if (window.document.all)
        return eval("window.document.all." + Div_ID);

    /* Netscape6/Mozilla : */
    if (bw.ns5) //typeof(window.document.getElementById)=="function") //
        return window.document.getElementById(Div_ID);

    /* uebrig bleibt Netscape4 : */
    return eval("window.document." + Div_ID);
}

function VerifyTabName(TabNameClientID) {

    var oTextBox = GeteFormDivObject(TabNameClientID);

    if (oTextBox.value == '') {
        return false;
    }

    return true;
}


function IsDeleteConfirm(Msg) {
    var answer = confirm(Msg)
    if (answer)
    { return true; }
    else
    { return false; }
}


function GetDivObject(Div_ID) {
    /* MSIE, Konqueror, Opera : */
    if (window.document.all)
        return eval("window.document.all." + Div_ID);

    /* Netscape6/Mozilla : */
    if (bw.ns5) //typeof(window.document.getElementById)=="function") //
        return window.document.getElementById(Div_ID);

    /* uebrig bleibt Netscape4 : */
    return eval("window.document." + Div_ID);
}



//var urlBase = "update.php";
var formVars = "";
var changing = false;


function fieldEnter(campo, evt, idfld) {
    evt = (evt) ? evt : window.event;
    if (evt.keyCode == 13 && campo.value != "") {
        elem = document.getElementById(idfld);
        remotos = new datosServidor;
        nt = remotos.enviar(urlBase + "?fieldname=" + encodeURI(elem.id) + "&content=" + encodeURI(campo.value) + "&" + formVars, "");
        //remove glow
        noLight(elem);
        elem.innerHTML = nt;
        changing = false;
        return false;
    } else {
        return true;
    }


}

function fieldBlur(campo, idfld) {
    if (campo.value != "") {
        elem = document.getElementById(idfld);
        //alert (elem.innerHTML);
        var textbox = document.getElementById("textbox" + idfld + "_field");

        //alert( textbox.value);
        elem.innerHTML = textbox.value;
        //remotos = new datosServidor;
        //nt = remotos.enviar(urlBase + "?fieldname=" +escape(elem.id)+ "&content="+escape(campo.value)+"&"+formVars,"");
        //elem.innerHTML = nt;
        changing = false;
        return false;
    }
}

//edit field created
function editBox(actual) {
    //alert(actual.nodeName+' '+changing);
    if (!changing) {
        width = widthEl(actual.id) + 20;
        height = heightEl(actual.id) + 10;
        // alert ( height);
        if (height < 40) {
            if (width < 201) width = 120;
            actual.innerHTML = "<input id=\"textbox" + actual.id + "_field\" style=\"width: " + width + "px; height: " + height + "px;\" maxlength=\"200\" type=\"text\" value=\"" + actual.innerHTML + "\" onkeypress=\"return fieldEnter(this,event,'" + actual.id + "')\" onfocus=\"highLight(this);\" onblur=\"noLight(this); return fieldBlur(this,'" + actual.id + "');\" />";
        } else {
            if (width < 70) width = 90;
            if (height < 50) height = 50;
            actual.innerHTML = "<textarea name=\"textarea\" id=\"" + actual.id + "_field\" style=\"width: " + width + "px; height: " + height + "px;\" onfocus=\"highLight(this);\" onblur=\"noLight(this); return fieldBlur(this,'" + actual.id + "');\">" + actual.innerHTML + "</textarea>";
        }
        changing = true;
    }

    actual.firstChild.focus();
}



//find all span tags with class editText and id as fieldname parsed to update script. add onclick function
function editbox_init() {
    if (!document.getElementsByTagName) { return; }
    var spans = document.getElementsByTagName("span");
   
    // loop through all span tags
    for (var i = 0; i < spans.length; i++) {
        var spn = spans[i];
       
        if (((' ' + spn.className + ' ').indexOf("editText") != -1) && (spn.id)) {
          //  alert(spn.className);
            spn.onclick = function () { editBox(this); }
            spn.style.cursor = "pointer";
            spn.title = "Click to edit!";
        }

    }


}

//crossbrowser load function
function addEvent(elm, evType, fn, useCapture) {
    if (elm.addEventListener) {
        elm.addEventListener(evType, fn, useCapture);
        return true;
    } else if (elm.attachEvent) {
        var r = elm.attachEvent("on" + evType, fn);
        return r;
    } else {
        alert("Please upgrade your browser to use full functionality on this page");
    }
}

//get width of text element
function widthEl(span) {

    if (document.layers) {
        w = document.layers[span].clip.width;
    } else if (document.all && !document.getElementById) {
        w = document.all[span].offsetWidth;
    } else if (document.getElementById) {
        w = document.getElementById(span).offsetWidth;
    }
    return w;
}

//get height of text element
function heightEl(span) {

    if (document.layers) {
        h = document.layers[span].clip.height;
    } else if (document.all && !document.getElementById) {
        h = document.all[span].offsetHeight;
    } else if (document.getElementById) {
        h = document.getElementById(span).offsetHeight;
    }
    return h;
}

function highLight(span) {
    //span.parentNode.style.border = "2px solid #D1FDCD";
    //span.parentNode.style.padding = "0";
    span.style.border = "1px solid #E8E8E8";
}

function noLight(span) {
    //span.parentNode.style.border = "0px";
    //span.parentNode.style.padding = "2px";
    span.style.border = "0px";


}

//sets post/get vars for update
function setVarsForm(vars) {
    formVars = vars;
}

//addEvent(window, "load", editbox_init);



function GetAllControlPositionAndLabelText(ControlListID, LabelListID) {
    var objControlIst = GetDivObject(ControlListID);
    var objLabelList = GetDivObject(LabelListID);
    objControlIst.value = '';
    objLabelList.value = '';
    for (i = 0; i < ArrayclientID.length; i++) {
        var ID = ArrayclientID[i];

        var obj = GetDivObject(ID);
        if (obj.style != null && obj.style != 'undefined') {
            var sLeft = obj.style.left;
            var sTop = obj.style.top;
            objControlIst.value = objControlIst.value + ";" + ID + "," + sLeft + "," + sTop;
        }

    }
    objControlIst.value = objControlIst.value + ";";
    // alert(ArrayLabelID.length); 
    for (i = 0; i < ArrayLabelID.length; i++) {
        var LabelID = ArrayLabelID[i];
        // alert( LabelID);
        var objLabel = GetDivObject(LabelID);
        if (objLabel != null) {


            var sText = objLabel.innerHTML;
            objLabelList.value = objLabelList.value + LabelID + ',' + sText + ";";
        }



    }
    objLabelList.value = objLabelList.value + ";";
    // alert( objControlIst.value);

}

//******************* drag and drop *****************************

// this is simply a shortcut for the eyes and fingers
//Define limited area
var eFormDesignWidth = 1200;
var eFormDesingHeight = 137;


var _startX = 0; 		// mouse starting positions
var _startY = 0;
var _offsetX = 0; 		// current element offset
var _offsetY = 0;
var _dragElement; 		// needs to be passed from OnMouseDown to OnMouseMove
var _oldZIndex = 0; 		// we temporarily increase the z-index during drag
var _debug = $('debug'); // makes life easier
var cssDragClass = 'CssEformDragClass';

InitDragDrop();

function InitDragDrop() {
    document.onmousedown = OnMouseDown;
    document.onmouseup = OnMouseUp;
}


function OnMouseDown(e) {
    // IE is retarded and doesn't pass the event object
    if (e == null)
        e = window.event;


    // IE uses srcElement, others use target
    var target = e.target != null ? e.target : e.srcElement;

    _debug.innerHTML = target.className == cssDragClass
		? 'draggable element clicked'
		: 'NON-draggable element clicked';

    // for IE, left click == 1
    // for Firefox, left click == 0
    if ((e.button == 1 && window.event != null ||
		e.button == 0) &&
		target.className == cssDragClass) {
        // grab the mouse position
        _startX = e.clientX;
        _startY = e.clientY;

        // grab the clicked element's position
        _offsetX = ExtractNumber(target.style.left);
        _offsetY = ExtractNumber(target.style.top);

        // bring the clicked element to the front while it is being dragged
        _oldZIndex = target.style.zIndex;
        target.style.zIndex = 10000;

        // we need to access the element in OnMouseMove
        _dragElement = target;

        // tell our code to start moving the element with the mouse
        document.onmousemove = OnMouseMove;

        // cancel out any text selections
        document.body.focus();

        // prevent text selection in IE
        document.onselectstart = function () { return false; };
        // prevent IE from trying to drag an image
        target.ondragstart = function () { return false; };

        // prevent text selection (except IE)
        return false;
    }
}

function ExtractNumber(value) {
    var n = parseInt(value);

    return n == null || isNaN(n) ? 0 : n;
}
/*
function OnMouseMove(e) {
if (e == null)
var e = window.event;

// this is the actual "drag code"
_dragElement.style.left = (_offsetX + e.clientX - _startX) + 'px';
_dragElement.style.top = (_offsetY + e.clientY - _startY) + 'px';

_debug.innerHTML = '(' + _dragElement.style.left + ', ' + _dragElement.style.top + ')';
}

*/
function OnMouseMove(e) {
    if (e == null)
        var e = window.event;

    if ((_offsetX + e.clientX - _startX <= 1200 - 60) && (_offsetX + e.clientX - _startX >= 0)) {
        if ((_offsetY + e.clientY - _startY <= 379 - 40) && (_offsetY + e.clientY - _startY >= 0)) {
            // this is the actual "drag code"
            _dragElement.style.left = (_offsetX + e.clientX - _startX) + 'px';
            _dragElement.style.top = (_offsetY + e.clientY - _startY) + 'px';

            _debug.innerHTML = '(' + _dragElement.style.left + ', ' + _dragElement.style.top + ')';
        }

    }
}


function OnMouseUp(e) {
    if (_dragElement != null) {
        _dragElement.style.zIndex = _oldZIndex;

        // we're done with these events until the next OnMouseDown
        document.onmousemove = null;
        document.onselectstart = null;
        _dragElement.ondragstart = null;

        // this is how we know we're not dragging
        _dragElement = null;

        _debug.innerHTML = 'mouse up';
    }
}

//*********************************************
// 
//  Help and Validation Msg box
//
//**********************************************

//Help and validation box
function showToolTip(e, text, clientID, IsValidation) {
    if (document.all) e = event;
    var currentObj = document.getElementById(clientID);
    var obj = document.getElementById('bubble_tooltip');
    var obj2 = document.getElementById('bubble_tooltip_content');
    obj2.innerHTML = text;
    obj.style.display = 'block';
    var st = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    if (navigator.userAgent.toLowerCase().indexOf('safari') >= 0) st = 0;
    var leftPos = e.clientX - 100;
    if (leftPos < 0) leftPos = 0;

    var color = "black";
    if (IsValidation) {
        color = "Red";
        obj2.style.color = color;
        SetValidationControl(clientID, obj)
    }
    else {
        //  obj.style.left = leftPos + 'px';
        obj.style.top = e.clientY - obj.offsetHeight - 1 + st + 'px';
        obj.style.left = leftPos + 'px';

        obj2.style.color = color;

    }

}

function hideToolTip() {
    document.getElementById('bubble_tooltip').style.display = 'none';

}


function SetValidationControl(strTextBoxId, obj) {

    var txtbox = document.getElementById(strTextBoxId);
    p = GetScreenCordinates(txtbox);

    obj.style.top = (p.y -100) + 'px' ;// (txtbox.offsetTop - (txtbox.offsetHeight + 2));

    obj.style.left =(p.x -80) + 'px'; //  (txtbox.offsetLeft + txtbox.offsetWidth / 2);

   // alert(p.y );
   // alert(p.x);
    txtbox.style.backgroundColor = '#FAF8BB';

    txtbox.focus();
}


function GetScreenCordinates(obj) {
    var p = {};
     p.x = obj.offsetLeft;
     p.y = obj.offsetTop;

while (obj.offsetParent) {

          p.x = p.x + obj.offsetParent.offsetLeft;

          p.y = p.y + obj.offsetParent.offsetTop;

if (obj == document.getElementsByTagName("body")[0]) {
break;
          }
else {

              obj = obj.offsetParent;

          }      
    }

return p;

  }
  function popOpenWindow(win, winName, param, w, h, scroll, bResize) {
      var move = screen ? 'left=' + ((screen.width - w) >> 1) + ',top=' + ((screen.height - h) >> 1) : '';
      var url;
      if (param.length == 0) {
          url = win;
      } else {
          url = win + "?" + param;
      }
      if (bResize) {
          window.open(url, winName, move + ",titlebar=0, toolbar=0, location=0, directories=0, status=0, menubar=0, copyhistory=0, width=" + w + ",height=" + h + ",scrollBars=" + scroll + ",resizable=yes");
      } else {
          window.open(url, winName, move + ",titlebar=0, toolbar=0, location=0, directories=0, status=0, menubar=0,  copyhistory=0, width=" + w + ",height=" + h + ",scrollBars=" + scroll + ",resizable=no");
      }
  }


  function ShowPanel(IsShow, ID) {
      if (IsShow == true) {
          $("#" + ID).css({ visibility: "visible" });
          $("#" + ID).css({ display: "block" });
      }
      else {
          $("#" + ID).css({ visibility: "hidden" });
          $("#" + ID).css({ display: "none" });
      }

  }


  function SetHidValue(ClientID, Value) {
      var HidText = GetDivObject(ClientID);
      HidText.value = Value;
      // alert(HidText.value);
  }