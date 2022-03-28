var canvas;
var editButton;
var finishButton;
var editing = false
var currentShape = []

function setup() {
	canvas = createCanvas(800, 800);
	background(200);
	noFill();
	loadPixels();
	editButton = createButton('Edit Shape')
	editButton.mousePressed(function(){
		if(!editing){
			editing = true
			editButton.html("Editing")
		}
		else {
			editing = false
			editButton.html("Drawing")
		}
	})
	finishButton = createButton('Finish Shape')
	finishButton.mousePressed(function(){
        editButton.html("Edit Shape")
		editing = false
		draw()
		loadPixels();
		currentShape = [];
	})

}


//Checks if mouse is within the boundries of the canvas
function mousePressOnCanvas(canvas) {
	if (mouseX > canvas.elt.offsetLeft &&
		mouseX < (canvas.elt.offsetLeft + canvas.width) &&
		mouseY > canvas.elt.offsetTop &&
		mouseY < (canvas.elt.offsetTop + canvas.height)
	) {
		return true;
	}
	return false;
}

//draws lines where mouse is clicked
function draw(){
    updatePixels()
	//checks to see if the mouse is pressed within the canvas
	if(mouseIsPressed && mousePressOnCanvas(canvas)){
		//checks to see if editing mode on or off and lets you interact with the according to the mode
		if(!editing){
			currentShape.push({
				x: mouseX,
				y: mouseY
			})
		} else {
			for(var i = 0; i < currentShape.length; i++){
				if(dist(currentShape[i].x, currentShape[i].y, mouseX, mouseY) < 30){
					currentShape[i].x = mouseX
					currentShape[i].y = mouseY
				}
			}
		}
	}
	
	beginShape()
	for(var i = 0; i < currentShape.length; i++){
		vertex(
			currentShape[i].x, currentShape[i].y
		)
        //Marks points where the shape can be edited
        if(editing){
            push()
            fill(0, 0, 255, 100)
            ellipse(currentShape[i].x, currentShape[i].y, 10)
            pop()
        }
	}
	endShape()
}
