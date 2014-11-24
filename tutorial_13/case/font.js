/*
   New Perspectives on HTML, CSS, and JavaScript
   Tutorial 13
   Case Problem 1

    Author:      Joshua Rodriguez
    Date:        11 / 23 / 2014

   Function List
   =============

   startup()
      Run when the Web page is loaded; applies the onclick
      event handlers to the font buttons.

   resizeText()
      Changes the inline font-size style for the document body,
      based on the value of the font image button being clicked.
	
*/

window.onload = startup;
var size = 15;

function startup() {
   document.getElementById("fontdown").onclick = resizeText;
   document.getElementById("fontup").onclick = resizeText;
}

function resizeText() {
   var p = document.querySelectorAll("article p");
   size += this.id == "fontup" ? 1 : -1;

   for (i = 0 ; i < p.length ; i++) {
      p[i].style.fontSize = size + "px";
   }
}
