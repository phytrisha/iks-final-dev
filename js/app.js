var roomCount;

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

function placeRooms (data) {
	roomCount = data.length;
	for (var i = 0; i < data.length; i++) {
		var j = i + 1;
		$("#mapElement").append("<div class='room' id='room" + j + "'></div>");
		$("#room" + j).css("width", data[i].width);
		$("#room" + j).css("height", data[i].height);
		$("#room" + j).css("left", data[i].left);
		$("#room" + j).css("top", data[i].top);
		$("#room" + j).css("-webkit-transform", "rotate(" + data[i].rotation + "deg)")
	};
}

window.onload = function() {
	activateContent("programs", "services");
	$("#servicesSidebar").click(function(){
		activateContent("services", "programs");
		collapseSidebar();
	});
	$("#programsSidebar").click(function(){
		activateContent("programs", "services");
	});

	for (var i = 1; i <= roomCount; i++) {
		applyToRooms(i);
	};
}

