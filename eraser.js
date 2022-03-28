function Eraser(){
    this.icon = "assets/eraser.jpg";
	this.name = "Eraser Tool";
    //Const array of objects as it doesn't have to be changed except function methods.
    const eraserData =
    [{
        previousMouseX: -1,
        previousMouseY: -1,
        ourstroke:    null,
    }];
    //Returns app to the previous settings when selecting another tool.
    this.unselectTool = function()
    {
        stroke(colourP.selectedColour);
        strokeWeight(1);
		select('.options').html("");
    };
    
    
    //Draws the eraser on canvas.
    this.draw = function()
    {
        //Loop to use array of object.
        for (let i = 0; i < eraserData.length; i++)
        { 
             
        if (mouseIsPressed)
        {
            //If it's the start of using eraser follow the movement of mouse.
            if (eraserData[i].previousMouseX == -1)
            {
				eraserData[i].previousMouseX = mouseX;
				eraserData[i].previousMouseY = mouseY;
            } 
            else if (mouseIsPressed)
            {
                //When mouse is pressed create the eraser of the size chosen.
                stroke(255);
                strokeWeight(eraserData[i].ourstroke.value());
                line(eraserData[i].previousMouseX,
                     eraserData[i].previousMouseY,
                     mouseX, mouseY);
                eraserData[i].previousMouseX = mouseX;
                eraserData[i].previousMouseY = mouseY;
            }
        }
        else
        {
            //If the user has released the mouse we want to set the previousMouse values back to -1.
            eraserData[i].previousMouseX = -1;
            eraserData[i].previousMouseY = -1;
        }
        }
    };
    
    
    //Adds slider to adjust the size of the eraser.
    this.populateOptions = function()
    {
        //Loop to use array of object.
        for (let i = 0; i < eraserData.length; i++)
        { 
            select(".options").html('<div class="EraserSize"> <input type="range" min="1" max="100" value="50" class="slider" id="myRange"> </div>');
            eraserData[i].ourstroke = select('#myRange'); 
        }
    };

};


