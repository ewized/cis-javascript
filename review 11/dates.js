/*
   New Perspectives on HTML, CSS, and JavaScript
   Tutorial 11
   Review Assignment

   Author: Joshua Rodriguez
   Date:   10 / 27 / 2014

   Function List:
   showDateTime(time)
      Returns the date in a text string formatted as:
      mm/dd/yyyy at hh:mm:ss am

   changeYear(today, holiday)
      Changes the year value of the holiday object to point to the
      next year if it has already occurred in the present year

   countdown(stop, start)
      Displays the time between the stop and start date objects in the
      text format:
      dd days, hh hrs, mm mins, ss secs
*/

window.onload = function () {
   showCountDown();
   setInterval("showCountDown()", 1000);
};

function showCountDown() {
   var today = new Date();
   document.eventform.thisDay.value = showDateTime(today);
   var hd = new Date(2014, 0, 14, 10);
   changeYear(today, hd);
   document.eventform.count1.value = countdown(hd, today);
   var sdr = new Date(2014, 4, 21, 12);
   changeYear(today, sdr);
   document.eventform.count2.value = countdown(sdr, today);
   var jf = new Date(2014, 6, 4, 21);
   changeYear(today, jf);
   document.eventform.count3.value = countdown(jf, today);
   var summer = new Date(2014, 8, 1, 12);
   changeYear(today, summer);
   document.eventform.count4.value = countdown(summer, today);
   
   var hp = new Date(2014, 11, 1, 11, 30);
   changeYear(today, hp);
   document.eventform.count5.value = countdown(hp, today);
   var nyBash = new Date(2014, 11, 31, 15, 30);
   changeYear(today, nyBash);
   document.eventform.count6.value = countdown(nyBash, today);
}

function  changeYear(today, holiday)  {
  var thisYear = today.getFullYear();
  holiday.setFullYear(thisYear);
  if (today > holiday) {
   holiday.setFullYear(thisYear + 1);
  }
}

function countdown(stop, start) {
  var time = stop - start;
  var days = time/(1000 * 60 * 60 * 24);
  var hrs = (days - Math.floor(days)) * 24;
  var mins = (hrs - Math.floor(hrs)) * 60;
  var secs = (mins - Math.floor(mins)) * 60;
  return Math.floor(days) + " days " + Math.floor(hrs) + " hours " + Math.floor(mins) + " mins " + Math.floor(secs) + " secs";
}

function showDateTime(time) {
   date = time.getDate();
   month = time.getMonth()+1;
   year = time.getFullYear();

   second = time.getSeconds();
   minute = time.getMinutes();
   hour = time.getHours();

   ampm = (hour < 12) ? " a.m." : " p.m.";
   hour = (hour > 12) ? hour - 12 : hour;
   hour = (hour == 0) ? 12 : hour;

   minute = minute < 10 ? "0"+minute : minute;
   second = second < 10 ? "0"+second : second;

   return month+"/"+date +"/"+year+" at "+hour+":"+minute+":"+second+ampm;
}