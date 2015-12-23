var selector = [];

var titles = [];
var general = [];
var descriptions = [];
var rooms = [];
var images = [];

var directions = [];

var referenceRoom = [];
var originalFloor = 0;

function getInfo (data) {
	 for(var i = 0; i<data.length; i++) {
		  selector[i] = data[i].studiengang + data[i].semester;
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

$(".semesterButton").click(function() {
	for (var i = 0; i < selector.length; i++) {
		if (selector[i] == this.id) {
			var equalRoom = false;
			$(".content").html("");
			$(".content").append("<h1>" + this.id + "</h1>");
			$(".content").append("<h2>" + general[i] + "</h2>");
			$(".content").append("<div style='height:20px;'></div>");
			for (var j = 0; j < titles[i].length; j++) {
				$(".content").append("<h2><b>Kurs: " + titles[i][j] + "</b></h2>");
				$(".content").append("<h2>Raum: " + rooms[i][j] + "</h2>");
				$(".content").append("<h2>Beschreibung: " + descriptions[i][j] + "</h2>");
				if (images[i][j] != "") {
					$(".content").append("<img src='img/" + images[i][j] + "'>");
				}
				giveDirections(rooms[i][j]);
				$(".content").append("<div style='height:20px;'></div>");
			}
		}
	}
})