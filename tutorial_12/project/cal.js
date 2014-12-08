/*
   New Perspectives on HTML, CSS, and JavaScript
   Tutorial 12
   Tutorial Case

   Author: Joshua Rodriguez
   Date:   Dec 8 2014

   Function List:
   calendar(calendarDay)
      Creates the calendar table for the month specified in the
      calendarDay parameter. The current date is highlighted in 
      the table.

   writeCalTitle(calendarDay)
      Writes the title row in the calendar table

   writeDayTitle()
      Writes the weekday title rows in the calendar table

   daysInMonth(calendarDay)
      Returns the number of days in the month from calendarDay

   writeCalDays(calendarDay)
      Writes the daily rows in the calendar table, highlighting
      calendarDay
	
*/

function calendar() {
   var calDate = new Date("July 6, 2015");
   document.write("<table id='calendar_table'>");

   writeCalTitle(calDate);

   writeDayTitle();

   writeCalDays(calDate);

   document.write("</table>");
}

function writeCalTitle(calendarDay) {
   var monthName = ["January", "February", "March", "April", "May",
      "June", "July", "August", "September", "October", "November", "December"];

   var thisMonth=calendarDay.getMonth();

   document.write("<tr>");
   document.write("<th id='calendar_head' colspan='7'>");
   document.write(monthName[thisMonth]);
   document.write("</th>");
   document.write("</tr>");
}

function writeDayTitle() {
   var dayName = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
   document.write("<tr>");
   for (var i=0;i<dayName.length;i++) {
      document.write("<th class='calendar_weekdays'>"+dayName[i]+"</th>");
   }
   document.write("</tr>");
}

function daysInMonth(calendarDay) {
   var thisYear = calendarDay.getFullYear();
   var thisMonth = calendarDay.getMonth();
   var dayCount = [31,28,31,30,31,30,31,31,30,31,30,31];
   if ((thisYear % 4 == 0)&&((thisYear % 100 !=0) || (thisYear % 400 == 0))) {
      dayCount[1] = 29;
   }
   return dayCount[thisMonth];
}

function writeCalDays(calendarDay) {
   var weekDay = calendarDay.getDay();

   document.write("<tr>");
   for (var i=0; i < weekDay; i++) {
      document.write("<td></td>");
   }

   var totalDays = daysInMonth(calendarDay);
   for (var dayCount=1; dayCount<=totalDays; dayCount++) {

      calendarDay.setDate(dayCount);
      weekDay = calendarDay.getDay();


      if (weekDay == 0) document.write("<tr>");
      if (calendarDay.getTime() == new Date().getTime()) {
         document.write("<td class='calendar_dates' id='calendar_today'>"+dayCount+dayEvent[dayCount]+"</td>");
      } else {
         document.write("<td class='calendar_dates'>"+dayCount+dayEvent[dayCount]+"</td>");
      }
      if (weekDay == 6) document.write("</tr>");   }

   document.write("</tr>");
}