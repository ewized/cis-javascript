/*
   New Perspectives on HTML, CSS, and JavaScript
   Tutorial 12
   Review Assignment

   Author: Joshua Rodriguez
   Date:   Dec 8 2014

   Function List:
   yearly(calendarDay)
      Creates the yearly calendar, highlighting the date 
      specified in the calendarDay parameter.

   writeMonthCell(calendarDay, currentTime)
      Writes the yearly table cell containing a monthly
      calendar.

   writeMonth(calendarDay, currentTime)
      Creates the calendar table for the month specified in the
      calendarDay parameter. The currentTime parameter stores the
      time value of the current date.

   writeMonthTitle(calendarDay)
      Writes the month name in the monthly table

   writeDayNames()
      Writes the weekday title rows in the calendar table

   daysInMonth(calendarDay)
      Returns the number of days in the month from calendarDay

   writeMonthDays(calendarDay, currentTime)
      Writes the daily rows in the monthly table, highlighting
      the date specified in the currentTime parameter.

   writeDay(weekDay, dayCount, calendarDay, currentTime)
      Write the opening and close table row tags and the table
      cell tag for an individual day in the calendar.

*/

var Cal = function(date) {
   day = date == null ? new Date() : date;
   leapYear = (day.getFullYear() % 4 == 0) && (day.getFullYear() % 100 != 0) || (day.getFullYear() % 400 == 0);
   DAYS = [31, (leapYear ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
   MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   WEEKS = ["S", "M", "T", "W", "T", "F", "S"];
};

Cal.prototype.printTable = function() {
   day.setDate(1);
   var first = true, count = 0;


   document.write("<table class='monthly_table'>");
   document.write("<tbody>");


   // Header Month and Year
   document.write("<tr class='monthly_title'>");
   document.write("<th colspan='7'><a href='" + MONTHS[day.getMonth()] + ".htm'>" + MONTHS[day.getMonth()] + "</a></th>");
   document.write("</tr>");

   // Header Week Names
   document.write("<tr>");
   WEEKS.forEach(function(v) {
      document.write("<th class='monthly_weekdays'>" + v + "</th>");
   });
   document.write("</tr>");

   // Calender Table
   for (var i = 1 - day.getDay(); i <= 42 ; i++) {
      count++;

      if (first) {
         document.write("<tr>");
         first = !first;
      }

      document.write(day.getMonth() == new Date().getMonth() && i == (new Date()).getDate() ? "<td class='monthly_dates' id='today'>": "<td class='monthly_dates'>");
      document.write(i < 1 || i > DAYS[day.getMonth()] ? "&nbsp;" : i);
      document.write("</td>");

      if (count % 7 == 0) {
         document.write("</tr>");
         first = !first;
      }

      // Break the loop if no need to print more dates
      if (i >= DAYS[day.getMonth()] && count % 7 == 0 && count > 40 ) {
         break;
      }
   }

   document.write("</tbody>");
   document.write("</table>");
};

Cal.printCal = function() {
   document.write("<table id='yearly_table'>");

   var header = "<thead>";
   header += "<th colspan='4' id='yearly_title'>"+new Date().getFullYear()+"</th>";
   header += "</thead><tbody>";

   document.write(header);
   var first = true;

   for (var i = 1; i < 13; i++) {
      if (first) {
         document.write("<tr>");
         first = !first;
      }
      document.write("<td>");
      var date = new Date();
      date.setMonth(i-1);
      //document.write(date);
      new Cal(date).printTable();
      document.write("</td>");

      if (i % 4 == 0) {
         document.write("</tr>");
         first = !first;
      }

   }

   document.write("</tbody></table>");
};





