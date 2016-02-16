'use strict';

var drawingInterface = function() {

  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var clickX = [];
  var clickY = [];
  var clickDrag = [];
  var paint;

  function addClick(x, y, dragging)
  {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
  };

  function clearCanvas() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  }

  function redraw() {
    clearCanvas();
    
    context.strokeStyle = "#000";
    context.lineJoin = "round";
    context.lineWidth = 5;
  			
    for(var i=0; i < clickX.length; i++) {		
      context.beginPath();
      if(clickDrag[i] && i){
        context.moveTo(clickX[i-1], clickY[i-1]);
       }else{
         context.moveTo(clickX[i]-1, clickY[i]);
       }
       context.lineTo(clickX[i], clickY[i]);
       context.closePath();
       context.stroke();
    }
  };

  $('#canvas').mousedown(function(e){
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;
  		
    paint = true;
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    redraw();
  });

  $('#canvas').mousemove(function(e){
    if(paint){
      addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
      redraw();
    }
  });

  $('#canvas').mouseup(function(e){
    paint = false;
  });

  $('#canvas').mouseleave(function(e){
    paint = false;
  });

  $('.erase').click(function(){
  	clearCanvas();
    clickX = [];
    clickY = [];
    clickDrag = [];
  });

  $('.save').click(function(){
    canvas.toBlob(function(blob) {
      saveAs(blob, "image.png");
    });
  });
}();