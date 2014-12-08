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
   var itemId = 0;

   for (var n = source.firstChild ; n != null ; n = n.nextSibling) {
      var nodeLevel = headings.indexOf(n.nodeName.toLowerCase());
      // alert(nodeLevel + " " + n.nodeName);

      if (nodeLevel != -1) {
         itemId++;

         var node = document.createElement("li");
         if (n.id == "") {
            n.id = "heading" + itemId;
         }

         node.id = "TOC" + n.id;

         var link = document.createElement("a");
         link.innerHTML = n.innerHTML;
         link.href = "#" + n.id;
         //link.name = itemId;

         node.appendChild(link);

         // Create a child list
         if (nodeLevel == level) {
            list.appendChild(node);
         }
         // Start new child tab list
         else if (nodeLevel > level) {
            var box = document.createElement("span");
            box.innerHTML = "-";
            box.onclick = expandCollapse;
            list.lastChild.insertBefore(box, list.lastChild.lastChild);


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
   var open = this.innerHTML == "-";
   this.innerHTML = open ? "+" : "-";
   this.parentNode.lastChild.style.display = open ? "none" : null;

   expandCollapseDoc();
}

function expandCollapseDoc() {
   var display = "";
   var source = document.getElementById("doc");
   var selector = ["h1", "h2", "h3", "h4", "h5", "h6"];

   for (var i = source.firstChild ; i != null ; i = i.nextSibling) {
      if (selector.indexOf(i.nodeName.toLowerCase()) != -1) {
         var entry = document.getElementById("TOC" + i.id);

         display = isHidden(entry) ? "none" : "";
      }

      if (i.nodeType == 1) {
         i.style.display = display;
      }
   }
}

function isHidden(object) {
   for (var n = object ; n.nodeName != "BODY" ; n = n.parentNode) {

      if (n.style.display == "none") {
         return true;
      }
   }

   return false;
}

