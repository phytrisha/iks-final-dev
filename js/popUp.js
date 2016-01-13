function generatePopup (semester, x, y) {
	var program = semester.charAt(0) + semester.charAt(1);
	var semesterNum;
	if (program != "io") {
		semesterNum = semester.charAt(2);
	} else {
		semesterNum = semester.charAt(3);
	}
	var fullName;
	var shortName;
	switch(program) {
		case "kg":
			fullName = "Kommunikationsgestaltung";
			shortName = "KG";
			break;
		case "ig":
			fullName = "Interaktionsgestaltung";
			shortName = "IG";
			break;
		case "pg":
			fullName = "Produktgestaltung";
			shortName = "PG";
			break;
		case "io":
			fullName = "Internet der Dinge";
			shortName = "IoT";
			break;
		case "sg":
			fullName = "Strategische Gestaltung";
			shortName = "SG";
			break;
	}

	var xPos = parseInt(x);
	var xOverflow = 0;
	xPos-=150;

	if (xPos < 20) {
		xOverflow = xPos;
		xPos = 20;
	}

	var yPos = parseInt(y);
	var yOverflow = 0;
	yPos-=150;

	if (yPos < 20) {
		yOverflow = yPos;
		yPos = 20;
	}

	$(".popUpSpace").html("");
	$(".popUpSpace").append("<div class='popUp'></div>");
	$(".popUp").css("left", xPos + "px");
	$(".popUp").css("top", yPos + "px");
	$(".popUp").append("<div class='popUpTitle'></div>");
	$(".popUpTitle").append("<h1 class='popUpVertCenter " + program + "Color bold floatLeft'>"+ shortName +"</h1>");
	$(".popUpTitle").append("<h1 class='popUpVertCenter popUpFullTitle popUpUnderline'>" + fullName + " " + semesterNum + "</h1>");
	$(".popUp").append("<div class='popUpInfoButton'></div>");
	$(".popUpInfoButton").append("<div class='popUpIcon' id='infoIcon'></div>");
	$(".popUpInfoButton").append("<h1 class='popUpVertCenter popUpFullTitle popUpUnderline'>Informationen zu " + shortName + " " + semesterNum + "</h1>");
	$(".popUp").append("<div class='popUpRouteButton'></div>");
	$(".popUpRouteButton").append("<div class='popUpIcon' id='routeIcon'></div>");
	$(".popUpRouteButton").append("<h1 class='popUpVertCenter popUpFullTitle popUpUnderline'>Route anzeigen</h1>");
	$(".popUp").append("<div class='popUpLine'></div>");
	$(".popUpLine").css("left", 350 + xOverflow + "px");
	$(".popUpLine").css("height", 100 + yOverflow + "px");
}