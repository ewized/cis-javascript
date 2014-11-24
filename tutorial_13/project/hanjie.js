/*
   New Perspectives on HTML, CSS, and JavaScript
   Tutorial 13
   Tutorial Case

   Author: Joshua Rodriguez
   Date:   11 / 23 / 2014

   Function List
   =============

   init()
      Run when the Web page is loaded; displays puzzle 1
      and loads the event handlers for the Web page buttons.

   swapPuzzle()
      Swaps one puzzle for another based on the button being clicked
      by the user. Confirms the change before swapping in the
      new puzzle.

   setupPuzzle()
      Sets up a new puzzle, adding the onclick event handlers for
      every puzzle cell.

   changeBackground()
      Changes the cell background from gold to gray to white and
      back to gold again. Checks the puzzle for a complete solution.

   peek()
      Temporarily displays incorrect cells. In correct white cell are
      displayed in pink; incorrect gray cells are displayed in red.

   unpeek()
      Returns the puzzle to its original state prior to peeking.

   showSolution()
      Removes all inline background color styles from the puzzle, showing
      the complete solution.

   checkSolution()
      Checks the current state of the puzzle, determining whether it 
      respreents a complete solution.

   drawGrid(puzzle)
      Returns a text string of the HTML code to
      display a hanjie Web table based on the contents of
      multi-dimensional array, puzzle.
	
*/

window.onload = function() {
   init()
};


var YELLOW = "rgb(255, 255, 85)";
var BLUE =  "rgb(0, 170, 170)";
var GREEN = "rgb(85, 255, 85)";
var RED = "rgb(63, 21, 21)";
var PINK = "rgb(63, 21, 53)";

var puzzles = [
   {"name": "puzzle1Hint", "rating": "puzzle1Rating", "puzzle": "puzzle1"},
   {"name": "puzzle2Hint", "rating": "puzzle2Rating", "puzzle": "puzzle2"},
   {"name": "puzzle3Hint", "rating": "puzzle3Rating", "puzzle": "puzzle3"}
];

function init() {
   document.getElementById("peek").onclick = peak;
   document.getElementById("solve").onclick = showSolution;
   var elements = document.getElementsByClassName("puzzles");

   for (i = 0 ; i < elements.length ; i++) {
      elements[i].name = i;
      elements[i].onclick = function() {
         swapPuzzle(this.name);
      };
   }

   swapPuzzle(0);
}

function swapPuzzle(index) {
   //var index = this.name;

   document.getElementById("hint").innerHTML = eval(puzzles[index].name);
   document.getElementById("rating").innerHTML = eval(puzzles[index].rating);
   document.getElementById("puzzle").innerHTML = drawGrid(eval(puzzles[index].puzzle));

   setupPuzzle();
}

function setupPuzzle() {
   var BOXES = document.querySelectorAll("#hanjieGrid td.marked, #hanjieGrid td.empty");

   for (i = 0 ; i < BOXES.length ; i++) {
      BOXES[i].style.backgroundColor = YELLOW;
      BOXES[i].onclick = changeBackground;
   }
}

function changeBackground() {
  switch (this.style.backgroundColor) {
     case YELLOW:
        this.style.backgroundColor = BLUE;
        break;
     case BLUE:
        this.style.backgroundColor = GREEN;
        break;
     case GREEN:
        this.style.backgroundColor = YELLOW;
        break;
  }

   checkSolution();
}

function peak() {
   var BOXES = document.querySelectorAll("#hanjieGrid td.marked, #hanjieGrid td.empty");

   for (i = 0 ; i < BOXES.length ; i++) {
      if (BOXES[i].style.backgroundColor == "") break;
      if (BOXES[i].style.backgroundColor == YELLOW) continue;

      if (BOXES[i].className == "marked" && BOXES[i].style.backgroundColor != BLUE) {
         BOXES[i].style.backgroundColor = RED;
      }

      if (BOXES[i].className == "empty" && BOXES[i].style.backgroundColor != GREEN) {
         BOXES[i].style.backgroundColor = PINK;
      }
   }

   setTimeout(unpeak, 1000);
}

function unpeak() {
   var BOXES = document.querySelectorAll("#hanjieGrid td.marked, #hanjieGrid td.empty");

   for (i = 0 ; i < BOXES.length ; i++) {
      if (BOXES[i].style.backgroundColor == RED) {
         BOXES[i].style.backgroundColor = GREEN;
      }

      if (BOXES[i].style.backgroundColor == PINK) {
         BOXES[i].style.backgroundColor = BLUE;
      }
   }
}

function showSolution() {
   var BOXES = document.querySelectorAll("#hanjieGrid td.marked, #hanjieGrid td.empty");

   for (i = 0 ; i < BOXES.length ; i++) {
      BOXES[i].style.backgroundColor = "";
   }
}

function checkSolution() {
   var BOXES = document.querySelectorAll("#hanjieGrid td.marked, #hanjieGrid td.empty");
   var marked = true;
   var empty = true;

   for (i = 0 ; i < BOXES.length ; i++) {
      if (BOXES[i].className == "marked" && BOXES[i].style.backgroundColor != BLUE) {
         marked = false;
      }

      if (BOXES[i].className == "empty" && BOXES[i].style.backgroundColor != GREEN) {
         empty = false;
      }
   }

   if (marked && empty) {
      showSolution();
      alert("You win!");
   }
}

function drawGrid(puzzle) {

   /* Initial HTML String for the Hanjie Puzzle */
   var htmlString = "";

   /* puzzle is a multidimensional array containing the
      Hanjie puzzle layout. Marked cells are indicated by
      the # character. Empty cells are indicated by an
      empty text string. First, determine the number of rows
      and columns in the puzzle */

   var totalRows = puzzle.length;
   var totalCols = puzzle[0].length;

   /* Loop through the rows to create the rowCount array
      containing the totals for each row in the puzzle */

   var rowCount = [];
   for (var i = 0; i < totalRows; i++) {
      rowCount[i]="";
      spaceCount = 0;

      for (var j = 0; j < totalCols; j++) {
         if (puzzle[i][j] == "#") {
            spaceCount++;
            if (j == totalCols-1) rowCount[i] += spaceCount + "&nbsp;&nbsp;";
         } else {
            if (spaceCount > 0) {
               rowCount[i] += spaceCount + "&nbsp;&nbsp;";
               spaceCount = 0;
            } 
         }    
      }

   }

   /* Loop through the columns to create the colCount array
      containing the totals for each column in the puzzle */

   var colCount = [];
   for (var j = 0; j < totalCols; j++) {
      colCount[j]="";
      spaceCount = 0;

      for (var i = 0; i < totalRows; i++) {
         if (puzzle[i][j] == "#") {
            spaceCount++;
            if (i == totalRows-1) colCount[j] += spaceCount + "<br />";
         } else {
            if (spaceCount > 0) {
               colCount[j] += spaceCount + "<br />";
               spaceCount = 0;
            } 
         }    
      }

   }

   /* Create a Web table with the id, hanjieGrid, containing
      headers with the row and column totals.
      Each marked cell has the class name, marked; each
      empty cell has the class name, empty */

   htmlString = "<table id='hanjieGrid'><tr><th></th>";

   for (var j = 0; j < totalCols; j++) {
      htmlString += "<th class='cols'>" + colCount[j] + "</th>";
   }
   htmlString += "</tr>";

   for (var i = 0; i < totalRows; i++) {
      htmlString += "<tr><th class='rows'>" + rowCount[i]+"</th>";

      for (var j = 0; j<totalCols; j++) {
         if (puzzle[i][j] == "#") htmlString += "<td  class='marked'></td>"
         else htmlString += "<td class='empty'></td>";
      }

      htmlString += "</tr>";
   }

   htmlString += "</table>";

   return htmlString;
}
