function FreehandTool(){
	//Set an icon and a name for the object.
	this.icon = "assets/freehand.jpg";
	this.name = "Freehand Tool";
    //Const array of objects as it doesn't have to be changed except function methods.
    const freehData =
    [{
        previousMouseX: -1,//To smoothly draw we'll draw a line from the previous mouse location to the current mouse location.
	    previousMouseY: -1,//The following values store the locations from the last frame.They are -1 to start with because we haven't started drawing yet.
        strokeS:         1, //Starting number for stroke.
        strokeSize_in: null //Null object for an user input.
    }];
    //Returns app to the previous settings when selecting another tool.
    this.unselectTool = function()  
    {
		select('.options').html("")
        strokeWeight(1);
	}
    
    
	this.draw = function()
    {
        //Loop to use array of object.
        for (let i = 0; i < freehData.length; i++)
        { 
            
		//if the mouse is pressed
		if (mouseIsPressed)
        {
			//check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (freehData[i].previousMouseX == -1)
            {
				freehData[i].previousMouseX = mouseX;
				freehData[i].previousMouseY = mouseY;
			}
			//if we already have values for previousX and Y we can draw a line from 
			//there to the current mouse location
			else
            {
				line(freehData[i].previousMouseX,   freehData[i].previousMouseY,
                mouseX, mouseY);
                
				freehData[i].previousMouseX = mouseX;
				freehData[i].previousMouseY = mouseY;
			}
		}
		//If the user has released the mouse we want to set the previousMouse values back to -1.
		else
        {
			freehData[i].previousMouseX = -1;
			freehData[i].previousMouseY = -1;
		}
        }
	};
    
    
    //Allowing a user to choose a size of a Freehand tool brush.
    this.populateOptions = function() 
    {
        //Loop to use array of object.
        for (let i = 0; i < freehData.length; i++)
        {
            select(".options").html(
                "<label for='strokeSize'>Stroke Size: </label><input type='range' min ='1' max='100' value='1' class='slider' id='myRange'><br/>");
            
            //Changed the stroke size based on choice.
            freehData[i].strokeSize_in = select("#myRange");
            freehData[i].strokeSize_in.input(function()     
            {
                freehData[i].strokeS = Number(this.value());
                strokeWeight(freehData[i].strokeS);
            })
        }
    };
};