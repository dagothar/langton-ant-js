var Langton = (function() {
  
  function Langton(width, height) {
    var width = width, height = height;
    var data = new Array2(width, height, 0);
    var pos = { x: Math.floor(width/2), y: Math.floor(height/3) };
    var dir = 0;
    
    this.Colors = {
      0: '#ffffff',
      1: '#000000'
    };
    
    this.clear = function(canvas) {
      data.apply(function(i, j, v) {
        return 0;
      });
      pos.x = Math.floor(width/2);
      pos.y = Math.floor(height/3);
      dir = 0;
      
      var ctx = canvas.getContext('2d');
      ctx.fillStyle =  this.Colors[0];
      ctx.fillRect(0, 0, canvas.getAttribute('width'), canvas.getAttribute('height'));
    };
    
    this.step = function() {
      /* check the color */
      var color = data.get(pos.x, pos.y);
      
      /* update direction */
      if (color) {
        dir += 1;
        if (dir > 3) dir = 0;
      } else {
        dir -= 1;
        if (dir < 0) dir = 3;
      }
      
      /* toggle cell  color */
      this.toggleCell(pos);
      
      /* move ant */
      switch (dir) {
        case 0:
          pos.y -= 1; break;
        case 1:
          pos.x += 1; break;
        case 2:
          pos.y += 1; break;
        case 3:
          pos.x -= 1; break;
        default:
          break;
      }
    }
    
    this.render = function(canvas) {
      
      var dx = canvas.getAttribute('width') / width;
      var dy = canvas.getAttribute('height') / height;
      var ctx = canvas.getContext('2d');
      
      for (var x = pos.x-1; x <= pos.x+1; ++x) { 
        for (var y = pos.y-1; y <= pos.y+1; ++y) {
          ctx.fillStyle =  this.Colors[data.get(x, y)];
          ctx.fillRect(x * dx, y * dy, dx, dy);
        }
      }
    }
    
    this.getCellPos = function(canvas, mousePos) {
      
      var dx = canvas.getAttribute('width') / width;
      var dy = canvas.getAttribute('height') / height;
      
      return {
        x: Math.floor(mousePos.x / dx),
        y: Math.floor(mousePos.y / dy)
      };
    }
    
    this.toggleCell = function(pos) {

      if (data.get(pos.x, pos.y) == 0) {
        data.set(pos.x, pos.y, 1);
      } else {
        data.set(pos.x, pos.y, 0);
      }
    }
    
    this.getCell = function(pos) {
      return data.get(pos.x, pos.y) == 1;
    }
    
    this.setCell = function(pos, value) {
      data.set(pos.x, pos.y, value ? 1 : 0);
    }
  };
  
  return Langton;
} ());
