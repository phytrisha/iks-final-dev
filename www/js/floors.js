function goToFloor () {
	for (var i = 1; i <= 4; i++) {
		var floorPosition = -i * 1316 + 658 + 1316 * iFloor;
		$("#floor" + i).animate({
			top:floorPosition
		}, 600)
	};
}