let drawing = [];
let components = 0;
let prevComp = -1;
let alreadyUndo = false, alreadyRedo = false;
let alreadyAddedNewComponent = false;
let penSize, globalColor, bgColor;
let undoItem = [];

function changeColor(color) {
	drawing.pop();
	drawing.push([color, penSize.value()]);
}

function changeSize() {
	lastDraw = drawing.pop();
	drawing.push([lastDraw[0], this.value()]);
}

function setup() {
	penSize = createSlider(1, 10, 2, 1);
	penSize.input(changeSize);

	createCanvas(windowWidth, windowHeight*7);

	cursor(CROSS);

	globalColor = color(255, 255, 255);
	bgColor = color(40);
}

function draw() {
	background(bgColor);
	if (keyIsDown(65)) {
		drawing[components - 1].push(createVector(mouseX, mouseY));
		prevComp = components;
	}
	else if (!keyIsDown(65) && prevComp == components) {
		alreadyAddedNewComponent = false;
	}
	else if (keyIsDown(67)) {
		drawing = [];
		alreadyAddedNewComponent = false;
		components = 0;
		prevComp = -1;
	}
	else if (keyIsDown(85) && !alreadyUndo && drawing.length > 1) {
		drawing.pop();
		drawing.pop();
		components -= 2;
		prevComp = components;
		alreadyUndo = true;
	}
	else if (!keyIsDown(85) && alreadyUndo) {
		alreadyUndo = false;
	}
	else if (keyIsDown(90)) {
		let target = createVector(mouseX, mouseY);
		for(let i = 0; i < drawing.length; i++) {
			let delTrgt = false;
			for(let j = 2; j < drawing[i].length; j++) {
				let x_diff = abs(drawing[i][j].x - target.x);
				let y_diff = abs(drawing[i][j].y - target.y);
				if(x_diff < 10 && y_diff < 10)
					delTrgt = true;
			}

			if(delTrgt) {
				drawing.splice(i, 1);
				components -= 1;
			}
		}
	}
	else if(keyIsDown(82)) {
		globalColor = color(255, 0, 0);
		changeColor(globalColor);
	}
	else if(keyIsDown(87)) {
		globalColor = color(255, 255, 255);
		changeColor(globalColor);
	}
	else if(keyIsDown(66)) {
		globalColor = color(0, 100, 240);
		changeColor(globalColor);
	}
	else if(keyIsDown(71)) {
		globalColor = color(0, 240, 0);
		changeColor(globalColor);
	}
	else if(keyIsDown(89)) {
		globalColor = color(240, 240, 0);
		changeColor(globalColor);
	}
	else if(keyIsDown(79)) {
		globalColor = color(240, 150, 0);
		changeColor(globalColor);
	}
	else if(keyIsDown(80)) {
		globalColor = color(180, 0, 228);
		changeColor(globalColor);
	}

	if (!alreadyAddedNewComponent) {
		drawing.push([globalColor, penSize.value()]);
		components += 1;
		alreadyAddedNewComponent = true;
	}

	for (let i = 0; i < drawing.length; i++) {
		beginShape();
		stroke(drawing[i][0]);
		strokeWeight(drawing[i][1]);
		noFill();
		for (let j = 2; j < drawing[i].length; j++) {
			vertex(drawing[i][j].x, drawing[i][j].y);
		}
		endShape();
	}
}
