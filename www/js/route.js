function defineCurrentLocation () {
	var current = [];
	current[0] = parseInt($(".currentLocation").css("left"));
	current[1] = parseInt($(".currentLocation").css("top"));
	return current;
}

function giveRoute (pos, target) {
	var roomPosition = getCenter("room" + target);
	while (pos[0] != roomPosition[0]) {
		createCircle(pos[0], pos[1], 10, "ff0000", 4, true);
		createLine(pos[0], pos[1], roomPosition[0], roomPosition[1], "ff0000", 2);
		pos[0] = roomPosition[0];
	}
}

















