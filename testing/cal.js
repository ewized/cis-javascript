var Cal = function(date) {
	day = date == null ? new Date() : date;
	leapYear = (day.getFullYear() % 4 == 0) && (day.getFullYear() % 100 != 0) || (day.getFullYear() % 400 == 0);
	DAYS = [31, (leapYear ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	WEEKS = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fry", "Sat"];
};

Cal.prototype.printTable = function() {
	day.setDate(1);
	var first = true, count = 0;


	document.write("<tbody>");
	document.write("<table>");

	// Header Month and Year
	document.write("<tr>");
	document.write("<th colspan='7'>" + MONTHS[day.getMonth()] + " " + day.getFullYear() + "</th>");
	document.write("</tr>");

	// Header Week Names
	document.write("<tr>");
	WEEKS.forEach(function(v) {
		document.write("<th>" + v + "</th>");
	});
	document.write("</tr>");

	// Calender Table
	for (var i = 1 - day.getDay(); i <= 42 ; i++) {
		count++;

		if (first) {
			document.write("<tr>");
			first = !first;
		}

		document.write(day.getMonth() == new Date().getMonth() && i == (new Date()).getDate() ? "<td class='today'>": "<td class='day'>");
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
	document.write("<div class='cal'>");

	for (var i = 1; i < 13; i++) {
		document.write("<div class='month'>");
		var date = new Date();
		date.setMonth(i-1);
		//document.write(date);
		new Cal(date).printTable();
		document.write("</div>");

		if (i % 4 == 0) {
			document.write("<br clear='both'>");
		}

	};

	document.write("</div>");
};