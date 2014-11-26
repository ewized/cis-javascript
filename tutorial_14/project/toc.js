/*
   New Perspectives on HTML5, CSS, and JavaScript
   Tutorial 14
   Tutorial Case

   Author: Joshua Rodriguez
   Date:   1/24/2014

   Filename: toc.js


   Function List
   =============

   makeTOC()
      Generates the text of the table of contents
      as a nested list

   createList(source, TOCList, headings)
      Creates a TOC list based on the source document,
      list items are appended to TOCList,
      the list items are based on the element names
      specified in the headings array

   expandCollapse()
      Expands and collapses the nested lists in the TOC

   expandCollapseDoc()
      Expands and collapses the source document to match
      to the TOC

   isHidden(object)
      Determines whether a TOC list item is hidden in the document


*/

window.onload = makeTOC;

function makeTOC() {
   var toc = document.getElementById("toc");
   toc.innerHTML = "<h1>TOC</h1>";
   var selector = ["h1", "h2", "h3", "h4", "h5", "h6"];

   var list = toc.appendChild(document.createElement("ol"));

   var elements = document.getElementById("doc");

   createList(elements, list, selector);

}

function createList(source, list, headings) {
   var level = 0;

   for (var n = source.firstChild ; n != null ; n = n.nextSibling) {
      var nodeLevel = headings.indexOf(n.nodeName.toLowerCase());
      // alert(nodeLevel + " " + n.nodeName);

      if (nodeLevel != -1) {
         var node = document.createElement("li");
         node.innerHTML = n.innerHTML;

         // Create a child list
         if (nodeLevel == level) {
            list.appendChild(node);
         }
         // Start new child tab list
         else if (nodeLevel > level) {
            var nestedList = document.createElement("ol");
            nestedList.appendChild(node);
            list.lastChild.appendChild(nestedList);
            list = nestedList;
         }
         // Append to parent list
         else {
            var preLevel = (level - nodeLevel);
            for (var i = 1 ; i <= preLevel ; i++) {
               list = list.parentNode.parentNode;
            }

            list.appendChild(node);
         }

         level = nodeLevel;
      }
   }
}

function expandCollapse() {

}

function expandCollapseDoc() {

}

function isHidden(object) {
   return object.style.display == "hidden";
}

