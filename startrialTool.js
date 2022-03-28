function StartrialTool(){
    this.icon = "assets/startrialtool.jpg";
	this.name = "Star Trial Tool";
    //Const array of objects as it doesn't have to be changed except function methods.Values inside are needed for things such as radius/height/width/centre point.
    const starData =
    [{ 
        //Position,colour,stroke, buttons.
        startMouseX: -1,
        startMouseY: -1,
        strokeS:      1,
        FillOn:           true,
        fillShape_button: null,
        strokeSize_in:    null,
        //V V V Related to creating the star shape.
        edges_pos:         2.0,
        two_pi:         TWO_PI,
        star_angle:    TWO_PI/8
    }]; 
    //Returns app to the previous settings when selecting another tool.
    this.unselectTool = function()  
    {
		select('.options').html("")
        strokeWeight(1);
	}
    

    //Creates the star shape.
    this.star = function(x, y, radius1, radius2) 
    {
        beginShape(); 
        //Loop to use array of object.
        for (let i = 0; i < starData.length; i++)
        {
            for (let a = 0; a < starData[i].two_pi; a += starData[i].star_angle)
            {
                //Adjusting star "x" position with "cos" for the width and multiplication for the lenght of the star's beams left and right.
                let sx = x + cos(a) * 20;
                //Adjusting star "y" position with "sin" for the height and multiplication for the lenght of the star's beams up and down.
                let sy = y + sin(a) * 20;  
                
                //New shape with the defined coordinates.
                vertex(sx, sy);
                //Moving the in between eges and defining where the centre is.
                sx = x + cos(a + 
                    starData[i].star_angle/starData[i].edges_pos)
                    * radius1;
                sy = y + sin(a +
                    starData[i].star_angle/starData[i].edges_pos)
                    * radius1;
                vertex(sx, sy);
            }
            endShape(CLOSE);  
        }
    };
    
    
    //Draws a star on canvas.
    this.draw = function()
    {  
        //Loop to use array of object.
        for (let i = 0; i < starData.length; i++)
        {
            
        //Designate first behaviour of shape when the tool is selected.
        if (!starData[i].FillOn)                          
        {                                    
			noFill();
			stroke(colourP.selectedColour);
		}
        //At the beggining make it filled with the colour selected on colour palette.
        else if (starData[i].FillOn)                      
        {                                    
			fill(colourP.selectedColour);
			stroke(colourP.selectedColour);
		}
        
		if (mouseIsPressed) 
        {
			//Check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (starData[i].startMouseX == -1)
            {
				starData[i].startMouseX = mouseX;
				starData[i].startMouseY = mouseY;
			}
			//If we already have values for previousX and Y we can draw a star.
			else
            {
                //Drawing star on the canvas.
				this.star(mouseX,
                          mouseY,
                          10, 70); 
				starData[i].startMouseX = mouseX;
				starData[i].startMouseX = mouseY;
			}
		}
		//If the user has released the mouse we want to set the previousMouse values back to -1.
		else
        {
			starData[i].startMouseX  = -1;
			starData[i].startMouseY  = -1;
		}
        }
	};
    
    
    //Creates an options to fill the shape or leave it without fill. It can also allow us to change stroke size in between 1-8 as in terms of star it looks properly in this range.
    this.populateOptions = function()  
    {
        //Loop to use array of object.
        for (let i = 0; i < starData.length; i++)
        {
            
        //Designate range and create buttons to interact with.
        select(".options").html(
			"<label for='strokeSize'>Stroke Size: </label><input type='range' min ='1' max='8' value='1' class='slider' id='myRange'><br/><button id='fillInside'>Fill shape</button>");  
        
        //Changed the stroke size based on choice.
		starData[i].strokeSize_in = select("#myRange");
		starData[i].strokeSize_in.input(function()     
        {
			starData[i].strokeS = Number(this.value());
			strokeWeight(starData[i].strokeS);
		})
		starData[i].fillShape_button = select("#fillInside");
        
        //Change the shape fill based on choice.
		starData[i].fillShape_button.mousePressed(function() 
        {                                             
			if (starData[i].FillOn)  
            {
                //Make the shape with no colour and stroke with colour selected.
				noFill();
				stroke(colourP.selectedColour); 
				starData[i].FillOn = false;                 
			}
            else if (!starData[i].FillOn)
            {
                //Make the shape filled with the colour selected from colour palette as well as the outline.
				fill(colourP.selectedColour);  
				stroke(colourP.selectedColour);
				starData[i].FillOn = true;                 
			}
		})
        }
	};
    
};