function RectangleTool(){
	this.icon = "assets/rectangletool.jpg";
	this.name = "Rectangle Tool";
    //Const array of objects as it doesn't have to be changed except function methods.
    const RectData =
    [{
        drawing:  false, 
        startMouseX: -1,
        startMouseY: -1,
        strokeS:      1,
        FillOn:          true,
        fillShape_button:null,
        strokeSize_in:   null
    }];
    //Returns app to the previous settings when selecting another tool.
    this.unselectTool = function()
    {
		select('.options').html("")
        strokeWeight(1);
	}
    
    
    //Draws rectangle.
	this.draw = function() 
    {
        //Loop to use array of object.
        for (let i = 0; i < RectData.length; i++)
        { 
            
        //Designate first behaviour of shape when the tool is selected. 
        if (!RectData[i].FillOn)                        
        {                                   
			noFill();
			stroke(colourP.selectedColour);

		}
        //At the beggining make it filled with the colour selected on colour palette.
        else if (RectData[i].FillOn)                   
        {                                
			fill(colourP.selectedColour);  
			stroke(colourP.selectedColour);
		}
        
		if (mouseIsPressed)
        { 
            
            //If it's the start of drawing a new rect.
			if (RectData[i].startMouseX == -1)
            {
				RectData[i].startMouseX = mouseX;
				RectData[i].startMouseY = mouseY;
				RectData[i].drawing = true;
                //Save the current pixel Array.
				loadPixels();         
			}
			else
            {
				//Update the screen with the saved pixels to hide any previous lines between mouse pressed and released. No lines inside rect.
				updatePixels();
                //Drawing rectangle on the canvas.
				rect(RectData[i].startMouseX,
                     RectData[i].startMouseY,
                     mouseX - RectData[i].startMouseX,
                     mouseY - RectData[i].startMouseY); 
			}
		}
		else if (RectData[i].drawing)
        {
			//Save the pixels with the most recent line and reset the drawing bool and start locations.
			loadPixels();
			RectData[i].drawing = false;
			RectData[i].startMouseX = -1;
			RectData[i].startMouseY = -1;
        }
        }
    };
    
    
    //Creates an options to fill the shape or leave it without fill. It can also allow us to change stroke size.
	this.populateOptions = function() 
    {
        //Loop to use array of object.
        for (let i = 0; i < RectData.length; i++)
        {
            
        //Creates the buttons to interact with.
		select(".options").html(
			"<label for='strokeSize'>Stroke Size: </label><input  type='number' style='background-color:#2ECC40' value='1' colour='green' id='strokeSize'><br/><button id='fillInside'>Fill shape</button>");
        
        //Changed the stroke size based on choice.
		RectData[i].strokeSize_in = select("#strokeSize"); 
		RectData[i].strokeSize_in.input(function()        
        {
			RectData[i].strokeS = Number(this.value());
			strokeWeight(RectData[i].strokeS);
		})
            
		RectData[i].fillShape_button = select("#fillInside");
        
        //Change the shape fill based on choice.
		RectData[i].fillShape_button.mousePressed(function() 
        {                                             
			if (RectData[i].FillOn)
            {
                //Make the shape with no colour and stroke with colour selected.
				noFill();
				stroke(colourP.selectedColour);  
				RectData[i].FillOn = false;                  
			}
            else if (!RectData[i].FillOn)
            {
                //Make the shape filled with the colour selected from colour palette as well as the outline.
				fill(colourP.selectedColour);   
				stroke(colourP.selectedColour);
				RectData[i].FillOn = true;                 
			}
		})
        }
	};
    
};