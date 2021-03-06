//No user interaction, no change to app - add that
//When user interacts cause changes appropriately

var color = $(".selected").css("background-color");

var $canvas = $("canvas");
//same as document.getElementByTagName("canvas")[0]
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;
//When clicking on list items
$(".controls").on("click", "li", function(){
    //Deselect sibling elements
    $(this).siblings().removeClass("selected"); //no need . after the class! 
    
    //Select clicked element
    $(this).addClass("selected");
    
    //cache current colour
    color = $(this).css("background-color");
});


//When "New color" is clicked
$("#revealColorSelect").click(function(){
    //Show colour select or hide the colour select
    changeColor();
    $("#colorSelect").toggle();
});


//update the new colour span
function changeColor(){
    var r = $("#red").val();
    var g = $("#green").val();
    var b = $("#blue").val();
    
    $("#newColor").css("background-color", "rgb("+ r + "," + g + "," + b +")");
}

//When colour sliders change
$("input[type=range]").change(changeColor);    

//When "Add colour" is clicked
$("#addNewColor").click(function(){
    //append the colour to the controls
    var $newColor = $("<li></li>");
    $newColor.css("background-color", $("#newColor").css("background-color"));
    $(".controls ul").append($newColor);
    //select the new colour
    $newColor.click();
});


//On mouse events on the canvas
$canvas.mousedown(function(e){
    lastEvent = e;
    mouseDown = true;
}).mousemove(function(e){
        //Draw lines
    if(mouseDown){
    context.beginPath();
    context.moveTo(lastEvent.offsetX,lastEvent.offsetY);
    context.lineTo(e.offsetX,e.offsetY);
    context.strokeStyle = color;
    context.stroke();
    lastEvent = e;
    }
}).mouseup(function(){
    mouseDown = false;
}).mouseleave(function(){
    $canvas.mouseup();
});
