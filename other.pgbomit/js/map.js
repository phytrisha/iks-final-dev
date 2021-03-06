var myElementScale = 1.0;
var resultScale = myElementScale;
var scaling = false;

var resultX;
var resultY;

var startX;
var startY;

var scaleMax=2.0;
var scaleMin=0.5;

var finalScale = 1.0;

var xPercent;
var yPercent;

Number.prototype.map = function (in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

function scale (elem, scaleValue) {
	$(elem).css("-webkit-transform", "scale(" + scaleValue + ")");
	finalScale = scaleValue;
}

function appendTransform (elem, x, y) {
	resultX = startX + x;
	resultY = startY + y;
	$(elem).css("left", resultX + "px");
	$(elem).css("top", resultY + "px");
}

function getBounding (elem) {
	var leftMin = parseInt($(elem).css("left"));
	var topMin = parseInt($(elem).css("top"));
	var values = [];
	values[0] = leftMin;
	values[1] = topMin;
	values[2] = leftMin + parseInt($(elem).css("width"));
	values[3] = topMin + parseInt($(elem).css("height"));
	return values;
}

function bakeTransform (elem, scaleValue) {
	var oldWidth = parseInt($(elem).css("width"));
	var newWidth = oldWidth * scaleValue;

	var oldLeft = parseInt($(elem).css("left"));
	var newLeft = (oldLeft - ((newWidth - oldWidth) * (xPercent/100)));

	var oldHeight = parseInt($(elem).css("height"));
	var newHeight = oldHeight * scaleValue;

	var oldTop = parseInt($(elem).css("top"));
	var newTop = (oldTop - ((newHeight - oldHeight) * (yPercent/100)));

	// apply stuff and clear webkit-transform
	$(elem).css("left", newLeft + "px");
	$(elem).css("top", newTop + "px");
	$(elem).css("width", newWidth + "px");
	$(elem).css("height", newHeight + "px");

	$("#mapElement").css("-webkit-transform", "scale(1.0)");
}

function readyFn () {
	var mapElement = document.getElementById('mapElement');

	var mapManager = new Hammer.Manager(mapElement);

	var pinch = new Hammer.Pinch();
	var pan = new Hammer.Pan();
	var tap = new Hammer.Tap();

	mapManager.add([tap, pinch, pan]);

	mapManager.on("tap panstart", function() {
		collapseSidebar();
	})

	mapManager.on("panstart", function() {
		startX = parseInt($("#mapElement").css("left"));
		startY = parseInt($("#mapElement").css("top"));
	})

	mapManager.on("panmove", function(ev) {
		appendTransform("#mapElement", ev.deltaX, ev.deltaY);
	})

	mapManager.on("pinchstart", function(ev) {
		var values = getBounding("#mapElement");
		var xCenter = ev.center.x;
		xCenter = xCenter.map(values[0], values[2], 0, 100);
		xCenter = xCenter.clamp(0,100);
		var yCenter = ev.center.y;
		yCenter = yCenter.map(values[1], values[3], 0, 100);
		yCenter = yCenter.clamp(0,100);

		xPercent = xCenter;
		yPercent = yCenter;

		$("#mapElement").css("-webkit-transform-origin", xCenter + "%" + yCenter + "%");
		scaling = true;

	})

	mapManager.on("pinchin pinchout", function(ev) {
		if (scaling) {
			resultScale = ev.scale;
			resultScale = Math.min(Math.max(parseFloat(resultScale), scaleMin), scaleMax);
			scale("#mapElement", resultScale);
		}
	})

	mapManager.on("pinchend", function() {
		getCurrentMapScale(finalScale);
		bakeTransform("#mapElement", finalScale);
		scaling = false;
	})
}

function getMapOffset () {
	var offset = [];
	offset[0] = parseInt($("#mapElement").css("left")) - 900;
	offset[1] = parseInt($("#mapElement").css("top")) - 250;
	return offset;
}

function getLocation (room) {
	var position = [];
	position[0] = $("#" + room).css("left");
	position[1] = $("#" + room).css("top");
	return position;
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

$(document).ready(readyFn);
$(document).ready(scale("#mapElement", myElementScale));































