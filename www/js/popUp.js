var scaleValue=1;

function getCurrentMapScale (scale) {
	scaleValue += (scale-1);
	console.log(scaleValue);
}

function giveRoomDimensions (input) {
	var dimensions = [];
	dimensions[0] = parseInt($("#room" + input).css("width")) / 2;
	dimensions[1] = parseInt($("#room" + input).css("height"));
	dimensions[2] = parseInt($("#room" + input).css("left"));
	dimensions[3] = parseInt($("#room" + input).css("top"));
	return dimensions;
}

function closePopUps () {
	$(".room").html("");
}

function generatePopup (semester, pos, num) {
	closePopUps();

	var offset = getMapOffset();

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

	var roomOffset = giveRoomDimensions(num);
	//console.log("room height: " + roomOffset[1]);
	//var lineHeight = 30 + (roomOffset[1] / 2);

	var roomLeft = roomOffset[2];
	var roomTop = roomOffset[3];

	var popUpLeft = -350 + roomOffset[0];
	var popUpTop = -419;

	var mapLeft = parseInt($(".mapElement").css("left"));
	var mapTop = 0;
	var mapCalcTop = parseInt($(".mapElement").css("top"));

	var resultingLeft;

	resultingLeft = popUpLeft;

	var leftOffset = 0;
	var rightOffset = 0;
	var topOffset = 0;
	var lineHeight = 40 + (roomOffset[1] / 2);
	if ((roomLeft+roomOffset[0] - 350) - (784 - mapLeft) < 40 )  {
		leftOffset = (((roomLeft+roomOffset[0] - 350) - (784 - mapLeft)) * (-1) + 40);
		resultingLeft+=leftOffset;
	}

	if ((roomLeft+roomOffset[0] + 350) - (666 - mapLeft) > 1224 )  {
		rightOffset = (roomLeft+roomOffset[0] + 350) - (666 - mapLeft) - 1224;
		resultingLeft-=rightOffset;
	}

	if (((mapCalcTop + roomTop) + popUpTop) < 40) {
		topOffset = ((mapCalcTop + roomTop) + popUpTop) * (-1) + 40;
		lineHeight-=topOffset;
		popUpTop += topOffset;
	}

	var resultingLeftLine = (350 + (leftOffset*(-1)) + rightOffset).clamp(40, 660);
	$("#room" + num).append("<div class='popUp'></div>");
	$(".popUp").css("left", resultingLeft + "px");
	$(".popUp").css("top", popUpTop + "px");
	//$(".popUp").css("z-index", 1000);
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
	$(".popUpLine").css("left", resultingLeftLine + "px");
	$(".popUpLine").css("height", lineHeight + "px");
}























