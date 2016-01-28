var iBuilding = "";
var iFloor = 1;
var floorCount;

function setBuilding (building) {
	console.log("set building to " + building);
	switch (building) {
		case "B":
			// do something
			iBuilding = "B";
			floorCount = 4;
			// display correct map etc
			break;
		case "H":
			// do something else
			iBuilding = "H";
			floorCount = 3;
			// display correct map etc
			break;
		default:
			// do another thing
	}
}

function setFloor (floor) {
	console.log("set floor to " + floor);
	iFloor = floor;
}
