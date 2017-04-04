// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// This example uses:
// https://github.com/Tom-Alexander/regression-js

// Data
var data = [];

// This is not entirely necessary but I'm mapping
// the pixel space to a cartesian plane where y points up
var minx = -10;
var miny = -10;
var maxx = 10;
var maxy = 10;

function setup() {
  // Create a canvas
  var canvas = createCanvas(600, 200);
  canvas.parent('canvascontainer');
  // Add a point whenever you click on the canvas
  canvas.mousePressed(addPoint);
}

// Add a point
function addPoint() {
  var x = map(mouseX, 0, width, -10, 10);
  var y = map(mouseY, 0, height, 10, -10);
  data.push([x, y]);
}

function draw() {

  background(0);

  // What's the polynomial order (from the interface)
  var order = Number(select('#order').value());

  // Perform the regression with the data
  reg = regression('polynomial', data, order);

  // Display th equation as a String on the page
  var equationP = select('#equation');
  equationP.html(reg.string);

  // Draw all th data points
  fill(255);
  for (var i = 0; i < data.length; i++) {
    var x = map(data[i][0], -10, 10, 0, width);
    var y = map(data[i][1], -10, 10, height, 0);
    ellipse(x, y, 8, 8);
  }


  // Draw the regression line or curve
  beginShape();
  noFill();
  stroke(255);
  // Iterate over a bunch of x values, I could be more thoguhtful about the 0.1
  for (var x = -10; x <= 10; x += 0.1) {

    // Get all the coefficients in the equation as an array
    var equation = reg.equation;

    // For an order=3 polynomial, the array would work like so:
    // y = equation[3] * pow(x,3) + equation[2] * pow(x,2) + equation[1]*x + equation[0];

    // But this loop will work for any polynomial order
    var y = 0;
    for (var i = 0; i < equation.length; i++) {
      y += equation[i] * pow(x, i);
    }

    // Map back to pixel space
    var px = map(x, -10, 10, 0, width);
    var py = map(y, -10, 10, height, 0);

    // Set the vertex
    vertex(px, py);
  }
  endShape();
}
