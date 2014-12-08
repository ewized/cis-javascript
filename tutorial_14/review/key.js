/*
   New Perspectives on HTML5, CSS, and JavaScript
   Tutorial 14
   Review Assignment

   Author: Joshua Rodriguez
   Date:   Dec 8 2014

   Filename: keyword.js


   Functions List:

   makeElemList(elem)
      Returns a sorted array containing the content of all elements with the tag name
      "elem".

   setElemId(elem, elemText)
      Sets and returns the id for an element with the tag name "elem" and containing
      the content "elemeText".

   makeKeyWordBox()
      Creates a keyword box containing a sorted list of hyperlinks pointing to
      all of the dfn elements in the main document.


*/

window.onload = makeKeyWordBox;

function makeElemList(elem) {
   var elemList = document.getElementsByTagName(elem);
   var elemTextArr = [];

   for (var i = 0 ; i < elemList.length ; i++) {
      elemTextArr[i] = elemList[i].innerHTML;
   }

   elemTextArr.sort();
   return elemTextArr;
}

function setElemId(elem, elemText) {
   var elemList = document.getElementsByTagName(elem);
   var elemId;

   for (var i = 0 ; i < elemList.length ; i++) {
      if (elemList[i].innerHTML == elemText) {

         if (elemList[i].id == "") {
            elemId = "keyword" + i;
            elemList[i].id = elemId;
         }
         else {
            elemId = elemList[i].id;
         }
      }
   }

   return elemId;
}

function makeKeyWordBox() {
   var historyDoc = document.getElementById("doc");
   var keywordBox = document.createElement("aside");
   keywordBox.id = "keywords";

   var keywordBoxTitle = document.createElement("h1");
   keywordBoxTitle.innerHTML = "Keywords";

   keywordBox.appendChild(keywordBoxTitle);

   var ulList = document.createElement("ul");
   keywordBox.appendChild(ulList);

   var keywords = makeElemList("dfn");
   keywords.sort();

   for (var i = 0 ; i < keywords.length ; i++) {
      var newListItem = document.createElement("li");
      var newLink = document.createElement("a");
      newLink.href = "#";
      newLink.innerHTML = keywords[i];

      var linkId = setElemId("dfn", keywords[i]);
      newLink.href += linkId;
      newListItem.appendChild(newLink);
      ulList.appendChild(newListItem);
   }

   historyDoc.childNodes[3].appendChild(keywordBox);
}