/*
   New Perspectives on HTML and CSS
   Additional Case Problems
   Case Problem 2
   Filename: tday.js

   Notes:
   The showDate function displays the date in the format: "Weekday, Month Day, Year"
   The calcThanksgiving() function returns the calendar for Thanksgiving of a given year
   The daysToThanksgiving() function returns the number of days until the next Thanksgiving

*/

function showDate() {
   thisDate = new Date();
   var thisWDay=thisDate.getDay();
   var thisDay=thisDate.getDate();
   var thisMonth=thisDate.getMonth();
   var thisYear=thisDate.getFullYear();
   var mName = new Array("January", "February", "March", "April", "May", 
       "June", "July", "August", "September", "October","November", "December");
   var wdName = new Array("Sunday", "Monday", "Tuesday", "Wednesday",
       "Thursday", "Friday", "Saturday");
   return wdName[thisWDay]+", "+mName[thisMonth]+" "+thisDay+", "+thisYear;
}


function calcThanksgiving(year) {
   var delta = year - 1900;
   var tday = delta % 12;
   tday = (tday + Math.floor(tday/4) + Math.floor(delta/12)) % 7;
   return (tday == 0)? 28 : (29 - tday);
}

function daysToThanksgiving() {
   var thisDate = new Date();
   var year = thisDate.getFullYear();
   var tday = calcThanksgiving(year);
   var tdate = new Date("November "+tday+", "+year);
   if (thisDate > tdate) {
      year++;
      tday = calcThanksgiving(year);
      tdate = new Date("November "+tday+", "+year);
   }

   return Math.ceil((tdate-thisDate)/(1000*60*60*24));
}
