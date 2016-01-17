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

function createPath (points, color, line) {
	color = "#" + color;
	console.log("--- draw start");
	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	ctx.strokeStyle=color;
	ctx.beginPath();
	ctx.moveTo(points[0][0],points[0][1]);
	for (var i = 0; i < points.length; i++) {
		ctx.lineTo(points[i][0],points[i][1]);
	};
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


/*

function lerp(a, b, t) {
	var pos = [];
	pos[0] = a.startX + t * (b.startX - a.startX);
	pos[1] = a.startY + t * (b.startY - a.startY);
	return pos;
}

function interPoints (a, b, progress) {
	var current;
	current = lerp(a, b, progress);
	for (var i = 0; i < current.length; i++) {
		current[i] = parseInt(current[i]);
	};
	return current;
}

function inter (a, b) {
	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	var progress=0;
	setInterval(function() {
		if (progress<1) {
			progress+=0.05;
		} else {
			clearInterval(inter);
		}
		var currentInter = interPoints(a, b, progress);
		ctx.lineTo(currentInter[0], currentInter[1]); 
		ctx.stroke();
	}, 50);
}

function animatePath (path, color, line) {
	color = "#" + color;
	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	var Point = function (x, y) {
		this.startX = x;
		this.startY = y;
	};
	var points = [];
	for (var i = 0; i < path.length; i++) {
		points[i] = new Point(path[i][0], path[i][1]);
	};
	ctx.strokeStyle=color;
	ctx.lineWidth=line*scaleValue;
	ctx.moveTo(points[0].startX, points[0].startY);
	//console.log(points[0]);
	//var way = new Inter(points[0], points[1]);

	for (var i = 0; i < points.length; i++) {
		inter(points[i], points[i+1]);
	};


	/*setInterval(function() {
		console.log(way);
	}, 100);
}
	

/*
	ctx.strokeStyle=color;
	ctx.lineWidth=line*scaleValue;
	ctx.moveTo(points[0].startX, points[0].startY);
	var progress=0;

	var pointsX = [];
	var pointsY = [];
	for (var i = 0; i < points.length; i++) {
		pointsX.push(points[i][0]);
		pointsY.push(points[i][1]);
	};
	for (var i = 1; i <= path.length; i++) {
		var drawing = setInterval(function() {
			var currentX = lerp(pointsX[i-1], pointsX[i], progress);
			var currentY = lerp(pointsY[i-1], pointsY[i], progress);
			ctx.lineTo(currentX,currentY);
			ctx.stroke();
			progress+=0.1;
		}, 50);
		
		console.log(currentX);
		console.log(currentY);
	};
/*
	var progress = 0.5;
	var counter = 1,
	inter = setInterval(function() {
		var point = lerp(points[counter], points[counter++], progress);

		ctx.lineTo(point.startX, point.startY); 
		ctx.stroke();
		if (counter >= points.length) {
			clearInterval(inter);
		}
		console.log(counter);
	}, 500);
	ctx.stroke();
}

/*	var canva = document.getElementById('canva'),
        ctx = canva.getContext('2d');

    var Point = function (x, y) {
        this.startX = x;
        this.startY = y;
    };
    var points = [new Point(1, 2), 
                  new Point(10, 20), 
                  new Point(30, 30), 
                  new Point(40, 80), 
                  new Point(100, 100), 
                  new Point(120, 100)];

    //goto first point
    ctx.strokeStyle = "black";
    ctx.moveTo(points[0].startX, points[0].startY);

    var counter = 1,
    inter = setInterval(function() {
        //create interval, it will
        //iterate over pointes and when counter > length
        //will destroy itself
        var point = points[counter++];
        ctx.lineTo(point.startX, point.startY); 
        ctx.stroke();
        if (counter >= points.length) {
           clearInterval(inter);
        }
        console.log(counter);
    }, 500);
    ctx.stroke();*/