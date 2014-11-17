/* author: Joshua Rodriguez */

/** When the window loads call clock then set the interval */
window.onload = function () {
    clock();
    setInterval('clock()', 1000);
};


function showDate(dateObject) {
        thisDate = dateObject.getDate();
        thisMonth = dateObject.getMonth()+1;
        thisYear = dateObject.getFullYear();
        return thisMonth + "/" + thisDate + "/" + thisYear;
} 

function showTime(dateObject) { 
        thisSecond = dateObject.getSeconds();
        thisMinute = dateObject.getMinutes();
        thisHour = dateObject.getHours();

        var ap;
        if (thisHour >= 12) {
            ap = "p.m."
            thisHour = thisHour - 12;

            if (thisHour == 0) {
                thisHour = 12;
            }

        }
        else {
            ap = "a.m.";
        }



        return thisHour + ":" + (thisMinute < 10 ? "0" + thisMinute : thisMinute) + ":" + (thisSecond < 10 ? "0" + thisSecond : thisSecond) + " " + ap; 
}

function showDays() {
    var today = new Date();
    var newYear = new Date(2000, 0, 1);
    var year = today.getFullYear() + 1;
    newYear.setFullYear(year);  
    
    var time = newYear - today;
    var days = time / (1000 * 60 * 60 * 24);
    
    return days;
}

function clock() {
    var d = new Date();
    document.clockform.dateNow.value = showDate(d);
    document.clockform.timeNow.value = showTime(d);

    var days = showDays();
    document.clockform.daysLeft.value = Math.floor(days) + "  Days";

    var hrs = (days - Math.floor(days)) * 24;
    document.clockform.hrsLeft.value = Math.floor(hrs) + "  Hours";

    var min = (hrs - Math.floor(hrs)) * 60;
    document.clockform.minsLeft.value = Math.floor(min) + "  Minutes";

    var sec = (min - Math.floor(min)) * 60;
    document.clockform.secsLeft.value = Math.floor(sec) + "  Seconds";
}
