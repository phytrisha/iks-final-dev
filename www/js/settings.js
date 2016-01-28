$(document).ready(function() {
	$(".settingsButton").click(function() {
		$(".settingsButton").css("background-color", "#ffffff");
		$(this).css("background-color", "rgba(0,0,0,0.05)");
		setBuilding(this.id);
		populateFloors(floorCount);
	})
	$(".saveSettings").click(function() {
		goToFloor();
		loadMap(iFloor);
		$(".viewContainer").css("display", "initial");
		$(".settingsContainer").html("");
	})
})

function populateFloors (count) {
	$(".floorSelector").html("");
	for (var i = 1; i <= count; i++) {
		$(".floorSelector").append("<div class='floorSettingsButton' id='setFloor" + i + "'><h1 class='settingsTypo'>" + (i-1) + "</h1></div>");
		$(".floorSettingsButton").click(function() {
			$(".floorSettingsButton").css("background-color", "#ffffff");
			$(this).css("background-color", "rgba(0,0,0,0.05)");
			var setFloorTo = this.id.charAt(8);
			setFloor(setFloorTo);
		})
	};
	
}