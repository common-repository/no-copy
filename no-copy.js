/*
Plugin Name: No Copy
Plugin URI: http://mohanjith.com/wordpress/no-copy.html
Description: No Copy plugin prevents users from using their context menu (right click) on your blog
Author: S H Mohanjith
Version: 1.0.4
Author URI: http://mohanjith.com/
License: GPL
*/

var no_copy_message="";
function killCtrlKeyCombo(e){
 var forbiddenKeys = new Array('a','c','x'); var key; var isCtrl;
 if(window.event) { key = window.event.keyCode;     //IE
  if(window.event.ctrlKey) isCtrl = true; else isCtrl = false;
 } else {
  key = e.which;     //firefox
  if(e.ctrlKey) isCtrl = true; else isCtrl = false;
 }
 //if ctrl is pressed check if other key is in forbidenKeys array
 if(isCtrl) {
  for(i=0; i<forbiddenKeys.length; i++) { //case-insensitive comparation
   if(forbiddenKeys[i].toLowerCase() == String.fromCharCode(key).toLowerCase()) {
    (no_copy_message); return false;
   }
  }
 }
 return true;
}
function disableSelection(target) {
 if (typeof target.onselectstart!="undefined") {
  target.onselectstart = function(){return false;}
 } else if (typeof target.style.MozUserSelect!="undefined") {
  target.style.MozUserSelect="none";
 } else {
  target.onmousedown = function(){return false;}
 }
 target.style.cursor = "default";
}
function clickIE() {
 if (document.all) {
  (no_copy_message);
  return false;
 }
 return true;
}
function clickNS(e) {
 if (document.layers || (document.getElementById && !document.all)) {
  if (e.which==2 || e.which==3) {
   (no_copy_message);
   return false;
  }
 }
 return true;
}
if (document.layers) {
 document.captureEvents(Event.MOUSEDOWN);
 document.onmousedown=clickNS;
} else {
 document.onmouseup=clickNS;document.oncontextmenu=clickIE;
}
jQuery(document).ready(function () {
    disableSelection(document.body)
});
document.oncontextmenu = new Function("return false;");
document.onkeydown = killCtrlKeyCombo;
