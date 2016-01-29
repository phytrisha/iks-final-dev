var roomCount;
var roomArray = [];
var semesterArray = [];
var roomData = [];

function activateContent (active, deactive) {
	$("." + active + "Content").addClass("active");
	$("." + deactive + "Content").removeClass("active");
	$("#" + active + "Sidebar").addClass("active");
	$("#" + deactive + "Sidebar").removeClass("active");
}

function collapseSidebar () {
	activateCell();
	$(".contentView").removeClass("active");
}

function activateCell (cell) {
	$(".programCell").removeClass("active");
	$(".programCell > .programTitle").css("border-bottom-style", "solid");
	if (cell != undefined) {
		$(cell).addClass("active");
		var previous = $(cell).prev().attr("id");
		$("#" + cell.id + " > .programTitle").css("border-bottom-style", "none");
		$("#" + previous + " > .programTitle").css("border-bottom-style", "none");
	}
}

function getRoomData (data) {
	roomData = data;
}

function placeRooms (data) {
	roomCount = data.length;

	for (var i = 0; i < data.length; i++) {
		var building = data[i].building;
		var j = i + 1;
		var placeToFloor = parseInt(data[i].room.charAt(0)) + 1;
		if (building == iBuilding) {
			switch (building) {
				case "B":
					var placeToBuilding = ".trainstation";
					break;
				case "H":
					var placeToBuilding = ".rks";
					break;
			}
			console.log("put room to building: " + placeToBuilding);
			$(placeToBuilding + "#floor" + placeToFloor).append("<div class='room' id='room" + j + "'></div>");
			$("#room" + j).css("width", data[i].width);
			$("#room" + j).css("height", data[i].height);
			$("#room" + j).css("left", data[i].left);
			$("#room" + j).css("top", data[i].top);
			$("#room" + j).css("-webkit-transform", "rotate(" + data[i].rotation + "deg)");
			roomArray[i] = data[i].room;
			semesterArray[i] = data[i].semester;	
		}
		
	};
}

function giveContent (room, elem) {
	var roomId = "room" + room;
	var pos = getLocation(roomId);
	generatePopup(semesterArray[room-1], pos, room);
}

function fitToContainer(){
	//var canvas = document.getElementById("myCanvas");
	var width = parseInt($(".mapElement.active").css("width"));
	var height = parseInt($(".mapElement.active").css("height"));
	//canvas.width = width;
	//canvas.height = height;
}

$(document).ready(function() {
	//goToFloor();
	//loadMap(iFloor);

	activateContent("programs", "services");
	$("#servicesSidebar").click(function(){
		activateContent("services", "programs");
		collapseSidebar();
	});
	$("#programsSidebar").click(function(){
		activateContent("programs", "services");
	});

	$(".floorButton").click(function() {
		closePopUps();
		$(".floorButton").removeClass("active");
		$(this).addClass("active");
		setFloor(parseInt(this.id.charAt(6)));
		goToFloor();
		loadMap(iFloor);
	});

	$(".closeButton").click(function() {
		collapseSidebar();
	})
})
