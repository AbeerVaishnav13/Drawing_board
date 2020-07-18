let drawing = [];
let components = 0;
let prevComp = -1;
let alreadyUndo = false, alreadyRedo = false;
let alreadyAddedNewComponent = false;
let penSize, colorPicker;
let undoItem = [];

function changeColor() {
	drawing.pop();
	drawing.push([this.color(), penSize.value()]);
}

function changeSize() {
	drawing.pop();
	drawing.push([colorPicker.color(), this.value()]);
}

function setup() {
	createCanvas(windowWidth, windowHeight-45);

	penSize = createSlider(1, 10, 2, 1);
	penSize.input(changeSize);

	colorPicker = createColorPicker("black");
	colorPicker.input(changeColor);

	cursor(CROSS);
}

function draw() {
	background(240);
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

	if (!alreadyAddedNewComponent) {
		drawing.push([colorPicker.color(), penSize.value()]);
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
