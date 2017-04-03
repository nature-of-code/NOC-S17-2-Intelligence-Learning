// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// The data we are loading
var training;

// What is the learning rate
// This could change over time!
// var learning_rate = 0.1;
var lrSlider;

// Values of b and m for linear regression
// y = mx + b (formula for a line)
var b = 0;
var m = 0;

// Current number of iterations through data
var iterations = 0;
// How many iterations should we do total
var totalIterations = 10;
// Which sample are we on
var index = 0;


// A function to calculate the "loss"
// Formula for doing this is "sum of squared errors"
function calculateError() {
  // Start sum at 0
  var sum = 0;
  // For each sample
  for (var i = 0; i < training.length; i++) {
    // This is the guess based on the line
    var guess = m * training[i].x + b;
    // The error is the guess minus the actual temperature
    var error = guess - training[i].y;
    // Add up the error squared
    sum += error * error;
  }

  // Divide by total data points to average
  var avg = sum / training.length;
  return avg;
}

function setup() {
  var canvas = createCanvas(600, 600);
  canvas.parent('#canvascontainer');
  canvas.mousePressed(addPoints);
  lrSlider = select('#lrslider');

  // Data will be entered by user clicking
  training = [];
}

function addPoints() {
  // Add a data point
  training.push(createVector(mouseX / width, mouseY / height));
}

function draw() {
  var learning_rate = lrSlider.value();
  select('#lr').html(learning_rate);
  background(200);

  // Calculate the overall error
  var error = calculateError();

  // Draw everything
  drawPoints();
  drawLine();

  // if (training.length > 0) {
  //   // One data point at a time
  //   // Get the x and y values from the data
  //   var x = training[index].x;
  //   var y = training[index].y;
  //   // Make a prediction / guess
  //   var yguess = m * x + b;
  //
  //   // Difference between actual value and prediction is error
  //   var error = y - yguess;
  //
  //   // change b and m in direction of error
  //   var deltaB = error * learning_rate;
  //   var deltaM = x * error * learning_rate;
  //   b += deltaB;
  //   m += deltaM;
  //
  //   // Go to the next sample
  //   index++;
  // }
  //
  // // Finish all the training
  // if (index == training.length) {
  //   index = 0;
  // }

  // Do an entire run through all the data
  var deltaB = 0;
  var deltaM = 0;
  for (var i = 0; i < training.length; i++) {
    var x = training[i].x;
    var y = training[i].y;
    var yguess = m * x + b;
    var error = y - yguess;
    deltaB += (2 / training.length) * error;
    deltaM += (2 / training.length) * x * error;
  }
  b += (deltaB * learning_rate);
  m += (deltaM * learning_rate);

}

// Draw the current line
function drawLine() {
  // Draw a line between any two points (use min and max x)
  var x1 = 0;
  var y1 = m * x1 + b;
  var x2 = 1;
  var y2 = m * x2 + b;
  line(x1 * width, y1 * height, x2 * width, y2 * height);
}

// Plot all the training data
function drawPoints() {
  stroke(0);
  fill(0);
  for (var i = 0; i < training.length; i++) {
    ellipse(training[i].x * width, training[i].y * height, 4, 4);
  }
}
