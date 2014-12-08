/*
   New Perspectives on HTML, CSS, and JavaScript
   Tutorial 12
   Case Problem 1

   Author: Joshua Rodriguez
   Date:   Dec 8 2014

   Filename: tables.js

   Function List:

   showTable()
      Shows a table of contributors to the Lighthouse

   showSummary()
      Shows a table summarizing the contributions made to the Lighthouse

*/
window.onload = function() {
   showTable();
   showSummary();
};

function showTable() {
   var table = "<table id='contributors'>";
   table += "<thead>";
   table += "<tr>";
   table += "<th>Date</th>";
   table += "<th>Amount</th>";
   table += "<th>First Name</th>";
   table += "<th>Last Name</th>";
   table += "<th>Address</th>";
   table += "</tr>";
   table += "</thead>";
   table += "<tbody>";

   for (var i = 0 ; i < firstName.length ; i++) {
      table += "<tr>";
      table += "<td>" + date[i] + "</td>";
      table += "<td>" + amount[i] + "</td>";
      table += "<td>" + firstName[i] + "</td>";
      table += "<td>" + lastName[i] + "</td>";
      table += "<td>" + street[i] + " " + city[i] + ", " + state[i] + " " + zip[i] + "</td>";
      table += "</tr>";
   }

   table += "</tbody>";
   table += "</table>";

   document.getElementById("data_list").innerHTML = table;

}

function showSummary() {
   var amountTotal = 0;
   for (var i = 0 ; i < firstName.length ; i++) {
      amountTotal += amount[i];
   }

   var table = "<table id='sumTable'>";
   table += "<tr>";
   table += "<th id='sumTitle' colspan='2'>Summary</th>";
   table += "</tr>";
   table += "<tr>";
   table += "<th>Contributors</th>";
   table += "<td>" + firstName.length + "</td>";
   table += "</tr>";
   table += "<tr>";
   table += "<th>Amount</th>";
   table += "<td>$" + amountTotal + "</td>";
   table += "</tr>";
   table += "</table>";

   document.getElementById("totals").innerHTML = table;
}