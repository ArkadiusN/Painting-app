function RainbowTool(){
    this.icon = "assets/rainbowtool.jpg";
	this.name = "Rainbow Tool";
    //Const array of objects as it doesn't have to be changed except function methods.
    var rbowData =
    [{  //Size of the colour wheel, upper limit.
        degreeOnColorWheel: 360,
        //Rate at which colours are changed.
        rate: 1,
        //Hue is a degree on the color wheel from 0 to 360, 0 is red, 120 is green, 240 is blue.
        HUE:  0, 
        colorfulBrush:    true,
        up_ratebutton:    null, //Object for button.
        down_ratebutton:  null, //Object for button.
        brushobj:         null, //Object for button.
        brush_size: 30          //Size of a brush.
    }]
    //Returns app to the previous settings when selecting another tool.
    this.unselectTool = function()  
    {
        stroke(colourP.selectedColour);
		select('.options').html("")
        strokeWeight(1);
	}
    
    
    //Draws the rainbow brush.
    this.draw = function()
    {
        //Loop to use array of object.
        for (let i = 0; i < rbowData.length; i++)
        {
            
        if (mouseIsPressed)
        {
            if (rbowData[i].colorfulBrush)
            {
                //When Hue is greater than value 360 on colour wheel then reset it back to 0. Allows for colour changed as long as mouse is moved.
                if (rbowData[i].HUE > rbowData[i].degreeOnColorWheel)
                { 
                    rbowData[i].HUE = 0;
                } 
                else 
                {
                    //Rate which goes from 0 to 360 and then it's reseted.
                    rbowData[i].HUE += rbowData[i].rate;
                    //Change colour mode from RGB to Hue,Saturation,Lightness.
                    colorMode(HSL, 360);     
                    noStroke();
                    //'200' means really colorfull and light.
                    fill(rbowData[i].HUE,
                         200,
                         200); 
                    ellipse(mouseX,
                            mouseY,
                            rbowData[i].brush_size, rbowData[i].brush_size);
                }
                //Sets color to default RGB and it stops error, which is a background becoming purple as the "Clear" button is used when "Rainbow tool" was used beforhand.
                colorMode(RGB, 255);
            }
        }
        }
    };
    
    
    //Adds two buttons to increase/decrease the rate of colours.
    this.populateOptions = function()
    {
        //Loop to use array of object.
        for (let i = 0; i < rbowData.length; i++)
        {
            
            select(".options").html(
            "<label for='strokeSize'>Stroke Size: </label><input type='range' min ='5' max='80' value='30' class='slider' id='myRange'><br/><button id='colourRate1'>Colour rate up</button><button id='colourRate2'>Colour rate down</button>");
            //Color rate up.
            rbowData[i].up_ratebutton = select("#colourRate1")
            rbowData[i].up_ratebutton.mousePressed(function()
            {
                if(rbowData[i].up_ratebutton = select("#colourRate1") && rbowData[i].rate <=64)
                {
                    rbowData[i].rate *= 1.5; 
                }
            })
            
            //Color rate down.
            rbowData[i].down_ratebutton = select("#colourRate2")
            rbowData[i].down_ratebutton.mousePressed(function()
            {
                if(rbowData[i].down_ratebutton = select("#colourRate2") && rbowData[i].rate >= 0)
                {
                    rbowData[i].rate /= 1.5; 
                }
            })
            
            //Changed the stroke size based on choice.
            rbowData[i].brushobj = select("#myRange");
            rbowData[i].brushobj.input(function()     
            {
                rbowData[i].brush_size = Number(this.value());
                strokeWeight(rbowData[i].brush_size);
            })
        }  
    };
    
};