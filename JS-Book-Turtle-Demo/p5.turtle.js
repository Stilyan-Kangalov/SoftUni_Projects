/** Example of turtle graphics for p5.js. 
	Copyright 2015 Yutaka Kachi released under the MIT license.
 */

var turtles_path = []; // array of Turtle objects
var pathPointer = 0;
var turtle;
var turtleSprite;
var tPlane; // graphic plane for pen layer
var started = false;
var button = 0;

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}


function setup() {
	var canvas = createCanvas(520, 430);
	noLoop();
	canvas.parent("p5Canvas");
	
	background(240);

	turtleSprite = createSprite(0, 0, 56, 64);
	turtleSprite.addAnimation("moving", "assets/images/turtle_1.png", "assets/images/turtle_4.png");
	turtleSprite.changeAnimation("moving");
	
	tPlane = createGraphics(width, height); // pen layer
	
	// Start turtle code - recode turtle moving. -------------------------------------
	// Set new instance of "Turtle" object and initial position
	turtle = new Turtle();
	
	// Set delay for the animation and line width/color
	turtle.x = getRndInteger(220, 250);
	turtle.y = getRndInteger(140, 180); // 270;
	turtle.step = 3;
	turtle.lineWidth = 6;
	
	// End of turtle code ------------------------------------------------------------

	// Set the buttons
	var buttonDraw = createButton("Draw");
	buttonDraw.mousePressed(start);
	var buttonReset = createButton("Reset");
	buttonReset.mousePressed(resetSketch);
	var buttonHide = createButton("Hide Turtle");
	buttonHide.mousePressed(hideTurtle);
	buttonHide.mousePressed(changeName);
	var buttonHexagon = createButton("Hexagon");
	buttonHexagon.mousePressed(drawHexagon);
	var buttonStar = createButton("Star");
	buttonStar.mousePressed(drawStar);
	var buttonSpiral = createButton("Spiral");
	buttonSpiral.mousePressed(drawSpiral);
	var buttonSun = createButton("Sun");
	buttonSun.mousePressed(drawSun);
	var buttonTriangle = createButton("Triangle");
	buttonTriangle.mousePressed(drawTriangle);
}

function resetSketch() {
	location.reload();
}

function hideTurtle() {
	if (!turtleSprite.removed) {
		turtleSprite.remove();
	} else {
		location.reload();
	}
}

function changeName() {
	this.html("Show Turtle");
}


function draw() {
	if(started){
		if (button === 1) {
			turtle.penColor = turtle.color.blue;
				for(var a = 0; a <= 4; a++) {
					// Draw a equilateral triangle
					turtle.penDown = true;
					turtle.left(30);
					turtle.forward(150);
					turtle.left(120);
					turtle.forward(150);
					turtle.left(120);
					turtle.forward(150);
				
					// Draw a line in the triangle
					turtle.left(-30);
					turtle.penDown = false;
					turtle.back(50);
					turtle.penDown = true;
					turtle.back(50);
					turtle.penDown = false;
					turtle.forward(100);
					turtle.penDown = true;
					turtle.left(30);
				}
			} else if (button === 2) {
				turtle.penColor = turtle.color.blue;
			for(var b = 0; b <= 6; b++) {
				turtle.penDown = true;
				turtle.left(60);
				turtle.forward(90);
			}
		} else if (button === 3) {
			turtle.penColor = "#008000";
			for(var c = 0; c <= 5; c++) {
				turtle.penDown = true;
				turtle.forward(200);
				turtle.left(144);
			}				
		} else if (button === 4) {
			turtle.penColor = "#008000";
			for(var d = 0; d <= 20; d++) {
				turtle.penDown = true;
				turtle.forward(d * 5);
				turtle.left(60);
			}
		} else if (button === 5) {
			turtle.penColor = turtle.color.blue;
			for(var e = 0; e <= 36; e++) {
				turtle.penDown = true;
				turtle.forward(200);
				turtle.left(170);
			}
		} else if (button === 6) {
			turtle.penColor = turtle.color.red;
			for(var f = 0; f < 20; f++) {
				turtle.penDown = true;
				turtle.left(120);
				turtle.forward(f * 10);
				
			}
		}
	

	background(240);
	turtle.draw2(pathPointer);
	image(tPlane);
	drawSprites();
	
	pathPointer += 1;
	if (pathPointer >= turtles_path.length) {
		pathPointer = 0;
		tPlane.fill(200);
		tPlane.noStroke();
		tPlane.rect(0, 0, width, height);
	}
	
}
	// Playback turtle moving for animation.
}

function start() {
	button = 1;
	started = true;
	loop();
 }

 function drawHexagon() {
	button = 2;
	started = true;
	loop();
}

function drawStar() {
	button = 3;
	started = true;
	loop();
}

function drawSpiral() {
	button = 4;
	started = true;
	loop();
}

function drawSun() {
	button = 5;
	started = true;
	loop();
}

function drawTriangle() {
	button = 6;
	started = true;
	loop();
}

/** Turtle Data */
function TBody() {
	this.x = 200;
	this.y = 60;
	this.step = 3;
	this.stepAngle = Math.PI / 36;
	this.angleInRadians = 0;
	this.penDown = false;
	this.penColor = "#000000";
	this.lineWidth = 2;
}

/** Turtle class */
function Turtle() {
	var body = new TBody();
	for (var prop in body) {
		this[prop] = body[prop];
	}
	
	this.color = {
		black : "#000000",
		gray: "#808080",
		lightgray: "#C0C0C0",
		red: "#ff0000",
		green: "#00ff00",
		blue: "#0000ff",
		yellow: "#ffff00",
		magenta: "#ff00ff",
		aqua: "#00ffff",
		white: "#ffffff"
	};

	this.forward = function(length) {
		var x0 = this.x;
		var y0 = this.y;
		var xx = sin(this.angleInRadians);
		var yy = cos(this.angleInRadians);
		var count = abs(int(length / this.step));
		var dir = 1;
		if(length < 0) {dir = -1;}
		
		for(var i=0; i < count - 1; i++) {
			this.x += dir * this.step * xx;
			this.y += dir * this.step * yy;
			this.copy();			
		}
		this.x = x0 + length * xx;
		this.y = y0 + length * yy;
		this.copy();

	};
	
	this.back = function(length) {
		this.forward(-length);
	};
	
	this.left = function(angleInDegrees) {
		var angle0 = this.angleInRadians;
		var targetAngle = angleInDegrees * Math.PI / 180.0;
		var count = abs(int(targetAngle / this.stepAngle));
		var dir = 1;
		if(targetAngle < 0) {dir = -1;}
		
		for(var i=0; i < count - 1; i++) {
			this.angleInRadians += dir * this.stepAngle;
			this.copy();
		}
		this.angleInRadians = angle0 + targetAngle;
		this.copy();
	};
	
	this.right = function(angleInDegrees) {
		this.left(-angleInDegrees);
	};

	// copy TBody object
	this.copy = function() {
		turtles_path.push(new TBody());
		var target = turtles_path[turtles_path.length - 1];
		for (var prop in this) {
			target[prop] = this[prop];
		}
	};
	
	// drawing turtle in loop
	this.draw2 = function(pointer) {
		var target = turtles_path[pointer];
		
		// draw path by Pen
		if (target.penDown) {
			tPlane.strokeWeight(target.lineWidth);
			tPlane.stroke(target.penColor);
			var nextPointer = pointer + 1;
			if(nextPointer >= turtles_path.length) {
				nextPointer = 0;
			}
			tPlane.line(target.x, target.y, turtles_path[nextPointer].x, turtles_path[nextPointer].y);
		}
		
		// draw turtle by sprite		
		turtleSprite.rotation = target.angleInRadians * -180 / Math.PI + 180;
		turtleSprite.position.x = target.x;
		turtleSprite.position.y = target.y;		
	};
}