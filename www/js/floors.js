function goToFloor () {
	console.log(iBuilding);
	if (iBuilding == "B") {
		for (var i = 1; i <= 4; i++) {
			var floorPosition = -i * 1316 + 658 + 1316 * iFloor;
			$("#floor" + i).animate({
				top:floorPosition
			}, 600)
		};
	} else if (iBuilding == "H") {
		for (var i = 1; i <= 4; i++) {
			var floorPosition = -i * 2632 + 289 + 2632 * iFloor;
			$("#floor" + i).animate({
				top:floorPosition
			}, 600)
		};
	}
}