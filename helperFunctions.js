//Preloading an image so it doesn't appear slower when "Load Image" is clicked. 
function preload()
{
    col_fulimg = loadImage("assets/image_example.jpg");
} 


function HelperFunctions() {

	//Jquery click events. Notice that there is no this. at the
	//start we don't need to do that here because the event will
	//be added to the button and doesn't 'belong' to the object

	//event handler for the clear button event. Clears the screen
	select("#clearButton").mouseClicked(function() {
		background(255, 255, 255);
		//call loadPixels to update the drawing state
		//this is needed for the mirror tool
		loadPixels();
	});

	//event handler for the save image button. saves the canvsa to the
	//local file system.
	select("#saveImageButton").mouseClicked(function() {
		saveCanvas("myPicture", "jpg");
	});
    
    
    //Event handler for the load image button. It loads the image that is in assets as the new background and it adjusts it to the whole canvas. It overwrites everything that was on canvas.
    select("#loadImageButton").mouseClicked(function() {
        background(255, 255, 255);
        loadImage("assets/image_example.jpg", img => {
        image(col_fulimg, 0, 0, width, height);
        });
	})
    
    //Options to choose a filter for a background image.
    //They overwrite eveything that was previously on the canvas.
    select("#blurImageButton").mouseClicked(function() {
        background(255, 255, 255);
        image(col_fulimg, 0, 0, width, height);
        filter(BLUR, 3)
	})
    
    select("#thresholdImageButton").mouseClicked(function() {
        background(255, 255, 255);
        image(col_fulimg, 0, 0, width, height);
        filter(THRESHOLD);
	})
    
    select("#grayImageButton").mouseClicked(function() {
        background(255, 255, 255);
        image(col_fulimg, 0, 0, width, height);
        filter(GRAY);
	})
    
    select("#invertImageButton").mouseClicked(function() {
        background(255, 255, 255);
        image(col_fulimg, 0, 0, width, height);
        filter(INVERT);
	})
    
     select("#posterizeImageButton").mouseClicked(function() {
        background(255, 255, 255);
        image(col_fulimg, 0, 0, width, height);
        filter(POSTERIZE,3);
	})
    
    select("#erodeImageButton").mouseClicked(function() {
        background(255, 255, 255);
        image(col_fulimg, 0, 0, width, height);
        filter(ERODE);
	})
    
};


