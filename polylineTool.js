function PolylineTool(){
    this.icon = "assets/polyline.jpg";
	this.name = "Polyline Tool";
    

    var editing = false
    var currentShape = []
    var options = select('.box options')
    var fillToggle = false;
    noFill()
    loadPixels()
    
//----------------------------------------------------------------------------------------------
    //Setting a canvas limit when mouse is clicked.
    function mousePressOnCanvas(canvas){
        if (mouseX > canvas.elt.offsetLeft-68 &&
            mouseX < (canvas.elt.offsetLeft + canvas.width) &&
            mouseY > canvas.elt.offsetTop - 33 &&
            mouseY < (canvas.elt.offsetTop + canvas.height - 30)) 
        {
            return true;
        }
        return false;
    }
    
//----------------------------------------------------------------------------------------------
    
    this.draw = function(){
        updatePixels()
        //Checks to see if the mouse is pressed within the canvas.
        if(mouseIsPressed && mousePressOnCanvas(select('#content'))){
            //Checks to see if editing mode on or off and lets you interact with the according to the mode.
            if(!editing)
            {
                currentShape.push({
                    x: mouseX,
                    y: mouseY
                })
            }
            else
            {
                for(var i = 0; i < currentShape.length; i++)
                {
                    if(dist(currentShape[i].x, currentShape[i].y, mouseX, mouseY) < 30)
                    {
                        currentShape[i].x = mouseX
                        currentShape[i].y = mouseY
                    }
                }
            }
        }

        beginShape()
		noFill()
        for(var i = 0; i < currentShape.length; i++)
        {
            vertex(currentShape[i].x,
                   currentShape[i].y)
            //Marks points where the shape can be edited.
            if(editing)
            {
                push()
                fill(0, 0, 255, 100)
                ellipse(currentShape[i].x, currentShape[i].y, 10)
                pop()
            }
        }
        endShape()
    }

//----------------------------------------------------------------------------------------------

	this.unselectTool = function()
    {
        editing = false
        draw()
        loadPixels();
        currentShape = [];
        
		select('.options').html("")
	}

//----------------------------------------------------------------------------------------------

    //Adds the buttons that allow you to edit the shape and save it to canvas.
	this.populateOptions = function()
    {
        var editButton;
        var finishButton;
        editButton = createButton('Edit Shape')
        editButton.parent(options)
        editButton.mousePressed(function()
        {
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
        finishButton.parent(options)
        finishButton.mousePressed(function()
        {
            editButton.html("Edit Shape")
            editing = false
            draw()
            loadPixels();
            currentShape = [];
            console.log("End Shape")
        })
	}
}

