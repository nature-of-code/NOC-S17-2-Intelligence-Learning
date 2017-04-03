// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning


// Data
var data = [];


var reg;
// do the regression (polynomial to the third degree)
function setup() {
  var canvas = createCanvas(200, 200);
  canvas.parent('canvascontainer');
  canvas.mousePressed(addPoint);
}

function addPoint() {
  var x = map(mouseX, 0, width, -10, 10);
  var y = map(mouseY, 0, height, 10, -10);
  data.push([x,y]);
}

function draw() {

  background(0);

  var order = Number(select('#order').value());
  reg = regression('polynomial', data, order);

  select('#equation').html(reg.string);

  fill(255);
  for (var i = 0; i < data.length; i++) {
    var x = map(data[i][0], -10, 10, 0, width);
    var y = map(data[i][1], -10, 10, height, 0);
    ellipse(x, y, 8, 8);
  }

  beginShape();
  noFill();
  stroke(255);
  for (var x = -10; x <= 10; x+=0.1) {
    var equation = reg.equation;
    // y = equation[3] * pow(x,3) + equation[2] * pow(x,2) + equation[1]*x + equation[0];
    var y = 0; 
    for (var i = 0; i < equation.length; i++) {
      y += equation[i] * pow(x,i);
    }

    var px = map(x, -10, 10, 0, width);
    var py = map(y, -10, 10, height, 0);
    vertex(px, py);
  }
  endShape();
}
