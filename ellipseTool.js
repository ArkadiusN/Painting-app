function EllipseTool(){
	this.icon = "assets/ellipsetool.jpg";
	this.name = "Ellipse Tool";
    this.drawing = false;
	//Const array of objects as it doesn't have to be changed except function methods.
    const EllipData =
    [{
        startMouseX: -1,
        startMouseY: -1,
        strokeS:      1,
        FillOn:          true,
        fillShape_button:null,
        strokeSize_in:   null,
    }];
    //Function to prevent a unwanted events.
    this.unselectTool = function()
    {
		select('.options').html("")
        strokeWeight(1)
	}
    
    
	this.draw = function()
    { 
        //Loop to use array of object.
        for (let i = 0; i < EllipData.length; i++)
        {
            
        //Designate first behaviour of shape when the tool is selected. 
        if (!EllipData[i].FillOn)                        
        {                                   
			noFill();
			stroke(colourP.selectedColour);

		}
        //At the begining make it filled with the colour selected on colour palette.
        else if (EllipData[i].FillOn)                   
        {                                
			fill(colourP.selectedColour);  
			stroke(colourP.selectedColour);
		}
        
        if (mouseIsPressed)
        { 
            //If it's the start of drawing a new ellipse.
            if(EllipData[i].startMouseX == -1)
            {
                EllipData[i].startMouseX = mouseX;
				EllipData[i].startMouseY = mouseY;
				this.drawing = true;
				//Save the current pixel Array.
				loadPixels();
			}
            else
            {
                //Update the screen with the saved pixels to hide any previous lines between mouse pressed and released. No multiple ellipses.
				updatePixels();
				//Drawing ellipse on the canvas using it's corners.
                ellipseMode(CORNERS)
				ellipse(EllipData[i].startMouseX,
                        EllipData[i].startMouseY,
                        mouseX, mouseY);
			}
            //Sets the mode of the ellipse to center to stop error for Rainbow Tool, which makes the brush to enlarge as we move mouse.
            ellipseMode(CENTER);
		}
		else if (this.drawing)
        {
            //Save the pixels with the most recent line and reset the start locations.
			loadPixels();
            this.drawing = false;
			EllipData[i].startMouseX = -1;
			EllipData[i].startMouseY = -1;
		}
        }
	};
    
    
    //Creates an options to fill the shape or leave it without fill. It can also allow us to change stroke size.
    this.populateOptions = function()
    {
        //Loop to use array of object.
        for (let i = 0; i < EllipData.length; i++)
        {
            
        //Creates the buttons to interact with.
		select(".options").html(
			"<label for='strokeSize'>Stroke Size: </label><input type='number' style='background-color:#2ECC40' value='1' id='strokeSize'><br/><button id='fillInside'>Fill shape</button>");
        
        //Changed the stroke size based on choice.
		EllipData[i].strokeSize_in = select("#strokeSize");
		EllipData[i].strokeSize_in.input(function()
        {
			EllipData[i].strokeS= Number(this.value());
			strokeWeight(EllipData[i].strokeS);
		})
            
		EllipData[i].fillShape_button = select("#fillInside");
        
        //Change the shape fill based on choice.
		EllipData[i].fillShape_button.mousePressed(function()
        {
			if (EllipData[i].FillOn)
            {
                //Make the shape with no colour and stroke with colour selected.
				noFill();
				stroke(colourP.selectedColour);
				EllipData[i].FillOn = false;
			}
            else if (!EllipData[i].FillOn)
            {
                //Make the shape filled with the colour selected from colour palette as well as the outline.
				fill(colourP.selectedColour);
				stroke(colourP.selectedColour);
				EllipData[i].FillOn = true;
			}
		})
        }
	};
    
};
