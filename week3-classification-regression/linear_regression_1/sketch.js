// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Data set from
// http://college.cengage.com/mathematics/brase/understandable_statistics/7e/students/datasets/slr/frames/slr02.html

// The data we are loading
var data;
var training;

// What is the learning rate
// This could change over time!
var learning_rate = 0.0001;

// Values of b and m for linear regression
// y = mx + b (formula for a line)
var b = 0;
var m = 0;

// Current number of iterations through data
var iterations = 0;
// How many iterations should we do total
var totalIterations = 10;
// Which data point are we on
var index = 0;


// Find the minimum and maximum x and y values for plotting
var minX = Infinity;
var maxX = 0;
var minY = Infinity;
var maxY = 0;

// Load the data
function preload() {
  data = loadJSON('crickets.json');
}

// A function to calculate the "loss"
// Formula for doing this is "sum of squared errors"
function calculateError() {
  // Start sum at 0
  var sum = 0;
  // For each training data point
  for (var i = 0; i < training.length; i++) {
    // This is the guess based on the line
    var guess = m * training[i].chirps + b;
    // The error is the guess minus the actual temperature
    var error = guess - training[i].temp;
    // Add up the error squared
    sum += error * error;
  }

  // Divide by total training to average
  var avg = sum / training.length;
  return avg;
}

function setup() {
  createCanvas(600, 400);

  // Get the training
  training = data.samples;

  // Someday we might want to actually normalize all the data
  // So knowing the minimum and maximum value of each feature is useful
  // Here we are doing this just to graph the data in the pixel space
  for (var i = 0; i < training.length; i++) {
    var x = training[i].chirps;
    var y = training[i].temp;
    minX = min(x, minX);
    maxX = max(x, maxX);
    minY = min(y, minY);
    maxY = max(y, maxY);
  }


}

function draw() {
  background(200);

  // Calculate the overall error
  var error = calculateError();

  // Draw everything
  drawPoints();
  drawLine();

  // One data point at a time
  // Get the x and y values from the data
  var x = training[index].chirps;
  var y = training[index].temp;
  // Make a prediction / guess
  var yguess = m * x + b;

  // Difference between actual value and prediction is error
  var error = y - yguess;

  // change b and m in direction of error
  var deltaB = error * learning_rate;
  var deltaM = x * error * learning_rate;
  b += deltaB;
  m += deltaM;

  // Go to the next data point
  index++;

  // Finish all the training
  if (index == training.length) {
    index = 0;

    // Finish the simulation
    iterations++;
    if (iterations == totalIterations) {
      noLoop();
    }
  }

  // Do an entire run through all the training
  // var deltaB = 0;
  // var deltaM = 0;
  // for (var i = 0; i < training.length; i++) {
  //   var x = training[i].chirps;
  //   var y = training[i].temp;
  //   var yguess = m * x + b;
  //   var error = y - yguess;
  //   deltaB += (2 / training.length) * error;
  //   deltaM += (2 / training.length) * x * error;
  // }
  // b += (deltaB * learning_rate);
  // m += (deltaM * learning_rate);

}

// Draw the current line
function drawLine() {

  // Draw a line between any two points (use min and max x)
  var x1 = minX;
  var y1 = m * x1 + b;
  var x2 = maxX;
  var y2 = m * x2 + b;

  // Map points to pixel space
  x1 = map(x1, minX, maxX, 0, width);
  x2 = map(x2, minX, maxX, 0, width);
  y1 = map(y1, minY, maxY, height, 0);
  y2 = map(y2, minY, maxY, height, 0);
  line(x1, y1, x2, y2);
}

// Plot all the data
function drawPoints() {
  stroke(0);
  fill(0);
  for (var i = 0; i < training.length; i++) {
    // Map points to pixel space
    var x = map(training[i].chirps, minX, maxX, 0, width);
    var y = map(training[i].temp, minY, maxY, height, 0);
    ellipse(x, y, 4, 4);
  }
}
