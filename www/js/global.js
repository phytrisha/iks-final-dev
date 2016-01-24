var iBuilding = "";
var iFloor = 0;

function setBuilding (building) {
	switch (building) {
		case "B":
			// do something
			iBuilding = "B";
			// display correct map etc
			break;
		case "H":
			// do something else
			iBuilding = "H";
			// display correct map etc
			break;
		default:
			// do another thing
	}
}

function setFloor (floor) {
	switch (floor) {
		case 1:
			iFloor = 1;
			// do something
			break;
		case 2:
			iFloor = 2;
			// do something
			break;
		case 3:
			iFloor = 3;
			// do something
			break;
		case 4:
			iFloor = 4;
			// do something
			break;
		default:
			// do something
	}
}