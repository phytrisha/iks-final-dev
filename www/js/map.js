var resultScale = [1.0, 1.0, 1.0, 1.0];
var scaling = false;

var resultX;
var resultY;

var startX;
var startY;

var xPercent;
var yPercent;

var endScale;

Number.prototype.map = function (in_min, in_max, out_min, out_max) {
	return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

Number.prototype.clamp = function(min, max) {
	return Math.min(Math.max(this, min), max);
};

function scale (elem, scaleValue) {
	$(elem).css("-webkit-transform", "scale(" + scaleValue + ")");
}

function appendTransform (elem, x, y) {
	resultX = startX + x;
	resultY = startY + y;
	$(elem).css("left", resultX + "px");
	$(elem).css("top", resultY + "px");
}

function setBounding (elem) {
	// get dimensions of loaded image,
	// multiply them with current scale
	// and scale resulting div to those
	// dimensions
}

function getBounding (elem) {
	var values = [];
	values[0] = parseInt($(elem).css("left"));
	values[1] = parseInt($(elem).css("top"));
	values[2] = parseInt($(elem).css("left")) + parseInt($(elem).css("width"));
	values[3] = parseInt($(elem).css("top")) + parseInt($(elem).css("height"));
	return values;
}

function bakeTransform (elem, scaleValue) {
	//console.log(resultScale);
	// reset scaling
	$(elem).css("-webkit-transform", "scale(1.0)");

	// calculate new dimensions after scaling
	var newWidth = parseInt($(elem).css("width")) * scaleValue;
	var newLeft = parseInt($(elem).css("left")) - ((newWidth - parseInt($(elem).css("width"))) * (xPercent/100));
	var newHeight = parseInt($(elem).css("height")) * scaleValue;
	var newTop = parseInt($(elem).css("top")) - ((newHeight - parseInt($(elem).css("height"))) * (yPercent/100));

	// apply dimensions and clear webkit-transform
	$(elem).css("left", newLeft + "px");
	$(elem).css("top", newTop + "px");
	$(elem).css("width", newWidth + "px");
	$(elem).css("height", newHeight + "px");
}

function loadMap (floor) {
	var mapName = "floor" + floor;
	console.log("iPad Floor is: " + floor);
	var mapElement = document.getElementById(mapName);

	var mapManager = new Hammer.Manager(mapElement);

	var pinch = new Hammer.Pinch();
	var pan = new Hammer.Pan();
	var tap = new Hammer.Tap();

	var lastScale;

	mapManager.add([tap, pinch, pan]);

	mapManager.on("panstart", function() {
		closePopUps();
		collapseSidebar();
		startX = parseInt($("#floor" + floor).css("left"));
		startY = parseInt($("#floor" + floor).css("top"));
		
	})

	mapManager.on("panmove", function(ev) {
		appendTransform("#floor" + floor, ev.deltaX, ev.deltaY);
		var mapDim = getBounding($("#floor" + floor));
		if (mapDim[2] > 1928) {
			$(".floorButtons").addClass("bg");
		} else {
			$(".floorButtons").removeClass("bg");
		}
	})

	mapManager.on("pinchstart", function(ev) {
		lastScale = resultScale[floor-1];
		closePopUps();
		var values = getBounding("#floor" + floor);
		var xCenter = ev.center.x;
		xCenter = xCenter.map(values[0], values[2], 0, 100);
		xCenter = xCenter.clamp(0,100);
		var yCenter = ev.center.y;
		yCenter = yCenter.map(values[1], values[3], 0, 100);
		yCenter = yCenter.clamp(0,100);

		xPercent = xCenter;
		yPercent = yCenter;

		$("#floor" + floor).css("-webkit-transform-origin", xCenter + "%" + yCenter + "%");
		scaling = true;
	})

	mapManager.on("pinchin pinchout", function(ev) {
		if (scaling) {
			endScale = ev.scale;

			scale("#floor" + floor, ev.scale);
			var mapDim = getBounding($("#floor" + floor));
			var borderValue = (mapDim[2]/2)*resultScale[floor-1]+mapDim[2]/2;
			if (borderValue > 1928) {
				$(".floorButtons").addClass("bg");
			} else {
				$(".floorButtons").removeClass("bg");
			}
			var currentFontSize = Math.round( ((ev.scale * -5 + 1) + 35) * 10) / 10;
			$(".room > .roomLabel").css("font-size", currentFontSize + "px");
			if (lastScale * endScale < 1) {
				$(".room > .roomLabel").css("opacity", 0);
				$(".room > .roundLabel").css("opacity", 1);
			} else {
				$(".room > .roomLabel").css("opacity", 1);
				$(".room > .roundLabel").css("opacity", 0);
			}
		}
	})

	mapManager.on("pinchend pinchcancel", function() {
		resultScale[iFloor-1] = lastScale * endScale;
		bakeTransform("#floor" + iFloor, endScale);
		var currentLocation = defineCurrentLocation();
		scaling = false;
		$(".room > .roomLabel").css("font-size", "35px");
	})
}

function getMapOffset () {
	var offset = [];
	offset[0] = parseInt($("#floor" + iFloor).css("left")) - 900;
	offset[1] = parseInt($("#floor" + iFloor).css("top")) - 250;
	return offset;
}

function getLocation (room) {
	var position = [];
	position[0] = $("#" + room).css("left");
	position[1] = $("#" + room).css("top");
	return position;
}

function getCenter (room) {
	var center = [];
	center[0] = parseInt(parseInt($("#" + room).css("left")) + parseInt($("#" + room).css("width")) / 2);
	center[1] = parseInt(parseInt($("#" + room).css("top")) + parseInt($("#" + room).css("height")) / 2);
	return center;
}

function applyToRooms (room) {
	var roomElement = document.getElementById('room' + room);
	var roomManager = new Hammer.Manager(roomElement);
	var tap = new Hammer.Tap();
	roomManager.add(tap);
	roomManager.on("tap", function() {
		giveContent(room, roomElement);
	})
}

function addPopUpClicks (type) {
	var elem = document.getElementById('info' + type);
	var course = type.charAt(0) + type.charAt(1);
	var clickManager = new Hammer.Manager(elem);
	var tap = new Hammer.Tap();
	clickManager.add(tap);
	clickManager.on("tap", function() {
		displayContent(type);
 	})
}






