function SpirographTool(){
    this.icon = "assets/spirographtool.jpg";
	this.name = "Spirograph Tool";
    this.innerCircle;
    this.outerCircle;
    //Const array of objects as it doesn't have to be changed except function methods.
    const spiroData = 
    [{
        x: null,
        y: null,
        preX: -1,
        preY: -1,
        angle: 0,
        drawing: false,
    }]
    //Returns app to the previous settings when selecting another tool.
    this.unselectTool = function()
    {
        select('.options').html("");
    }


    function mousePressOnCanvas(canvas)
    {
    if (mouseX > canvas.elt.offsetLeft -68 &&
        mouseX < (canvas.elt.offsetLeft + canvas.width) &&
        mouseY > canvas.elt.offsetTop - 33 &&
        mouseY < (canvas.elt.offsetTop + canvas.height - 30)) 
    {
        return true;
    }
    return false;
    }
    
    
    //Draws a spriograph.
    this.draw = function() 
    {
        //Loop to use array of object.
        for (let i = 0; i < spiroData.length; i++)
        {
        
        //When mouse is pressed and it follows the canvas rules then draw a spirograph.
        if(mouseIsPressed && mousePressOnCanvas(select('#content'))){
            if(spiroData[i].preX == -1){
                spiroData[i].preX = 0;
                spiroData[i].preY = 0;
                spiroData[i].x = mouseX + this.innerCircle.value() * Math.cos(spiroData[i].angle) + this.outerCircle.value() * Math.cos(spiroData[i].angle * 10);
                
                spiroData[i].y = mouseY + this.innerCircle.value() * Math.sin(spiroData[i].angle) + this.outerCircle.value() * Math.sin(spiroData[i].angle * 10);
                spiroData[i].drawing = true;
                loadPixels();
                updatePixels();
            }
            else 
            {
                spiroData[i].preX = spiroData[i].x;
                spiroData[i].preY = spiroData[i].y;
                spiroData[i].x = mouseX + this.innerCircle.value() * Math.cos(spiroData[i].angle) + this.outerCircle.value() * Math.cos(spiroData[i].angle * 10);
                
                spiroData[i].y = mouseY + this.innerCircle.value() * Math.sin(spiroData[i].angle) + this.outerCircle.value() * Math.sin(spiroData[i].angle * 10);
                line(spiroData[i].preX, spiroData[i].preY, spiroData[i].x, spiroData[i].y);
                spiroData[i].angle += 0.02;
            }
        }
        else if(spiroData[i].drawing)
        {
            //Go back to previouse settings.
            spiroData[i].drawing = false;
            spiroData[i].preX = -1;
            spiroData[i].preY = -1;
        }
        }
    };
    
    
    //Options to adjust the radiuses.
    this.populateOptions = function() 
    {
        select(".options").html('<div class="SpirographInnerCircle"> <h3>Radius 1       Radius 2</h3> </div> <div class="SpirographInnerCircleSlider"> <input type="range" min="20" max="120" value="50" class="slider" id="Inner"> <input type="range" min="20" max="120" value="50" class="slider" id="Outer"> </div>');
        this.innerCircle = select('#Inner')
        this.outerCircle = select('#Outer')
    };
};