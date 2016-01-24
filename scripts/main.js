$(document).ready(function() {
  
  var langton = new Langton(160, 120);
  
  var canvas = $('.board').get(0);
  langton.render(canvas);
  
  var stepTimer = undefined;
  var running = false;
  var iteration = 0;
  
  function step() {
    langton.step();
    langton.render(canvas);
    ++iteration;
    $('.langton-iteration').text(iteration);
  };
  
  $('.langton-step').click(function() {
    step();
  });
  
  $('.langton-reset').click(function() {
    langton.clear();
    langton.render(canvas);
    iteration = 0;
  });
  
  $('.langton-start-stop').click(function() {
    if (!running) {
      stepTimer = setInterval(step, 50);
      running = true;
    } else {
      clearInterval(stepTimer);
      running = false;
    }
  });
  
  function getMousePos(e, client) {
    var rect = client.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };
  
  var paint = true;
  var drag = false;
  $('.board').mousedown(function(e) {
    var pos = langton.getCellPos(canvas, getMousePos(e, canvas));
    paint = !langton.getCell(pos);
    langton.setCell(pos, paint);
    langton.render(canvas);
    
    $(this).bind('mousemove', function(e) {
      var pos = langton.getCellPos(canvas, getMousePos(e, canvas));
      langton.setCell(pos, paint);
      langton.render(canvas);
    });
  });
  
  $('.board').mouseup(function(e) {
    $(this).unbind('mousemove');
  });
  
  $('.board').mouseout(function(e) {
    $(this).unbind('mousemove');
  });
  
});
