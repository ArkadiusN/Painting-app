function SprayCanTool(){
	this.name = "sprayCanTool";
	this.icon = "assets/sprayCan.jpg";
    //Const array of objects as it doesn't have to be changed except function methods.
    const sprayData =
    [{
        points: 13,
        spread: 10,
        strokeS: 1,
        strokeSize_in:     null,
        up_pointsbutton:   null,
        down_pointsbutton: null,
        up_spreadbutton:   null,
        down_spreadbutton: null
    }];
    //Returns app to the previous settings when selecting another tool.
    this.unselectTool = function()  
    {
		select('.options').html("")
        strokeWeight(1);
	}

    
    //Draws a spray.
	this.draw = function()
    {
        for (var x = 0; x < sprayData.length; x++)
        {
            
		var r = random(5,10);
		if(mouseIsPressed)
        {
			for(var i = 0; i < sprayData[x].points; i++)
            {
				point(random(mouseX-sprayData[x].spread,
                             mouseX + sprayData[x].spread),
                      random(mouseY-sprayData[x].spread, mouseY+sprayData[x].spread));
			}
		}   
        }
	};
    
    
    //Gives additional options for the spray.
    this.populateOptions = function() 
    {
        
    for (let i = 0; i < sprayData.length; i++)
        {
            select(".options").html(
            "<label for='strokeSize'>Stroke Size: </label><input type='range' min ='1' max='6' value='1' class='slider' id='myRange'><br/><button id='Rate1'>Points amount up</button><button id='Rate2'>Points amount down</button><button id='Rate3'>Spread amount up</button><button id='Rate4'>Spread amount down</button>");
            
            //Changed the stroke size based on choice.
            sprayData[i].strokeSize_in = select("#myRange");
            sprayData[i].strokeSize_in.input(function()     
            {
                sprayData[i].strokeS = Number(this.value());
                strokeWeight(sprayData[i].strokeS);
            })
 
            //Changed the aount of spray points based on choice.
            sprayData[i].up_pointsbutton = select("#Rate1")
            sprayData[i].up_pointsbutton.mousePressed(function()
            {
                if(sprayData[i].up_pointsbutton = select("#Rate1") && sprayData[i].points <=832)
                {
                    sprayData[i].points *= 2; 
                    console.log(sprayData[i].points)
                }
            })
            
            sprayData[i].down_pointsbutton = select("#Rate2")
            sprayData[i].down_pointsbutton.mousePressed(function()
            {
                if(sprayData[i].down_pointsbutton = select("#Rate2")&& sprayData[i].points >= 0)
                {
                   
                    sprayData[i].points /= 2;
                    console.log(sprayData[i].points)
                }
            })
            
            
            //Changed the spread length based on choice.
            sprayData[i].up_spreadbutton = select("#Rate3")
            sprayData[i].up_spreadbutton.mousePressed(function()
            {
                if(sprayData[i].up_spreadbutton = select("#Rate3") && sprayData[i].spread <=160)
                {
                    sprayData[i].spread *= 2;
                    console.log(sprayData[i].spread)
                }
            })
            
            sprayData[i].down_spreadbutton = select("#Rate4")
            sprayData[i].down_spreadbutton.mousePressed(function()
            {
                if(sprayData[i].down_spreadbutton = select("#Rate4") && sprayData[i].spread >= 0)
                {
                    sprayData[i].spread /= 2;
                    console.log(sprayData[i].spread)
                }
            })    
        }
    };

};
