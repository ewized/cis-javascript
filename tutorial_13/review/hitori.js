/*
   New Perspectives on HTML, CSS, and JavaScript
   Tutorial 13
   Review Assignment

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
      Changes the cell background from grey to circled to black and
      back to grey again. Checks the puzzle for a complete solution.

   peek()
      Temporarily displays incorrect cells with the numbers highlighted
      in a red font.

   unpeek()
      Returns the puzzle to its original state prior to peeking.

   showSolution()
      Removes all inline background color styles from the puzzle, showing
      the complete solution.

   checkSolution()
      Checks the current state of the puzzle, determining whether it 
      respreents a complete solution.

   drawHitori(numbers, blocks)
      Returns a text string of the HTML code to
      display a Hitori Web table based on the contents of
      multi-dimensional arrays: numbers and blocks.
	
*/


window.onload = init;

var selector = "#hitoriGrid td.blocks, #hitoriGrid td.circles";
var GREY = "rgb(200, 200, 200)";
var CIRCLE =  "url(./circle.png)";
var SQUARE = "rgb(0, 0, 0)";
var RED = "rgb(63, 21, 21)";

var puzzles = [
   {"rating": "hitori1Rating", "numbers": "hitori1Numbers", "puzzle": "hitori1Blocks"},
   {"rating": "hitori2Rating", "numbers": "hitori2Numbers", "puzzle": "hitori2Blocks"},
   {"rating": "hitori3Rating", "numbers": "hitori3Numbers", "puzzle": "hitori3Blocks"}
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

   document.getElementById("rating").innerHTML = eval(puzzles[index].rating);
   document.getElementById("puzzle").innerHTML = drawHitori(eval(puzzles[index].numbers), eval(puzzles[index].puzzle));

   setupPuzzle();
}

function setupPuzzle() {
   var BOXES = document.querySelectorAll(selector);

   for (i = 0 ; i < BOXES.length ; i++) {
      BOXES[i].style.background = GREY;
      BOXES[i].style.color = "#000";
      BOXES[i].onclick = changeBackground;
   }
}

function changeBackground() {
   if (this.style.background.substring(0, 4) == CIRCLE.substring(0, 4)) {
      this.style.background = SQUARE;
      this.style.color = "#fff";
   }
   else if (this.style.background == GREY) {
      this.style.background = CIRCLE;
      this.style.color = "#000";
   }
   else if (this.style.background == SQUARE) {
      this.style.background = GREY;
      this.style.color = "#000";
   }

   checkSolution();
}

function peak() {
   var BOXES = document.querySelectorAll(selector);

   for (i = 0 ; i < BOXES.length ; i++) {
      if (BOXES[i].style.background == "") break;
      if (BOXES[i].style.background == GREY) continue;

      if (BOXES[i].className == "circles" && BOXES[i].style.background.substring(0, 4) != CIRCLE.substring(0, 4)) {
         BOXES[i].style.color = "#fff";
         BOXES[i].style.background = RED;
      }

      else if (BOXES[i].className == "blocks" && BOXES[i].style.background != SQUARE) {
         BOXES[i].style.color = "#fff";
         BOXES[i].style.background = RED;
      }
   }

   setTimeout(unpeak, 1000);
}

function unpeak() {
   var BOXES = document.querySelectorAll(selector);

   for (i = 0 ; i < BOXES.length ; i++) {
      if (BOXES[i].style.background == RED) {
         BOXES[i].style.background = GREY;

         if (BOXES[i].className == "blocks") {
            BOXES[i].style.background = CIRCLE;
            BOXES[i].style.color = "#000";
         }
         else if (BOXES[i].className == "circles") {
            BOXES[i].style.background = SQUARE;
         }
      }
   }
}

function showSolution() {
   var BOXES = document.querySelectorAll(selector);

   for (i = 0 ; i < BOXES.length ; i++) {
      BOXES[i].style.background = "";

      if (BOXES[i].className == "blocks") {
         BOXES[i].style.color = "#fff";
      }
      else {
         BOXES[i].style.color = "#000";
      }
   }
}

function checkSolution() {
   var BOXES = document.querySelectorAll(selector);
   var marked = true;
   var empty = true;

   for (i = 0 ; i < BOXES.length ; i++) {
      if (BOXES[i].className == "blocks" && BOXES[i].style.background != SQUARE) {
         marked = false;
      }

      if (BOXES[i].className == "circles" && BOXES[i].style.background.substring(0, 4) != CIRCLE.substring(0, 4)) {
         empty = false;
      }
   }

   if (marked && empty) {
      showSolution();
      alert("You win!");
   }
}


function drawHitori(numbers, blocks) {

   /* Initial HTML String for the Hitori Puzzle */
   var htmlString = "";

   /* numbers is a multidimensional array containing the
      Hitori numbers; blocks is a corresponding 
      multidimensional array containing the location of the
      blocks which are indicated by the # character.
      Non-blocking cells are indicated by a blank character.
  */

   /* Create a Web table with the id, hitoriGrid, containing
      the numeric values. Blocks cells have the class name,
      blocks. Non-blocking cells have the class name, circles
  */

   var totalRows = numbers.length;
   var totalCols = numbers[0].length;
   htmlString = "<table id='hitoriGrid'>";
   

   for (var i = 0; i < totalRows; i++) {
      htmlString += "<tr>";

      for (var j = 0; j < totalCols; j++) {
         if (blocks[i][j] == "#") htmlString += "<td  class='blocks'>"
         else htmlString += "<td class='circles'>";

         htmlString += numbers[i][j];
         htmlString +="</td>";
      }

      htmlString += "</tr>";
   }

   htmlString += "</table>";

   return htmlString;
}
