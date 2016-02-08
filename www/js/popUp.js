function giveRoomDimensions (input) {
	var dimensions = [];
	dimensions[0] = parseInt($("#room" + input).css("width"));
	dimensions[1] = parseInt($("#room" + input).css("height"));
	dimensions[2] = parseInt($("#room" + input).css("left"));
	dimensions[3] = parseInt($("#room" + input).css("top"));
	return dimensions;
}

function closePopUps () {
	$(".popUp").remove();
	$(".room > .roomLabel").css("opacity", 1.0);
}

function generatePopup (semester, pos, num) {
	closePopUps();
	$("#room" + num + " > .roomLabel").css("opacity", 0.0);

	var program = [];
	var semesterNum = [];
	var offset = getMapOffset();
	
	for (var i = 0; i < semester.length; i++) {
		program[i] = semester[i].charAt(0) + semester[i].charAt(1);
	};

	var semesterNum;
	if (program != "io") {
		for (var i = 0; i < semester.length; i++) {
			semesterNum[i] = semester[i].charAt(2);
		};
	} else {
		for (var i = 0; i < semester.length; i++) {
			semesterNum[i] = semester[i].charAt(3);
		};
	}
	console.log(semesterNum);
	var fullName;
	var shortName;

	switch(program[0]) {
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

	var roomOffset = $(".room#room" + num).offset();
	var roomDimensions = giveRoomDimensions(num);

	var roomCenterX = Math.round(roomOffset.left + roomDimensions[0] / 2);
	var roomCenterY = Math.round(roomOffset.top + roomDimensions[1] / 2);

	var resultingLeft = roomCenterX - 350;
	var resultingTop = roomCenterY - 340 - 130 * program.length;

	var lineHeight = 100;
	var lineLeft = 350;

	if (resultingTop < 40) {
		var topOverset = resultingTop-40;
		lineHeight = 100 + topOverset;
		console.log("top overset: " + topOverset);
		resultingTop = 40;
	}
	console.log(resultingLeft);
	if (resultingLeft < 824) {
		var leftOverset = resultingLeft - 824;
		lineLeft = 350 + leftOverset;
		resultingLeft = 824;
	} else if (resultingLeft > 1292) {
		var rightOverset = resultingLeft - 1292;
		lineLeft = 350 + rightOverset;
		resultingLeft = 1292;
	}

	$(".mapView").append("<div class='popUp'></div>");

	//console.log(roomDataH[num-1].rotation);
	$(".popUp").css("left", resultingLeft + "px");
	$(".popUp").css("top", resultingTop + "px");
	$(".popUp").css("height", 259 + 130 * program.length + "px");
	$(".popUp").append("<div class='popUpTitle'></div>");
	$(".popUpTitle").append("<h1 class='popUpVertCenter " + program[0] + "Color bold floatLeft'>"+ shortName +"</h1>");
	var semesterNumString = [];
	for (var i = 0; i < semesterNum.length; i++) {
		if ( i > 0 ) {
			semesterNumString += "/";
		}
		semesterNumString += semesterNum[i];
	};
	$(".popUpTitle").append("<h1 class='popUpVertCenter popUpFullTitle popUpUnderline'>" + fullName + " " + semesterNumString + "</h1>");
	
	console.log(semester);
	for (var i = 0; i < semester.length; i++) {
		$(".popUp").append("<div class='popUpInfoButton' id='info" + semester[i] + "'></div>");
		$(".popUpInfoButton#info" + semester[i]).css("margin-top", 126 * (i+1) + "px");
		$(".popUpInfoButton#info" + semester[i]).append("<div class='popUpIcon' id='infoIcon'></div>");
		$(".popUpInfoButton#info" + semester[i]).append("<h1 class='popUpVertCenter popUpFullTitle popUpUnderline'>Informationen zu " + shortName + " " + semesterNum[i] + "</h1>");
	};
	
	$(".popUp").append("<div class='popUpRouteButton'></div>");

	$(".popUpRouteButton").css("margin-top", 126 + 126 * $(".popUpInfoButton").length + "px");
	$(".popUpRouteButton").append("<div class='popUpIcon' id='routeIcon'></div>");
	$(".popUpRouteButton").append("<h1 class='popUpVertCenter popUpFullTitle'>Route anzeigen</h1>");
	$(".popUp").append("<div class='popUpLine'></div>");
	$(".popUpLine").css("left", lineLeft + "px");
	$(".popUpLine").css("height", lineHeight + "px");
	/*if (iBuilding == "H") {
		if (roomDataH[num-1].rotation != "0") {
			$(".popUp").css("-webkit-transform-origin", "350px " + (379 + lineHeight) + "px");
			$(".popUp").css("-webkit-transform", "rotate(" + (parseInt(roomDataH[num-1].rotation) * -1) + "deg)")
		}
	}*/
	for (var i = 0; i < semester.length; i++) {
		addPopUpClicks(semester[i]);
	};
}
