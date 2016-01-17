function defineCurrentLocation () {
	var current = [];
	current[0] = parseInt($(".currentLocation").css("left"));
	current[1] = parseInt($(".currentLocation").css("top"));
	return current;
}

function giveRoute (pos, target) {
	var roomPosition = getCenter("room" + target);
	var hallCount = $(".routeHall").length;
	var hallY = [];
	var hallXleft = [];
	var hallXright = [];
	var anchors = [];

	var startLocation = [];

	for (var i = 0; i < pos.length; i++) {
		startLocation[i] = pos[i];
	};

	createCircle(pos[0], pos[1], 10, "ff0000", null, true);	

	for (var i = 1; i < hallCount+1; i++) {
		hallY[i] = parseInt($("#hall" + i).css("top"));
		hallXleft[i] = parseInt($("#hall" + i).css("left"));
		hallXright[i] = hallXleft[i] + parseInt($("#hall" + i).css("width"));
	};

	while (pos[0] != roomPosition[0] && pos[1] != [roomPosition[1]]) {
		var goUp;
		var goDown;
		var goLeft;

		var endX;
		var endY;

		// GOING UP
		for (var i = 1; i < hallCount+1; i++) {
			if(pos[0] > hallXleft[i] && pos[0] < hallXright[i]) {
				endY = hallY[i];
			}
		};

		if (pos[1] > roomPosition[1]) {
			goUp=true;
		} else if (pos[1] < roomPosition[1]) {
			goDown=true;
		}

		while (goUp == true) {
			pos[1]--;
			if (pos[1] <= endY) {
				goUp=false;
			}
		}
/*
		while (goDown == true) {
			pos[1]++;
			if (pos[1] >= endY) {
				goUp=false;
			}
		}
*/

		// GOING LEFT
		for (var i = 1; i < hallCount; i++) {
			console.log("pos1: " + pos[1]);
			console.log("hallY" + i + ": " + hallY[i]);
			if (pos[1] == hallY[i]) {
				endX = roomPosition[0];
				console.log("endX: " + endX);
				console.log("youre on hallway " + i);
				console.log(getCenter("room" + target));
			}
		};

		if (pos[0] > roomPosition[0]) {
			console.log("too far right!");
			goLeft=true;
		}

		console.log("pos: " + pos);
/*
		while (goLeft == true) {
			pos[0]--;
			console.log(pos[0]);
			if (pos[0] <= endX) {
				goLeft=false;
			}
		}
*/
		anchors.push(startLocation);
		var tempArray = [];
		anchors.push(tempArray.concat(startLocation[0], endY));
		tempArray = [];
		anchors.push(tempArray.concat(endX, endY));
		tempArray = [];
		anchors.push(tempArray.concat(roomPosition[0], roomPosition[1]));


		createPath(anchors, "ff0000", 2);
		pos[0] = roomPosition[0];
		pos[1] = roomPosition[1];
	}
}

















