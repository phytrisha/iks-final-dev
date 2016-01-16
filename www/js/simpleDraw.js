function createLine (startX, startY, endX, endY, color, line) {
	color = "#" + color;
	console.log("--- draw start");
	console.log(scaleValue);
	console.log("startX / startY: " + startX + " / " + startY);
	console.log("endX / endY: " + endX + " / " + endY);
	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	ctx.strokeStyle=color;
	ctx.beginPath();
	ctx.moveTo(startX,startY);
	ctx.lineTo(endX,endY);
	ctx.lineWidth=line*scaleValue;
	ctx.stroke();
	console.log("--- draw end");
}

function createCircle (x, y, radius, color, line, fill) {
	color = "#" + color;
	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	ctx.beginPath();
	ctx.arc(x,y,radius*scaleValue,0,2*Math.PI);
	ctx.lineWidth=line*scaleValue;
	if (fill) {
		ctx.fillStyle=color;
		ctx.fill();
	} else {
		ctx.strokeStyle=color;
		ctx.stroke();
	}
}