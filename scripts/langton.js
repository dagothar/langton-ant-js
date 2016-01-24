var Langton = (function() {
  
  function Langton(width, height) {
    var width = width, height = height;
    var data = new Array2(width, height, 0);
    var pos = { x: width/2, y: height/2 };
    var dir = 0;
    
    this.Colors = {
      0: '#000000',
      1: '#ffffff'
    };
    
    this.clear = function() {
      data.apply(function(i, j, v) {
        return 0;
      });
      pos.x = width/2;
      pos.y = height/2;
      dir = 0;
    };
    
    this.step = function() {
      /* check the color */
      var color = data.get(pos.x, pos.y);
      
      /* update direction */
      if (color) {
        dir += 1;
        if (dir > 7) dir = 0;
      } else {
        dir -= 1;
        if (dir < 0) dir = 7;
      }
      
      /* toggle cell  color */
      this.toggleCell(pos);
      
      /* move ant */
      switch (dir) {
        case 0:
          pos.y -= 1; break;
        case 1:
          pos.x += 1; pos.y -= 1; break;
        case 2:
          pos.x += 1; break;
        case 3:
          pos.x += 1; pos.y += 1; break;
        case 4:
          pos.y += 1; break;
        case 5:
          pos.x -= 1; pos.y += 1; break;
        case 6:
          pos.x -= 1; break;
        case 7:
          pos.x -= 1; pos.y -= 1; break;
        default:
          break;
      }
    }
    
    this.render = function(canvas) {
      
      var dx = canvas.getAttribute('width') / width;
      var dy = canvas.getAttribute('height') / height;
      var ctx = canvas.getContext('2d');
      
      for (var x = 0; x < width; ++x) { 
        for (var y = 0; y < height; ++y) {
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
