var roomCount = 0;
var roomArray = [];
var semesterArray = [];
var roomDataB = [];
var roomDataH = [];

Array.prototype.clean = function(deleteValue) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == deleteValue) {         
			this.splice(i, 1);
			i--;
		}
	}
	return this;
};

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
	for (var i = 0; i < data.length; i++) {
		if (data[i].building == "B") {
			roomDataB[i] = data[i];
		} else if (data[i].building == "H") {
			roomDataH[i] = data[i]
		}
	};
	roomDataH.clean(undefined);
	roomDataB.clean(undefined);
}

function placeRooms (data) {
	//roomCount = data.length;

	for (var i = 0; i < data.length; i++) {
		var building = data[i].building;
		var j = i + 1;
		var placeToFloor = parseInt(data[i].room.charAt(0)) + 1;
		if (building == iBuilding) {
			roomCount++;
			switch (building) {
				case "B":
					var placeToBuilding = ".trainstation";
					break;
				case "H":
					var placeToBuilding = ".rks";
					break;
			}
			$(placeToBuilding + "#floor" + placeToFloor).append("<div class='room' id='room" + j + "'></div>");
			$("#room" + j).css("width", data[i].width);
			$("#room" + j).css("height", data[i].height);
			$("#room" + j).css("left", data[i].left);
			$("#room" + j).css("top", data[i].top);
			$("#room" + j).css("-webkit-transform", "rotate(" + data[i].rotation + "deg)");
			var roomLabelContent = data[i].semester;
			var labelColor = roomLabelContent[0].charAt(0) + roomLabelContent[0].charAt(1) + "Color";
			$("#room" + j).html("<h1 class='roomLabel bold " + labelColor + "'>" + roomLabelContent + "</h1>");
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
	var width = parseInt($(".mapElement.active").css("width"));
	var height = parseInt($(".mapElement.active").css("height"));
}

$(document).ready(function() {
	activateContent("programs", "services");
	$("#servicesSidebar").click(function(){
		activateContent("services", "programs");
		collapseSidebar();
	});
	$("#programsSidebar").click(function(){
		activateContent("programs", "services");
	});

	$(".closeButton").click(function() {
		collapseSidebar();
	})
})
