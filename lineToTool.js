//a tool for drawing straight lines to the screen. Allows the user to preview
//the a line to the current mouse position before drawing the line to the 
//pixel array.
function LineToTool(){
	this.icon = "assets/lineTo.jpg";
	this.name = "LineTo";
	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;
    //Const array of objects as it doesn't have to be changed except function methods.
    const linetoData =
    [{
        strokeS:      1,
        strokeSize_in:   null
    }];
    //Returns app to the previous settings when selecting another tool.
    this.unselectTool = function()  
    {
		select('.options').html("")
        strokeWeight(1);
	}
    
    
	//draws the line to the screen 
	this.draw = function(){

		//only draw when mouse is clicked
		if(mouseIsPressed){
			//if it's the start of drawing a new line
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				//save the current pixel Array
				loadPixels();
			}

			else{
				//update the screen with the saved pixels to hide any previous
				//line between mouse pressed and released
				updatePixels();
				//draw the line
				line(startMouseX, startMouseY, mouseX, mouseY);
			}

		}

		else if(drawing){
			//save the pixels with the most recent line and reset the
			//drawing bool and start locations
			loadPixels();
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};
    
    
    //Adds slider to adjust the size of the eraser.
    this.populateOptions = function() 
    {
         //Loop to use array of object.
        for (let i = 0; i < linetoData.length; i++)
        {
            select(".options").html(
                "<label for='strokeSize'>Stroke Size: </label><input type='range' min ='1' max='100' value='1' class='slider' id='myRange'><br/>"); 
            
            //Changed the stroke size based on choice.
            linetoData[i].strokeSize_in = select("#myRange");
            linetoData[i].strokeSize_in.input(function()     
            {
                linetoData[i].strokeS = Number(this.value());
                strokeWeight(linetoData[i].strokeS);
            })
        }
    };

};
