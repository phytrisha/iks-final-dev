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
	//var currentFloor = originalFloor;
	for (var i = 0; i < referenceRoom.length; i++) {
		if (room == referenceRoom[i]) {
			$(".content").append("<h2>Directions: </h2>");
			var targetFloor = parseInt(referenceRoom[i].charAt(0));
			while (targetFloor != iFloor) {
				if (targetFloor > iFloor) {
					$(".content").append("<h2>go up</h2>");
					iFloor++;
				} else if (targetFloor < iFloor) {
					$(".content").append("<h2>go down</h2>");
					iFloor--;
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
	var course = content.charAt(0) + content.charAt(1);
	if (course == "sg") {
		max = 4;
	} else if (course == "io") {
		max = 2;
	}
	for (var i = 0; i < max; i++) {
		if (i==0) {
			$(".semesterSelector").append("<div class='semesterClick' id='" + course + i + "'><h1 class='horiCenter bold'>i</h1></div>");
		} else if (i!=5) {
			$(".semesterSelector").append("<div class='semesterClick' id='" + course + i + "'><h1 class='horiCenter bold'>" + i + "</h1></div>");
		}
	}
	$("#" + content).addClass("active");
	$(".contentView").addClass("active");
	var selectorMargin = window.screen.width - (max/2) * parseInt($(".semesterClick").css("height"));
	$(".semesterSelector").css("margin-top", selectorMargin + "px");
	addClicks();
	addContent(content);
}

function addContent (id) {
	//console.log(id);
	for (var i = 0; i < selector.length; i++) {
		if (selector[i] == id) {
			var equalRoom = false;
			var type = id.charAt(0) + id.charAt(1);
			var fullName;
			if (type != "io") {
				type = type.toUpperCase();
			} else {
				type = "IoT"
			}
			switch(type) {
				case "IG":
					fullName="Interaktionsgestaltung";
					break;
				case "KG":
					fullName="Kommunikationsgestaltung";
					break;
				case "PG":
					fullName="Produktgestaltung";
					break;
				case "IoT":
					fullName="Internet der Dinge";
					break;
				case "SG":
					fullName="Strategische Gestaltung";
					break;
			}
			if (targetSemester[i] == "0") {
				targetSemester[i] = "";
			}
			$("#currentLabel").html("<h1 class='" + type.toLowerCase() + "Color bold horiCenter'>" + type + "</h1>");
			$("#currentProgram").html("<h1>" + fullName + " " + targetSemester[i] + "</h1>");

			$(".semesterContent").html("");
			if (general[i] != undefined) {
				$(".semesterContent").addClass("unspecific");
				$(".semesterContent").append("<p>" + general[i] + "</p>");
			}
			if (titles[i] != undefined) {
				var sameRooms = true;
				for (var j = 0; j < rooms[i].length; j++) {
					for (var k = 0; k < rooms[i].length; k++) {
						if (rooms[i][j] != rooms[i][k]) {
							sameRooms = false;
						}
					};
				};
				if (sameRooms) {
					$(".semesterContent").removeClass("unspecific");
					$(".semesterContent").append("<div class='sidebarRouteButton'></div>");
					$(".sidebarRouteButton").append("<div class='sidebarRouteIcon' id='routeIcon'></div>");
					$(".sidebarRouteButton").append("<p class='sidebarRouteLabel'>Route zu Raum " + rooms[i][0] + " anzeigen</p>");
				} else {
					$(".semesterContent").addClass("unspecific");
				}
				for (var j = 0; j < titles[i].length; j++) {
					$(".semesterContent").append("<h2>Kurs: " + titles[i][j] + "</h2>");					
					if (images[i][j] != "") {
						$(".semesterContent").append("<img src='img/" + images[i][j] + "'>");
					}
					if (sameRooms == false) {
						$(".semesterContent").append("<div class='sidebarRouteButton unspecific' id='sidebarRouteTo"+ j +"'></div>");
						$("#sidebarRouteTo" + j).append("<div class='sidebarRouteIcon' id='routeIcon'></div>");
						$("#sidebarRouteTo" + j).append("<p class='sidebarRouteLabel'>Route zu Raum " + rooms[i][j] + " anzeigen</p>");						
					}
					$(".semesterContent").append("<p>Beschreibung: " + descriptions[i][j] + "</p>");
					$(".semesterContent").append("<div style='height:60px;'></div>");
				}
			}
		}
	}
}

function addClicks () {
	$(".semesterClick").click(function() {
		console.log("clicked id: " + this.id);
		addContent(this.id);
		$(".semesterClick").removeClass("active");
		$("#" + this.id).addClass("active");
	})
}