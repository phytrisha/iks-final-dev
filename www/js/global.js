var iBuilding = "";
var iFloor = 1;
var floorCount;

function setBuilding (building) {
	console.log("set building to " + building);
	switch (building) {
		case "B":
			iBuilding = "B";
			floorCount = 4;
			for (var i = 0; i < floorCount; i++) {
				$(".mapView").append("<div class='mapElement trainstation' id='floor"+ (i+1) + "'></div>");
			};
			$(".mapView").append("<div class='floorSwitcher'><div class='floorButtons'></div></div>");
			for (var i = floorCount; i > 0; i--) {
				$(".floorButtons").append("<div class='floorButton' id='switch"+ i + "'><h1>OG " + (i-1) + "</h1></div>");
			};
			break;
		case "H":
			iBuilding = "H";
			floorCount = 3;
			for (var i = 0; i < floorCount; i++) {
				$(".mapView").append("<div class='mapElement rks' id='floor"+ (i+1) + "'></div>");
			};
			$(".mapView").append("<div class='floorSwitcher'><div class='floorButtons'></div></div>");
			for (var i = floorCount; i > 0; i--) {
				$(".floorButtons").append("<div class='floorButton' id='switch"+ i + "'><h1>OG " + (i-1) + "</h1></div>");
			};
			break;
		default:
			// do another thing
	}
	$(".floorButton").click(function() {
		closePopUps();
		$(".floorButton").removeClass("active");
		setFloor(parseInt(this.id.charAt(6)));
		goToFloor();
		loadMap(iFloor);
	});
	$(".closeButton").click(function() {
		collapseSidebar();
	})
}

function setFloor (floor) {
	console.log("set floor to " + floor);
	iFloor = floor;
	$("#switch" + iFloor).addClass("active");
}
