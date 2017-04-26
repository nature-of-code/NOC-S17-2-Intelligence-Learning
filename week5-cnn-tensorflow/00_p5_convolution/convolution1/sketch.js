// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// An example to visualize convolution steps in CNN

// Source image
var img;
// Processed pixels
var dest;

// Size of processed pixels
var w = 80;

// Where to process the pixels
var xstart = 60;
var ystart = 90;

// The convolution kernel for a "sharpen" effect
// stored as a 3 x 3 two-dimensional array.
var kernel = [
  [-1, -1, -1],
  [-1, 9, -1],
  [-1, -1, -1]
];

// checkboxes for visualizing relu and/or maxpooling
var relu;
var maxpooling;

// Load an image
function preload() {
  img = loadImage("data/kitten.jpg");
}

function setup() {
  createCanvas(256, 256);
  // turn off HPDI displays (like retina)
  pixelDensity(1);
  // Create a blank image to write processed pixels to
  dest = createImage(w, w);
  // Checkboxes
  relu = createCheckbox('relu');
  maxpooling = createCheckbox('maxpooling');
  // Button to randomize weights
  var button = createButton('randomize kernel');
  button.mousePressed(randomizekernel);

  // Pick random weights for the pixels
  function randomizekernel() {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        kernel[i][j] = random(-1, 1);
      }
    }
  }
}

function draw() {

  // We're only going to process a portion of the image
  // so let's set the whole image as the background first
  image(img, 0, 0);

  // In this example we are only processing a section of the image
  // an 80 x 80 rectangle
  var xend = xstart + w;
  var yend = ystart + w;
  var kernelsize = 3;

  // Load all the pixels
  dest.loadPixels();
  img.loadPixels();

  // Begin our loop for every pixel
  for (var x = 0; x < dest.width; x++) {
    for (var y = 0; y < dest.height; y++) {
      // Each pixel location (x,y) gets passed into a function called convolution()
      // The convolution() function returns a new color to be displayed.
      var result = convolution(img, x + xstart, y + ystart, kernel, kernelsize);
      var index = (x + y * dest.width) * 4;
      dest.pixels[index + 0] = result[0];
      dest.pixels[index + 1] = result[1];
      dest.pixels[index + 2] = result[2];
      dest.pixels[index + 3] = 255;
    }
  }
  dest.updatePixels();

  // Draw the convolved feature map
  image(dest, xstart, ystart);
  if (maxpooling.checked()) {
    maxpool(dest, 5, xstart, ystart);
  }

  // Draw a rectangle for visual clarity
  stroke(0);
  noFill();
  rectMode(CORNERS);
  rect(xstart, ystart, xend, yend);
}

function convolution(img, x, y, kernel, kernelsize) {

  // Going to sum the RGB values of all the pixels
  var rsum = 0.0;
  var gsum = 0.0;
  var bsum = 0.0;

  // Offset around the center pixel
  var offset = floor(kernelsize / 2);

  // Loop through convolution kernel
  for (var i = 0; i < kernelsize; i++) {
    for (var j = 0; j < kernelsize; j++) {

      // What pixel are we testing
      var xpos = x + i - offset;
      var ypos = y + j - offset;
      // Find the 1D location in the array
      var index = (xpos + img.width * ypos) * 4;

      // Make sure we haven't walked off the edge of the pixel array
      // It is often good when looking at neighboring pixels to make sure we have not gone off the edge of the pixel array by accident.
      index = constrain(index, 0, img.pixels.length - 1);

      // Calculate the convolution
      // We sum all the neighboring pixels
      // multiplied by the weights in the convolution kernel.
      rsum += img.pixels[index + 0] * kernel[i][j];
      gsum += img.pixels[index + 1] * kernel[i][j];
      bsum += img.pixels[index + 2] * kernel[i][j];
    }
  }

  // An artificial demonstration of ReLU
  if (relu.checked()) {
    // Negative pixel values would be capped as in the pseudo-code below:
    // sum = constrain(sum, 0, 255);
  } else {
    // To contrast with the effects of ReLU, here, we will map negative pixel values into the positive range.
    rsum = map(rsum, -255, 255, 0, 255);
    gsum = map(gsum, -255, 255, 0, 255);
    bsum = map(bsum, -255, 255, 0, 255);
  }

  // Return an array with the three color values
  return [rsum, gsum, bsum];
}


// This maxpooling function will iterate over all the
// "pooled" areas and draw a rectangle showing the
// brightest pixel
function maxpool(img, skip, xoff, yoff) {
  // Check all the pixels
  for (var x = 0; x < img.width; x += skip) {
    for (var y = 0; y < img.height; y += skip) {
      // Find the brightest pixel
      var brightest = findMax(img, x, y, skip);
      // Draw the rectangle
      fill(brightest[0], brightest[1], brightest[2]);
      noStroke();
      rectMode(CORNER);
      rect(x + xoff, y + yoff, skip, skip);
    }
  }
}

// This function finds the brightest pixel in a smaller area
function findMax(img, xstart, ystart, skip) {
  // Brightest so far
  var record = 0;
  var brightest = [0, 0, 0];
  for (var x = 0; x < skip; x++) {
    for (var y = 0; y < skip; y++) {
      // Find the 1D location in the array
      var index = ((x + xstart) + (y + ystart) * img.width) * 4;
      // Look at RGB
      var r = img.pixels[index + 0];
      var g = img.pixels[index + 1];
      var b = img.pixels[index + 2];
      // Add it up
      var sum = r + g + b;
      // Is this the new brightest pixel?
      if (sum > record) {
        record = sum;
        brightest = [r, g, b];
      }
    }
  }
  // Return the result
  return brightest;
}
