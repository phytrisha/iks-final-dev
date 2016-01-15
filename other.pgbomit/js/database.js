var selector = [];

var titles = [];
var general = [];
var descriptions = [];
var rooms = [];
var images = [];
var targetSemester = [];

var directions = [];

var referenceRoom = [];
var originalFloor = 0;

function getInfo (data) {
	 for(var i = 0; i<data.length; i++) {
		  selector[i] = data[i].studiengang + data[i].semester;
		  targetSemester[i] = data[i].semester;
		  general[i] = data[i].allgemein;
		  titles[i] = data[i].kurse;
		  descriptions[i] = data[i].kursBeschreibung;
		  rooms[i] = data[i].kursRaum;
		  images[i] = data[i].kursBild;
	 }
}

function getDirections (data) {
	for (var i = 0; i < data.length; i++) {
		directions[i] = data[i].directions;
		referenceRoom[i] = data[i].roomName;
	}
}

function giveDirections (room) {
	var currentFloor = originalFloor;
	for (var i = 0; i < referenceRoom.length; i++) {
		if (room == referenceRoom[i]) {
			$(".content").append("<h2>Directions: </h2>");
			var targetFloor = parseInt(referenceRoom[i].charAt(0));
			while (targetFloor != currentFloor) {
				if (targetFloor > currentFloor) {
					$(".content").append("<h2>go up</h2>");
					currentFloor++;
				} else if (targetFloor < currentFloor) {
					$(".content").append("<h2>go down</h2>");
					currentFloor--;
				}
			}
			for (var j = 0; j < directions[j].length; j++) {
				switch(directions[i][j]) {
					case "left":
						$(".content").append("<h2>go left</h2>");
						break;
					case "right":
						$(".content").append("<h2>go right</h2>");
						break;
				}
			}
		}
	}
}

$(".programCell").click(function() {
	activateCell(this);
	displayContent(this.id);
})

function displayContent (content) {
	$(".semesterSelector").html("");
	var max = 8;
	if (content == "sg") {
		max = 4;
	} else if (content == "iot") {
		max = 2;
	}
	for (var i = 0; i < max; i++) {
		if (i==0) {
			$(".semesterSelector").append("<div class='semesterClick' id='" + content + i + "'><h1 class='horiCenter bold'>i</h1></div>");
		} else if (i!=5) {
			$(".semesterSelector").append("<div class='semesterClick' id='" + content + i + "'><h1 class='horiCenter bold'>" + i + "</h1></div>");
		}
	}
	$(".contentView").addClass("active");
	var selectorMargin = window.screen.width - (max/2) * parseInt($(".semesterClick").css("height"));
	$(".semesterSelector").css("margin-top", selectorMargin + "px");
	addClicks();
	addContent(content + "0");
}

function addContent (id) {
	for (var i = 0; i < selector.length; i++) {
		if (selector[i] == id) {
			var equalRoom = false;
			var type = id.charAt(0) + id.charAt(1);
			var fullName;
			switch(type) {
				case "ig":
					fullName="Interaktionsgestaltung";
					break;
				case "kg":
					fullName="Kommunikationsgestaltung";
					break;
				case "pg":
					fullName="Produktgestaltung";
					break;
				case "io":
					fullName="Internet der Dinge";
					break;
				case "sg":
					fullName="Strategische Gestaltung";
					break;
			}
			if (targetSemester[i] == "0") {
				targetSemester[i] = "";
			}
			$("#currentLabel").html("<h1 class='" + type + "Color bold horiCenter'>" + type.toUpperCase() + "</h1>");
			$("#currentProgram").html("<h1 class='bold'>" + fullName + " " + targetSemester[i] + "</h1>");

			$(".semesterContent").html("");
			$(".semesterContent").append("<p>" + general[i] + "</p>");
			$(".semesterContent").append("<div style='height:60px;'></div>");
			if (titles[i].length != undefined) {
				for (var j = 0; j < titles[i].length; j++) {
					$(".semesterContent").append("<h2>Kurs: " + titles[i][j] + "</h2>");
					$(".semesterContent").append("<p>Raum: " + rooms[i][j] + "</p>");
					$(".semesterContent").append("<p>Beschreibung: " + descriptions[i][j] + "</p>");
					if (images[i][j] != "") {
						$(".semesterContent").append("<img src='img/" + images[i][j] + "'>");
					}
					//giveDirections(rooms[i][j]);
					$(".semesterContent").append("<div style='height:60px;'></div>");
				}
			}
		}
	}
}

function addClicks () {
	$(".semesterClick").click(function() {
		addContent(this.id);
		$(".semesterClick").removeClass("active");
		$(this).addClass("active");
	})
}