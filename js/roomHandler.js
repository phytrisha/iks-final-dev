function roomHandler (count) {
	for (var i = 1; i <= count; i++) {
		$("#mapElement").append("<div class='room' id='room" + i + "'></div>");
	};
}