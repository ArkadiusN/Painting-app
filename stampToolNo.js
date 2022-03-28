function StampTool2(){
	//set an icon and a name for the object
	this.icon = "assets/stamptool2.jpg";
	this.name = "Stamp Tool2";
    //Const array of objects as it doesn't have to be changed except function methods.
    const stampData =
    [{
       drawing: true,  
       previousMouseX: -1,
       previousMouseX: -1,
       nostamp: loadImage("assets/nostamp.jpg"),//Image used for stamp.
       height: 100,
       width:  150,
       heightobj: null,
       widthobj: null
    }]
    //Returns app to the previous settings when selecting another tool.
    this.unselectTool = function()
    {
        stroke(colourP.selectedColour);
        strokeWeight(1);
		select('.options').html("");
    };
    
    
    //Draws a stamp on canvas.
    this.draw = function() 
    {
        //Loop to use array of object.
        for (let i = 0; i < stampData.length; i++)
        { 
            
		if (mouseIsPressed)
        { 
            
            //If it's the start of drawing a new stamp.
			if (stampData[i].previousMouseX == -1)
            {
				stampData[i].previousMouseX = mouseX;
				stampData[i].previousMouseY = mouseY;
				stampData[i].drawing = true;
                //Save the current pixel Array.
				loadPixels();         
			}
			else
            {
				//Update the screen with the saved pixels to hide any previous lines between mouse pressed and released. No lines inside star.
				updatePixels();
                imageMode(CENTER)
                //Drawing stamp on the canvas.
                image(stampData[i].nostamp, mouseX, mouseY,stampData[i].width, stampData[i].height)
			}
            //Prevents the background image from moving in a strange places on canvas.
            imageMode(CORNER)
		}
		else if (stampData[i].drawing)
        {
			//Save the pixels with the most recent line and reset the drawing bool and start locations.
			loadPixels();
			stampData[i].drawing = false;
			stampData[i].previousMouseX = -1;
			stampData[i].previousMouseY = -1;
        }
        }
    };
    
    
    this.populateOptions = function()
    {
        //Loop to use array of object.
        for (let i = 0; i < stampData.length; i++)
        {
            select(".options").html(
            "<button id='Stampwidth1'>Width up</button>       <button id='Stampwidth2'>Width down</button>      <button id='Stampheight3'>Height up</button>      <button id='Stampheight4'>Height down</button>"); 
            
            stampData[i].widthobj = select("#Stampwidth1")
            stampData[i].widthobj.mousePressed(function()
            {
                if(stampData[i].widthobj = select("#Stampwidth1") && stampData[i].width <= 300)
                {
                    stampData[i].width += 50; 
                }
            })
            
            stampData[i].widthobj= select("#Stampwidth2")
            stampData[i].widthobj.mousePressed(function()
            {
                if(stampData[i].widthobj = select("#Stampwidth2") && stampData[i].width >= 200)
                {
                    stampData[i].width -= 50; 
                    console.log(stampData[i].width)
                }
            })
            
            stampData[i].heightobj= select("#Stampheight3")
            stampData[i].heightobj.mousePressed(function()
            {
                if(stampData[i].heightobj = select("#Stampheight3") && stampData[i].height <= 200)
                {
                    stampData[i].height += 50; 
                    console.log(stampData[i].width)
                }
            }) 
            
            stampData[i].heightobj= select("#Stampheight4")
            stampData[i].heightobj.mousePressed(function()
            {
                if(stampData[i].heightobj = select("#Stampheight4") && stampData[i].height >= 150)
                {
                    stampData[i].height -= 50; 
                    console.log(stampData[i].width)
                }
            }) 
        }  
    };
    
};
