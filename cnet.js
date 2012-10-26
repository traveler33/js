// JScript File
var docWidth =0;
var sPos = '';
var ObjLeft = new Array( );
var IsFirstLoad = false;
var labelClass ="editText";
var TranslationLabelTitle ="Please click this label to edit";

var ie5=document.all&&document.getElementById
var ns6 = document.getElementById && !document.all

function onMouseUp() {
    $find("cal").hide();
    $find("cal").show();
}

function UnCheckTeamCheckList(clientID) { 
    
     var objCheckBox = GetDivObject(clientID);
     if (objCheckBox.checked) {

         objCheckBox.checked = false;
     }
}

function ShowTeamCheckList(clientID) {

    var objCheckBox = GetDivObject(clientID);
    if (objCheckBox.checked) {
    
        ShowPanel(true, 'CustomizeTeamInnerListDiv');
     }
    else
    {
        ShowPanel(false, 'CustomizeTeamInnerListDiv');
        
     }
}


function SetSkinIDToSkinIDTextBox(SkinID, skinClientID) {
  
    var objTextBox = GetDivObject(skinClientID);
    objTextBox.value = SkinID;
    ShowPanel(false, 'divSkinIDList');
}

function KeepOrgNameValue(labelClientID, HidLabelID, LabelCopyClientID) {


    var objLabel = GetDivObject(labelClientID);
    var objCopyLabel = GetDivObject(LabelCopyClientID);
    var objHiddenLabel = GetDivObject(HidLabelID);
 
   
    objLabel.innerHTML = objHiddenLabel.value;
    objCopyLabel.innerHTML = objHiddenLabel.value;
 }


function ShowMenu(e, labelClientID, OrgName, OrgID, IDClientID, HidLabelID){

    //Find out how close the mouse is to the corner of the window

    var objLabel = GetDivObject(labelClientID);
    var objHidden = GetDivObject(IDClientID);
    var objHiddenLabel = GetDivObject(HidLabelID);
    objHidden.value = OrgID;
    objHiddenLabel.value = OrgName;
    objLabel.innerHTML = OrgName;

var rightedge=ie5? document.body.clientWidth-event.clientX :window.innerWidth-e.clientX 
 
var bottomedge=ie5? document.body.clientHeight-event.clientY :window.innerHeight-e.clientY


//if the horizontal distance isn't enough to accomodate the width of the context menu

if (rightedge < ContextMenu.offsetWidth) {

    //move the horizontal position of the menu to the left by it's width

    ContextMenu.style.left = ie5 ? document.body.scrollLeft +
     event.clientX - ContextMenu.offsetWidth : window.pageXOffset
     + e.clientX - ContextMenu.offsetWidth

}

else {

    //position the horizontal position of the menu where the mouse was clicked

    ContextMenu.style.left = ie5 ? document.body.scrollLeft 
    + event.clientX : window.pageXOffset + e.clientX

}

//same concept with the vertical position

if (bottomedge < ContextMenu.offsetHeight) {

    ContextMenu.style.top = ie5 ? document.body.scrollTop
    + event.clientY - ContextMenu.offsetHeight

: window.pageYOffset + e.clientY - ContextMenu.offsetHeight

}

else {

    ContextMenu.style.top = ie5 ? document.body.scrollTop 
    + event.clientY : window.pageYOffset + e.clientY

}


if(ie5) 
  
window.event.cancelBubble = true; 
 
else if(ns6) 
    
e.stopPropagation();



ContextMenu.style.visibility = "visible";
ContextMenu.style.display= "block";
 
return false
}

function VerifyOrgName(Msg, TextBoxClientID) {

    var oTxtBox = GetDivObject(TextBoxClientID);
    if (oTxtBox.value == '') {
        alert(Msg);
        oTxtBox.focus();
        return false;

    }

    return true;
    
}

function GetAllControlPositionAndLabelText( ControlListID, LabelListID )
{
          var  objControlIst =GetDivObject(ControlListID);
          var  objLabelList =GetDivObject(LabelListID);
          objControlIst.value = '';
          objLabelList.value = '';
          for(i=0; i<ArrayclientID.length; i++) 
        {       
                var ID = ArrayclientID[i];

                var obj = GetDivObject(ID);
                //alert(obj.style.left);
                var  sLeft = obj.style.left;
                var  sTop = obj.style.top;
                objControlIst.value =objControlIst.value + ";"  +  ID + "," + sLeft + "," + sTop ;
             
        } 
        objControlIst.value = objControlIst.value + ";";
       // alert(ArrayLabelID.length); 
         for(i=0; i<ArrayLabelID.length; i++) 
        {
                var LabelID = ArrayLabelID[i];
               // alert( LabelID);
                var  objLabel =GetDivObject(LabelID);
               
               
               
                    var sText = objLabel.innerHTML;
                     objLabelList.value = objLabelList.value + LabelID + ',' + sText + ";";
                 
               
                
           
        }
         objLabelList.value = objLabelList.value +  ";";
       // alert( objControlIst.value);

}

function ChangeClassForDrag( cssClass, IsSetClass) {
   
        for(i=0; i<ArrayclientID.length; i++) 
        {       
                var ID = ArrayclientID[i];
               
                var  obj =GetDivObject(ID);
               
                if ( IsSetClass )
                {
                   // alert(cssClass);
                    obj.className = cssClass;
                 
                }
                else 
                {
                    obj.className = '';
                }
                
              
             
        } 
       // alert( ArrayLabelID.length);
         for(i=0; i<ArrayLabelID.length; i++) 
        {
                var LabelID = ArrayLabelID[i];
               // alert( LabelID);
                var  objLabel =GetDivObject(LabelID);
               
                if ( IsSetClass )
                {
               
                    objLabel.className = labelClass;
                    objLabel.title = TranslationLabelTitle;
                 
                }
                else 
                {
                    objLabel.className = '';
                }
                
           
        }
       

}

function SetClientID (DocumentWidth)
{       
        var CurrentLeft = DocumentWidth * 0.24;
        var leftestobj = 0;
        var objwidth =0;
       
        for(i=0; i<ArrayclientID.length; i++) 
        {       
                 
                var  obj =GetDivObject(ArrayclientID[i]);
               
                if ( IsFirstLoad == false )
                {
                    var nLeft = obj.style.left;
                    
                    nLeft = nLeft.replace("px", "");
                   
                    ObjLeft[i] =nLeft; 
                   
                    
                    
                }
                
              
             
        } 
        
        for(i=0; i<ArrayclientID.length; i++) 
        {  
                var oLeft = parseInt( ObjLeft[i]);
                var obj =GetDivObject(ArrayclientID[i]);
                var actualLeft = parseInt(obj.style.left) ;
                var rightLeft =parseInt(  oLeft) ;
                var leftSpace = ( actualLeft) ;
               // alert (obj.style.left );
                if ( CurrentLeft + 200 > oLeft  )
                {    //
                     while ( (objwidth  ) <CurrentLeft)
                    { 
                        actualLeft = actualLeft + 5;
                        objwidth = objwidth + 5;
                        // window.status =  CurrentLeft + "-" +  actualLeft + "-"   + leftestobj ;
                    }
                   
                    objwidth = objwidth/4  ;
                    break;
           
                }
                else if (leftSpace > 80    )
                {     objwidth =0;
                     while ( leftSpace <100)
                    {
                        leftSpace = leftSpace - 5;
                        objwidth = objwidth - 5;
                    }
                   
                    
                    break;
                        
                        
                
                }
        }
        
        //window.status =   leftSpace + "-"   + objwidth + "-" + CurrentLeft + "-" + oLeft;  //   oLeft + "-" +  actualLeft  +  "-" + CurrentLeft ;   
        if ( IsFirstLoad == false )
        {
            IsFirstLoad = true;
        }
        
       // window.status =leftestobj;
        for(i=0; i<ArrayclientID.length; i++) 
        {    
             CalLeftOffSet(ArrayclientID[i], DocumentWidth, i, objwidth );    
                
        }
        
      

}

function CalLeftOffSet(sID, DocumentWidth, index, MoveLeft )
{
  
   var  obj = GetDivObject(sID);
   var oLeft = parseInt( ObjLeft[index]);
   var rightLeft =parseInt(  oLeft + MoveLeft) ;
   obj.style.left = rightLeft  + "px";                
  // window.status = MoveLeft;               
//  var oLeft = parseInt( ObjLeft[index]);
//  var CurrentLeft = DocumentWidth * 0.24;
//  var rightLeft =parseInt(  oLeft) ; 
//  if ( CurrentLeft > oLeft )
//  {
//        
//        while ( (rightLeft + 100) <CurrentLeft)
//        {
//            rightLeft = rightLeft + 10;
//        
//        }
//        
//        
//        obj.style.left =rightLeft  + "px";
//         window.status =CurrentLeft + "\\" + rightLeft+ "\\+" + oLeft +  "\\+" +  IsFirstLoad; 
//        
//  }
//  
////  else   if ( (CurrentLeft < oLeft) && ( CurrentLeft > 280 ) )
////  {
////        
////        while (rightLeft>CurrentLeft)
////        {
////            rightLeft = rightLeft - 10;
////        
////        }
////       obj.style.left =rightLeft  + "px";
////        window.status =CurrentLeft + "\\" + rightLeft+ "\\-" + oLeft ;
////  }
//  else
//  {
//       obj.style.left = oLeft  + "px";
//       window.status = oLeft;
//  }
//  
//    
  
  
 
}

function findPosX(obj)
  {

    var curleft = 0;
    if(obj.offsetParent)
        while(1) 
        {
          curleft += obj.offsetLeft;
          if(!obj.offsetParent)
            break;
          obj = obj.offsetParent;
        }
    else if(obj.x)
        curleft += obj.x;
    return curleft;
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
        window.open(url, winName, move + ",width=" + w + ",height=" + h + ",scrollBars=" + scroll + ",resizable=yes");
    } else {
        window.open(url, winName, move + ",width=" + w + ",height=" + h + ",scrollBars=" + scroll + ",resizable=no");
    }
}

function WarningUnCheckedGeneralTab(oCheckBoxClientID, msg) {
    var oCheckBox = GetDivObject(oCheckBoxClientID);
    
        alert(msg);
    

}

function VerifyTabName(TabNameClientID) {

    var oTextBox = GetDivObject(TabNameClientID);
    if (oTextBox.value == '') {
        return false;
    }

    return true;
}

function IsControlTypeChage(oldControlType, TextBoxDetail, NewControlType, RadText, 
RadMoney, RadTextArea) {
    var accordEx1 = $find( NewControlType+'_AccordionExtender');
    if (accordEx1 != null) {
       var iIndex =  accordEx1.get_SelectedIndex();
     }
     var oOldBox = GetDivObject(oldControlType);
     var oRadText = GetDivObject(RadText);
     var oRadMoney = GetDivObject(RadMoney);
     var oRadTextArea = GetDivObject(RadTextArea);
     var oDetailBox = GetDivObject(TextBoxDetail);
     if (oOldBox.value != iIndex) {

         return false;

     }
     else if (iIndex == 0 && oOldBox.value == iIndex) {
         //  Money=1,
         // TextBox=2,
         // TextArea=3,
         // Date=4
         var DetailType = 'TextBox';
         if (oRadMoney.checked == true) {
             DetailType = 'Money';
         }
         else if (oRadTextArea.checked == true) {
             DetailType = 'TextArea';
         }
         if (oDetailBox.value != DetailType) {

             return false;
         }

     } 
    
    
    return true;
}

//function ValidateColumnNameAndSize(ColumnNameClientID, SizeClientID) {
//    var accordEx1 = $find( NewControlType+'_AccordionExtender');
//    if (accordEx1 != null) {
//       var iIndex =  accordEx1.get_SelectedIndex();
//     }

//     if (iIndex == 0) {
//         var oTextBox = GetDivObject(ColumnNameClientID);
//         
//     }
// }

function VerifyMaxSizeLength(NewControlType, SizeClientID) {
  
    var accordEx1 = $find(NewControlType + '_AccordionExtender');
    if (accordEx1 != null) {
        var iIndex = accordEx1.get_SelectedIndex();
    }

    if (iIndex == 0) {
        var oTextBox = GetDivObject(SizeClientID);
        //alert(oTextBox.value);
        if (oTextBox.value > 4000)
        {return false;}
    }
    return true;
}

function ValidateNumberOnFormDesign(NewControlType,   SizeClientID, WidthClientID, HeightClientID)
{
    var accordEx1 = $find( NewControlType+'_AccordionExtender');
    if (accordEx1 != null) {
       var iIndex =  accordEx1.get_SelectedIndex();
     }
    
    if (iIndex == 0 )
    {
        var oTextBox = GetDivObject(SizeClientID);
        return IsNumeric(oTextBox.value);
    }
    else if (iIndex == 4 )
    {
         var oWidthText  = GetDivObject(WidthClientID);
         
         var oHeightText  = GetDivObject(HeightClientID);
         if (!IsNumeric(oWidthText.value))
         {
             return false ;   
         }
         if ( !IsNumeric(oHeightText.value) )
         {
             return false ;  
         }
         
        
        
    }
     return true; 

}

function IsValidateTextNumeric( TextID)  
{
    var oTextBox = GetDivObject(TextID);
    return IsNumeric(oTextBox.value);
}



function IsNumeric(sText) {
    var ValidChars = "0123456789";
    var IsNumber = true;
    var Char;

 
    for (i = 0; i < sText.length && IsNumber == true; i++) {
        Char = sText.charAt(i);
        if (ValidChars.indexOf(Char) == -1) {
            IsNumber = false;
           
        }
    }
    return IsNumber;

}


function showOverlay() { 
            

var bid = $find('ProfileBehaviorID'); 
           
bid.show(); 

}

function LoadImage(ImageholdName, ImagePath) 
{
    var image = document.getElementById(ImageholdName);
    
    image.src = ImagePath;

   
}
//once the asynchronous post has been executed, 
//you might want to execute some Javascript after the request
function load() 
{
   Sys.WebForms.PageRequestManager.getInstance().add_endRequest(EndRequestHandler);
   

}

var pos = new Object();
pos.x =0;
pos.y=0;


var TimeToFade = 4000.0;

function ValidateNewMember(UserName,  NewPassword, ConfirmPassword, Msg1, Msg2, Msg3, Msg4)
{
        var oUserNameBox = GetDivObject(UserName);
        var oNewPasswordBox = GetDivObject(NewPassword);
        var oConfirmPasswordBox = GetDivObject(ConfirmPassword);
        if ( oUserNameBox.value == '' )
        {
            alert( Msg1);
           // oUserNameBox.focus();
            return false;
            
        }
           if ( oNewPasswordBox.value == '' )
        {
            alert( Msg2);
           // oNewPasswordBox.focus();
            return false;
            
        }
        if ( oConfirmPasswordBox.value == '' )
        {
            alert( Msg3);
            //oConfirmPasswordBox.focus();
            return false;
            
        }
        if ( oConfirmPasswordBox.value != oNewPasswordBox.value )
        {
            alert( Msg4);
            // oNewPasswordBox.focus();
            return false;
            
        }
        
        return true;
        

}
function ValidateUserName(UserName, Msg)
{
        
       var oUserNameBox = GetDivObject(UserName);
        if ( oUserNameBox.value == '' )
        {
            alert( Msg);
            oUserNameBox.focus();
            return false;
            
        }
        return true;
}


function ValidatePassword(UserName, Passwords, NewPassword, ConfirmPassword,  Msg1, Msg2, Msg3, Msg4, Msg5)
{
       
        var oUserNameBox = GetDivObject(UserName);
        var oPasswordBox = GetDivObject(Passwords);
        var oNewPasswordBox = GetDivObject(NewPassword);
        var oConfirmPasswordBox = GetDivObject(ConfirmPassword);
        //alert ( oUserNameBox.value );
        if ( oUserNameBox.value == '' )
        {
            alert( Msg1);
            oUserNameBox.focus();
            return false;
            
        }
        if ( oPasswordBox.value == '' )
        {
            alert(Msg2);
            oPasswordBox.focus();
            return false;
            
        }
        
        if ( oNewPasswordBox.value == '' )
        {
            alert( Msg3);
           oNewPasswordBox.focus();
            return false;
            
        }
        if ( oConfirmPasswordBox.value == '' )
        {
            alert( Msg4);
            oConfirmPasswordBox.focus();
            return false;
            
        }
        if ( oConfirmPasswordBox.value != oNewPasswordBox.value )
        {
            alert( Msg5);
            oNewPasswordBox.focus();
            return false;
            
        }
        
        return true;
        
}


var TimeToFade = 1000.0;

function fade(eid)
{
  var element = document.getElementById(eid);
  if(element == null)
    return;
  
  if(element.FadeState == null)
  {
    if(element.style.opacity == null 
        || element.style.opacity == '1' 
        || element.style.opacity == '1')
    {
      element.FadeState = 2;
    }
    else
    {
      element.FadeState = 2;
    }
  }
     
  if(element.FadeState == 1 || element.FadeState == -1)
  {
   // element.FadeState = element.FadeState ==2; // 1 ? -1 : 1;
    //element.FadeTimeLeft = TimeToFade - element.FadeTimeLeft;
  }
  else
  {
    element.FadeState = element.FadeState == 2; ///? -1 : 1;
    element.FadeTimeLeft = TimeToFade;
    setTimeout("animateFade(" + new Date().getTime() + ",'" + eid + "')", 33);
  }  
}


function animateFade(lastTick, eid)
{  
  var curTick = new Date().getTime();
  var elapsedTicks = curTick - lastTick;
  
  var element = document.getElementById(eid);
 
  if(element.FadeTimeLeft <= elapsedTicks)
  {
    element.style.opacity = element.FadeState == 1 ? '1' : '0';
    element.style.filter = 'alpha(opacity = ' 
        + (element.FadeState == 1 ? '50' : '0') + ')';
    element.FadeState = element.FadeState == 1 ? 2 : -2;
    return;
  }
 
  element.FadeTimeLeft -= elapsedTicks;
  var newOpVal = element.FadeTimeLeft/TimeToFade;
  if(element.FadeState == 1)
    newOpVal = 1 - newOpVal;
 
  element.style.opacity =newOpVal;
  element.style.filter = 'alpha(opacity = ' + (newOpVal*100) + ')';
  //alert(element.style.filter);
  setTimeout("animateFade(" + curTick + ",'" + eid + "')", 33);
}


 function FreezeScreen(msg) {
      scroll(0,0);
      var outerPane = document.getElementById('FreezePane');
      //var innerPane = document.getElementById('InnerFreezePane');
      if (outerPane) outerPane.className = 'FreezePaneOn';
      //if (innerPane) innerPane.innerHTML = msg;
      fade('FreezePane');
    //  $("FreezePane").fadeOut("slow");

     // var bodyPane = document.getElementById('editmainbody')
     // if (bodyPane) bodyPane.className = 'FreezePaneOff';
      
      
   }

function FreezeScreenOff() {
    var outerDiv = document.getElementById('FreezePane');
    var innerDiv = document.getElementById('InnerFreezePane');
    if (outerDiv) outerDiv.className = 'FreezePaneOff';
    if (innerDiv) innerDiv.innerHTML = '';
    
}

function SetDefaultTab()
{
 //alert ('test');
 var container = $find('ctl00_mainContent_ctl00_ctrMainEdit1_ctl02'); 
   container.set_activeTabIndex(0); 
}

function FormDesignBox(FormDesignID, ClientID )
{
    var oCheckBox = GetDivObject(ClientID);
    if (oCheckBox.checked)
    {
        ShowPanel(true, FormDesignID);
    }
    else 
    {
            ShowPanel(false, FormDesignID);
    }    


}


function SetMemberIDToHidValue(HidTextID, MemberID)
{
         var HidText = GetDivObject(HidTextID); 
         HidText.value =MemberID ;
         //alert(HidText.value);
}
function SetHidValue(HidTextID)
{
         var HidText = GetDivObject(HidTextID); 
         HidText.value ='IniMain';
        // alert(HidText.value);
}

function SetHidSaveValue(HidTextID)
{         
         var HidText = GetDivObject(HidTextID); 
         HidText.value ='Save';
       //alert(HidText.value);
}


function GetDropDownListSelectedValue(DropDownListID, HidTextID)
{
     var DropDownList = GetDivObject(DropDownListID); 
     var HidText = GetDivObject(HidTextID); 
     if (HidText.value != '-1' )
     { 
   HidText.value =(DropDownList.options[DropDownList.selectedIndex].value   );
   // alert(HidText.value);
    }

}

function GetDivObject(Div_ID)
{
	/* MSIE, Konqueror, Opera : */
	if (window.document.all)
		return eval("window.document.all."+Div_ID);

	/* Netscape6/Mozilla : */
	if (bw.ns5) //typeof(window.document.getElementById)=="function") //
		return window.document.getElementById(Div_ID);

	/* uebrig bleibt Netscape4 : */
	return eval("window.document."+Div_ID);
}


var CheckBoxCheckedColor ="";
//check box change row color

function VerifySpecialChar(TextBoxID, MSG)
{
  var oTextBox = GetDivObject(TextBoxID);
  if ( oTextBox.value.indexOf(";") != -1)  
  {
     alert ( MSG );  
     return false; 
  }
  else if ( oTextBox.value.indexOf(",") != -1) 
  {
     alert ( MSG );
     return false;
 }
 else if (oTextBox.value.indexOf("'") != -1) {
     alert(MSG);
     return false;
 }

 else if (oTextBox.value.indexOf(" ") != -1) {
     alert(MSG);
     return false;
 }
   
   return true;
}

function EnableReadOnly(MCheckBoxID, RCheckBoxID, MTextBoxID, RTextBoxID) {

    var MCheckBox = GetDivObject(MCheckBoxID);
    var RCheckBox = GetDivObject(RCheckBoxID);
    var MTextBox = GetDivObject(MTextBoxID);
    var RTextBox = GetDivObject(RTextBoxID);
    if (MCheckBox.checked == true) {

        RCheckBox.checked = false;
        RCheckBox.disabled = true;

        RTextBox.disabled = true ;
        MTextBox.disabled = false;
          
     }
    else {

       // RCheckBox.checked = true;
        RCheckBox.disabled = false;

        RTextBox.disabled = false;
        MTextBox.disabled = true ;
     }

     if (RCheckBox.checked == true) {

         MCheckBox.checked = false;
         MCheckBox.disabled = true;

         MTextBox.disabled = true;
         RTextBox.disabled = false;

     }
     else {

         // RCheckBox.checked = true;
         MCheckBox.disabled = false;

         MTextBox.disabled = false;
         RTextBox.disabled = true;
     }
    

}


function EnableTextBox(CheckBoxID, TextBoxID, MsgBoxID, MCheckBoxID, chkReadOnly, DDLIDList) {
    
        var oCheckBox = GetDivObject(CheckBoxID);
        var oTextBox = GetDivObject(TextBoxID);
         var oMCheckBox = GetDivObject(MCheckBoxID);
         var oMsgTextBox = GetDivObject(MsgBoxID);

         var oReadOnlyBox = GetDivObject(chkReadOnly);
         var oDDLIDIstBox = GetDivObject(DDLIDList);
        //alert(oCheckBox.checked);
        // Text box 
        if ( oCheckBox.checked == true)
        {
               oTextBox.disabled=false;
               // oMCheckBox.checked = false;
               oMCheckBox.disabled =  false  ;
               oMsgTextBox.value = '';
               oMsgTextBox.disable = false  ;
               oReadOnlyBox.disabled = false;
               
               oDDLIDIstBox.disabled = false;
             
        }
        else {
            oReadOnlyBox.checked = false;
               oTextBox.disabled=true ;
               oMCheckBox.checked = false;
               oMCheckBox.disabled = true  ;
               oMsgTextBox.value = '';
               oMsgTextBox.disabled = true;
               oReadOnlyBox.disabled = true;
               oDDLIDIstBox.disabled = true;
                
        }
}

function changeColor(oRow, sColor, CheckBoxID, oldBackColor)
{ 
        var ocheckbox = GetDivObject(CheckBoxID); 
        if ( ocheckbox.checked == true)
        {
        
            //oRow.originalBackgroundColor = oRow.style.backgroundColor
            CheckBoxCheckedColor = sColor;
            oRow.style.backgroundColor = sColor;
        }
        else
        {
            
             oRow.style.backgroundColor = oRow.originalBackgroundColor;
        
        }
       
    

}
//change color for accordion 
var OldColor="#5B5B5B";
function ChangeFontColorByID(ID, IsChange)
{            
         var oLinkButton = document.getElementById(ID);
          if ( IsChange )
          {
                if ( oLinkButton.style.color != '')
                {
                    OldColor =  oLinkButton.style.color;
                }
                 OldColor =  oLinkButton.style.color;
                oLinkButton.style.color ="#4169E1";
          }
          else
          {
                  oLinkButton.style.color =OldColor;
          }
}


//Grid Mouse over and Mouse out
function ItemMouseOver(oRow, Color)
{
      
        if ( CheckBoxCheckedColor=='')
        {
          oRow.originalBackgroundColor = oRow.style.backgroundColor;
          oRow.style.backgroundColor = Color;
        }
        else if (CheckBoxCheckedColor.toUpperCase() != oRow.style.backgroundColor.toUpperCase())
        {
             
             oRow.originalBackgroundColor = oRow.style.backgroundColor;
             oRow.style.backgroundColor = Color;
        
        }
      
    
}

function ItemMouseOut(oRow, Color)
{
       //alert(Color);
       //alert (oRow.style.backgroundColor );
       if (oRow.style.backgroundColor.toUpperCase() != CheckBoxCheckedColor.toUpperCase())
       
       {
        oRow.style.backgroundColor = oRow.originalBackgroundColor;
       }
    
}

function SetPosition(ID, e)
{
         GetMousePosition(e);

}

//Get mouse position
function GetMousePosition(e)
{
   var posx = 0;
   var posy = 0;
   if (!e) var e = window.event;
   if (e.pageX || e.pageY)
   {
      posx = e.pageX;
      posy = e.pageY;
   }
   else if (e.clientX || e.clientY)
   {
      posx = e.clientX;
      posy = e.clientY;
   }
   
   pos.x = posx;
   pos.y=posy;
   
}


    
//Popup a context menu
function popupMenu(IsHide, MenuID,ID,  e)
{
 
 
 
 
 if (IsHide == true)
 {
    
     $("#"+ MenuID).hide();
 }
 else 
 {
    //
       // if (right(e)==true)
        //{
       // $("input:hidden[id=^HiddenField1").val(ID);
       //alert($("input:hidden[id=^HiddenField1").val());
        GetMousePosition(e);
        document.oncontextmenu = function () { return false; }; 
         $("#"+ MenuID).css({  position: "absolute" });
         $("#"+ MenuID).css( {  left: (pos.x -240 )+ "px", top: (pos.y -120 )  + "px" } ); 
         $("#"+ MenuID).show();
       //  }
      
  }
  
}

function showMenu(MenuID)
{
    
     $("#"+ MenuID).show();
}

function checkAll(cssClassName, isChecked) {
 // var cssClassName ="GridLinkButton";
  $("."+ cssClassName +" > input").each(function() {
   this.checked = isChecked;
  });
}

function SaveRuleConfirm(Msg, HidClientID)
{
     var answer = confirm(Msg)
	   if (answer)
	      { 
	        var HidText = GetDivObject(HidClientID); 
	        HidText.value = "1"; //1 save the data
	        document.forms[0].method = 'POST';
	        //document.forms[0].action = URL;
	        document.forms[0].submit();
	      }
         
}


function IsDeleteNodeConfirm(Msg, HidClientID) {
    var HidText = GetDivObject(HidClientID);
   
    Msg = Msg + " " + HidText.innerText; 
    var answer = confirm(Msg)
    if (answer)
    { return true; }
    else
    { return false; }
}
function IsDeleteConfirm(Msg)
{
     var answer = confirm(Msg)
	   if (answer)
	      { return true; }
          else 
          { return false; }    
}

function CheckBoxFromGridView(GridViewClientID, IsAllChecked, CheckBoxCellIndex, IDCellIndex, NoCheckMsg, FirstPartMSG)
{
                
        

                
                var sMSG = "";
                var oGridView = GetDivObject(GridViewClientID); 
                //alert (oGridView.rows.length );
                 if (oGridView.rows.length > 0)
                    {
                    for (i=0; i<oGridView.rows.length; i++)
                    { 
                         
                         cell = oGridView.rows[i].cells[CheckBoxCellIndex];
                         // alert(cell);
                         if (cell.innerHTML.indexOf("type=checkbox") != -1 )
                         {
                                //alert(cell.innerHTML);
                                if (cell.innerHTML.indexOf("CHECKED") != -1 )
                                {
                                 IDCell = oGridView.rows[i].cells[IDCellIndex];
                                 IDCellSecond =  oGridView.rows[i].cells[IDCellIndex+ 1];
                                 sMSG = sMSG +  IDCell.innerText + " " + IDCellSecond.innerText + " \n";
                                 }
                          }

                    }
                 }
                 if  (sMSG != "")
                 {
                    var answer = confirm(FirstPartMSG + " \n" + sMSG)
	                if (answer)
	                    { return true; }
                    else 
                        { return false }
                   
                 }
                 else
                 {
                    alert(NoCheckMsg);
                    return false;
                 }
}

//Tree view 

 
 

function RightClick(event)
{
    var obj = event.srcElement || event.target ;
    var seltreeNode = obj; 
    alert(seltreeNode.innerHTML); //This will prompt selected Node Text

     //This will change the selected node text as “Rajesh Babu”
}


function TreeViewClick(TreeID) 
{

 


 var treeView = document.getElementById(TreeID);
 //alert(treeView.innerHTML);
 var treeLinks = treeView.getElementsByTagName("a");
    
var o = window.event.srcElement;  
var nodeClick = o.tagName.toLowerCase() == "a";
if(nodeClick)
{
var nodeText = o.innerText;
var nodeValue = GetNodeValue(o);
alert("Text: "+nodeText + "," + "Value: "+ nodeValue);
}

var nodeCount = treeLinks.length;

for(i=0;i<nodeCount;i++)
{
    //alert(treeLinks[i].innerHTML);
}
    // if (o.tagName == 'INPUT' && o.type == 'checkbox') 
       //  {        var hiddenValue = o.nextSibling; 
                 
                // do something here with hiddenValue.value   
        //     }

//        for(var i = 0; i < x.length;i++) 
//        {

//        var tab = x[i]; 
//        var ang = tab.childNodes;

//            for(var d = 0;d<ang.length;d++) 
//            {

//            var chi = ang[d];

//            } 
//        }

}


function GetNodeValue(node)
{

    var nodeValue = "";
    var nodePath = node.href.substring(node.href.indexOf(",")+2,node.href.length-2);
    var nodeValues = nodePath.split("\\");
    if(nodeValues.length > 1)
    nodeValue = nodeValues[nodeValues.length - 1];
    else
    nodeValue = nodeValues[0].substr(1); return nodeValue;
}

function CheckBoxToShow(IsShow, ID, CheckBoxID)
{
     var ocheckbox = GetDivObject(CheckBoxID); 
   
        if ( ocheckbox.checked == true)
        {
             
                ShowPanel(IsShow, ID);
        }
        else 
        {
                  ShowPanel(false, ID);
            
        }

}

function UnChecked (CheckBoxID)
{  // alert(CheckBoxID);
    var ocheckbox = GetDivObject(CheckBoxID); 
    ocheckbox.checked = false;
}

function ShowPanel(IsShow, ID)
{
          if (IsShow ==true)
          {
              $("#" + ID).css({ visibility: "visible" });
              $("#" + ID).css({ display: "block" });
           }
           else 
           {
               $("#" + ID).css({ visibility: "hidden" });
               $("#" + ID).css({ display: "none" });
           }
              
}


function KeepThisFormShow(ID, FormID)
{
 var ocheckbox = GetDivObject(ID); 
  if ( ocheckbox.checked == true)
  {
  
        ShowPanel(true, FormID);
  }
}


function SetFocus( clientID )
{
 
 $('#' + clientID ).focus();

}

function VerifyTextBox( Msg, ClientID )
{
      var VText = GetDivObject( ClientID); 
    if (VText.value == '')
    {
        alert ( Msg);
        return false ;
    }
}


 var hidClientID = null;
 var ClientMsg = null;
 function EndRequestHandler(sender, args)
 { 
 
  var HidMsgText = GetDivObject( hidClientID); 
      if (HidMsgText.value == 'Varify')
      {
            
            alert(ClientMsg );
            HidMsgText.value ='Add';
            ShowPanel(true, 'SelectAddCity');
      }   
      
  }
  
  function AddCityload() 
  {
        Sys.WebForms.PageRequestManager.getInstance().add_endRequest(EndRequestHandler);
        
  }
  
  function SetAddCityPublicValue(Msg, ClientID)
  {
    hidClientID = ClientID;
    ClientMsg = Msg;
  
  }
  
  function KeepDropDownListValue(ClientID, DropDownListClientID)
  {
    var HidSelectedValue = GetDivObject( ClientID); 
    var DDLList = GetDivObject(DropDownListClientID );
    HidSelectedValue.value=DDLList.options[DDLList.selectedIndex].text;
    //alert(HidSelectedValue.value);
  
  }




// NOTE THE DIFFERENCE BETWEEN MM and mm! Month=MM, not mm!
// Examples:
//  "MMM d, y" matches: January 01, 2000
//                      Dec 1, 1900
//                      Nov 20, 00
//  "M/d/yy"   matches: 01/20/00
//                      9/2/00
//  "MMM dd, yyyy hh:mm:ssa" matches: "January 01, 2000 12:30:45AM"
// ------------------------------------------------------------------

var MONTH_NAMES=new Array('January','February','March','April','May','June','July','August','September','October','November','December','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
var DAY_NAMES=new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sun','Mon','Tue','Wed','Thu','Fri','Sat');
function LZ(x) {return(x<0||x>9?"":"0")+x}

// ------------------------------------------------------------------
// isDate ( date_string, format_string )
// Returns true if date string matches format of format string and
// is a valid date. Else returns false.
// It is recommended that you trim whitespace around the value before
// passing it to this function, as whitespace is NOT ignored!
// ------------------------------------------------------------------
function isDate(val,format) {
	var date=getDateFromFormat(val,format);
	if (date==0) { return false; }
	return true;
	}

// -------------------------------------------------------------------
// compareDates(date1,date1format,date2,date2format)
//   Compare two date strings to see which is greater.
//   Returns:
//   1 if date1 is greater than date2
//   0 if date2 is greater than date1 of if they are the same
//  -1 if either of the dates is in an invalid format
// -------------------------------------------------------------------
function compareDates(date1,dateformat1,date2,dateformat2) {
	var d1=getDateFromFormat(date1,dateformat1);
	var d2=getDateFromFormat(date2,dateformat2);
	if (d1==0 || d2==0) {
		return -1;
		}
	else if (d1 > d2) {
		return 1;
		}
	return 0;
	}

// ------------------------------------------------------------------
// formatDate (date_object, format)
// Returns a date in the output format specified.
// The format string uses the same abbreviations as in getDateFromFormat()
// ------------------------------------------------------------------
function formatDate(date,format) {
	format=format+"";
	var result="";
	var i_format=0;
	var c="";
	var token="";
	var y=date.getYear()+"";
	var M=date.getMonth()+1;
	var d=date.getDate();
	var E=date.getDay();
	var H=date.getHours();
	var m=date.getMinutes();
	var s=date.getSeconds();
	var yyyy,yy,MMM,MM,dd,hh,h,mm,ss,ampm,HH,H,KK,K,kk,k;
	// Convert real date parts into formatted versions
	var value=new Object();
	if (y.length < 4) {y=""+(y-0+1900);}
	value["y"]=""+y;
	value["yyyy"]=y;
	value["yy"]=y.substring(2,4);
	value["M"]=M;
	value["MM"]=LZ(M);
	value["MMM"]=MONTH_NAMES[M-1];
	value["NNN"]=MONTH_NAMES[M+11];
	value["d"]=d;
	value["dd"]=LZ(d);
	value["E"]=DAY_NAMES[E+7];
	value["EE"]=DAY_NAMES[E];
	value["H"]=H;
	value["HH"]=LZ(H);
	if (H==0){value["h"]=12;}
	else if (H>12){value["h"]=H-12;}
	else {value["h"]=H;}
	value["hh"]=LZ(value["h"]);
	if (H>11){value["K"]=H-12;} else {value["K"]=H;}
	value["k"]=H+1;
	value["KK"]=LZ(value["K"]);
	value["kk"]=LZ(value["k"]);
	if (H > 11) { value["a"]="PM"; }
	else { value["a"]="AM"; }
	value["m"]=m;
	value["mm"]=LZ(m);
	value["s"]=s;
	value["ss"]=LZ(s);
	while (i_format < format.length) {
		c=format.charAt(i_format);
		token="";
		while ((format.charAt(i_format)==c) && (i_format < format.length)) {
			token += format.charAt(i_format++);
			}
		if (value[token] != null) { result=result + value[token]; }
		else { result=result + token; }
		}
	return result;
	}
	
// ------------------------------------------------------------------
// Utility functions for parsing in getDateFromFormat()
// ------------------------------------------------------------------
function _isInteger(val) {
	var digits="1234567890";
	for (var i=0; i < val.length; i++) {
		if (digits.indexOf(val.charAt(i))==-1) { return false; }
		}
	return true;
	}
function _getInt(str,i,minlength,maxlength) {
	for (var x=maxlength; x>=minlength; x--) {
		var token=str.substring(i,i+x);
		if (token.length < minlength) { return null; }
		if (_isInteger(token)) { return token; }
		}
	return null;
	}
	
// ------------------------------------------------------------------
// getDateFromFormat( date_string , format_string )
//
// This function takes a date string and a format string. It matches
// If the date string matches the format string, it returns the 
// getTime() of the date. If it does not match, it returns 0.
// ------------------------------------------------------------------
function getDateFromFormat(val,format) {
	val=val+"";
	format=format+"";
	var i_val=0;
	var i_format=0;
	var c="";
	var token="";
	var token2="";
	var x,y;
	var now=new Date();
	var year=now.getYear();
	var month=now.getMonth()+1;
	var date=1;
	var hh=now.getHours();
	var mm=now.getMinutes();
	var ss=now.getSeconds();
	var ampm="";
	
	while (i_format < format.length) {
		// Get next token from format string
		c=format.charAt(i_format);
		token="";
		while ((format.charAt(i_format)==c) && (i_format < format.length)) {
			token += format.charAt(i_format++);
			}
		// Extract contents of value based on format token
		if (token=="yyyy" || token=="yy" || token=="y") {
			if (token=="yyyy") { x=4;y=4; }
			if (token=="yy")   { x=2;y=2; }
			if (token=="y")    { x=2;y=4; }
			year=_getInt(val,i_val,x,y);
			if (year==null) { return 0; }
			i_val += year.length;
			if (year.length==2) {
				if (year > 70) { year=1900+(year-0); }
				else { year=2000+(year-0); }
				}
			}
		else if (token=="MMM"||token=="NNN"){
			month=0;
			for (var i=0; i<MONTH_NAMES.length; i++) {
				var month_name=MONTH_NAMES[i];
				if (val.substring(i_val,i_val+month_name.length).toLowerCase()==month_name.toLowerCase()) {
					if (token=="MMM"||(token=="NNN"&&i>11)) {
						month=i+1;
						if (month>12) { month -= 12; }
						i_val += month_name.length;
						break;
						}
					}
				}
			if ((month < 1)||(month>12)){return 0;}
			}
		else if (token=="EE"||token=="E"){
			for (var i=0; i<DAY_NAMES.length; i++) {
				var day_name=DAY_NAMES[i];
				if (val.substring(i_val,i_val+day_name.length).toLowerCase()==day_name.toLowerCase()) {
					i_val += day_name.length;
					break;
					}
				}
			}
		else if (token=="MM"||token=="M") {
			month=_getInt(val,i_val,token.length,2);
			if(month==null||(month<1)||(month>12)){return 0;}
			i_val+=month.length;}
		else if (token=="dd"||token=="d") {
			date=_getInt(val,i_val,token.length,2);
			if(date==null||(date<1)||(date>31)){return 0;}
			i_val+=date.length;}
		else if (token=="hh"||token=="h") {
			hh=_getInt(val,i_val,token.length,2);
			if(hh==null||(hh<1)||(hh>12)){return 0;}
			i_val+=hh.length;}
		else if (token=="HH"||token=="H") {
			hh=_getInt(val,i_val,token.length,2);
			if(hh==null||(hh<0)||(hh>23)){return 0;}
			i_val+=hh.length;}
		else if (token=="KK"||token=="K") {
			hh=_getInt(val,i_val,token.length,2);
			if(hh==null||(hh<0)||(hh>11)){return 0;}
			i_val+=hh.length;}
		else if (token=="kk"||token=="k") {
			hh=_getInt(val,i_val,token.length,2);
			if(hh==null||(hh<1)||(hh>24)){return 0;}
			i_val+=hh.length;hh--;}
		else if (token=="mm"||token=="m") {
			mm=_getInt(val,i_val,token.length,2);
			if(mm==null||(mm<0)||(mm>59)){return 0;}
			i_val+=mm.length;}
		else if (token=="ss"||token=="s") {
			ss=_getInt(val,i_val,token.length,2);
			if(ss==null||(ss<0)||(ss>59)){return 0;}
			i_val+=ss.length;}
		else if (token=="a") {
			if (val.substring(i_val,i_val+2).toLowerCase()=="am") {ampm="AM";}
			else if (val.substring(i_val,i_val+2).toLowerCase()=="pm") {ampm="PM";}
			else {return 0;}
			i_val+=2;}
		else {
			if (val.substring(i_val,i_val+token.length)!=token) {return 0;}
			else {i_val+=token.length;}
			}
		}
	// If there are any trailing characters left in the value, it doesn't match
	if (i_val != val.length) { return 0; }
	// Is date valid for month?
	if (month==2) {
		// Check for leap year
		if ( ( (year%4==0)&&(year%100 != 0) ) || (year%400==0) ) { // leap year
			if (date > 29){ return 0; }
			}
		else { if (date > 28) { return 0; } }
		}
	if ((month==4)||(month==6)||(month==9)||(month==11)) {
		if (date > 30) { return 0; }
		}
	// Correct hours value
	if (hh<12 && ampm=="PM") { hh=hh-0+12; }
	else if (hh>11 && ampm=="AM") { hh-=12; }
	var newdate=new Date(year,month-1,date,hh,mm,ss);
	return newdate.getTime();
	}

// ------------------------------------------------------------------
// parseDate( date_string [, prefer_euro_format] )
//
// This function takes a date string and tries to match it to a
// number of possible date formats to get the value. It will try to
// match against the following international formats, in this order:
// y-M-d   MMM d, y   MMM d,y   y-MMM-d   d-MMM-y  MMM d
// M/d/y   M-d-y      M.d.y     MMM-d     M/d      M-d
// d/M/y   d-M-y      d.M.y     d-MMM     d/M      d-M
// A second argument may be passed to instruct the method to search
// for formats like d/M/y (european format) before M/d/y (American).
// Returns a Date object or null if no patterns match.
// ------------------------------------------------------------------
function parseDate(val) {
	var preferEuro=(arguments.length==2)?arguments[1]:false;
	generalFormats=new Array('y-M-d','MMM d, y','MMM d,y','y-MMM-d','d-MMM-y','MMM d');
	monthFirst=new Array('M/d/y','M-d-y','M.d.y','MMM-d','M/d','M-d');
	dateFirst =new Array('d/M/y','d-M-y','d.M.y','d-MMM','d/M','d-M');
	var checkList=new Array('generalFormats',preferEuro?'dateFirst':'monthFirst',preferEuro?'monthFirst':'dateFirst');
	var d=null;
	for (var i=0; i<checkList.length; i++) {
		var l=window[checkList[i]];
		for (var j=0; j<l.length; j++) {
			d=getDateFromFormat(val,l[j]);
			if (d!=0) { return new Date(d); }
			}
		}
	return null;
	}



//Email Check


function checkEmail(inputvalue){	
    var pattern=/^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
    if(pattern.test(inputvalue)){         
		return true ;   
    }else{   
		return false; 
    }
}
//parseInt
//Password /^[A-Za-z\d]{6,8}$/

