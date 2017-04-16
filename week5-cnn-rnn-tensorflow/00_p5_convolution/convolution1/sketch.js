var img;
var dest;
var w = 80;

var xstart = 60;
var ystart = 90;

// The convolution kernel for a "sharpen" effect stored as a 3 x 3 two-dimensional array.
var kernel = [
  [-1, -1, -1],
  [-1, 9, -1],
  [-1, -1, -1]
];

var relu;
var maxpooling;

function preload() {
  img = loadImage("data/kitten.jpg");
}

function setup() {
  createCanvas(256, 256);
  pixelDensity(1);
  dest = createImage(w, w);
  relu = createCheckbox('relu');
  maxpooling = createCheckbox('maxpooling');

  var button = createButton('randomize kernel');
  button.mousePressed(randomizekernel);

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

  // var speed = 2;
  // xstart += speed;
  // if (xstart > img.width - w) {
  //   xstart = 0;
  //   ystart += speed;
  //   if (ystart > img.height - w) {
  //     ystart = 0;
  //   }
  // }

  // In this example we are only processing a section of the image-an 80 x 80 rectangle around the mouse location.
  var xend = xstart + w;
  var yend = ystart + w;
  var kernelsize = 3;

  dest.loadPixels();
  img.loadPixels();
  // Begin our loop for every pixel

  var skip = 1;
  if (maxpooling) {
    skip = 10;
  }


  for (var x = 0; x < dest.width; x++) {
    for (var y = 0; y < dest.height; y++) {
      // Each pixel location (x,y) gets passed into a function called convolution()
      // The convolution() function returns a new color to be displayed.
      var result = convolution(x + xstart, y + ystart, kernel, kernelsize, img);
      var loc = (x + y * dest.width) * 4;
      dest.pixels[loc + 0] = result[0];
      dest.pixels[loc + 1] = result[1];
      dest.pixels[loc + 2] = result[2];
      dest.pixels[loc + 3] = 255;
    }
  }
  dest.updatePixels();


  image(dest, xstart, ystart);
  if (maxpooling.checked()) {
    maxpool(dest, 10, xstart, ystart);
  }
  stroke(0);
  noFill();
  rectMode(CORNERS);
  rect(xstart, ystart, xend, yend);

}

function convolution(x, y, kernel, kernelsize, img) {
  var rtotal = 0.0;
  var gtotal = 0.0;
  var btotal = 0.0;
  var offset = floor(kernelsize / 2);

  // Loop through convolution kernel
  for (var i = 0; i < kernelsize; i++) {
    for (var j = 0; j < kernelsize; j++) {
      // What pixel are we testing
      var xloc = x + i - offset;
      var yloc = y + j - offset;
      var loc = (xloc + img.width * yloc) * 4;

      // Make sure we haven't walked off the edge of the pixel array
      // It is often good when looking at neighboring pixels to make sure we have not gone off the edge of the pixel array by accident.
      loc = constrain(loc, 0, img.pixels.length - 1);
      // Calculate the convolution
      // We sum all the neighboring pixels multiplied by the values in the convolution kernel.
      rtotal += img.pixels[loc + 0] * kernel[i][j];
      gtotal += img.pixels[loc + 1] * kernel[i][j];
      btotal += img.pixels[loc + 2] * kernel[i][j];
    }
  }

  // Make sure RGB is within range

  rtotal = map(rtotal, -255, 255, 0, 255);
  gtotal = map(gtotal, -255, 255, 0, 255);
  btotal = map(btotal, -255, 255, 0, 255);
  if (relu.checked()) {
    rtotal = constrain(rtotal, 127, 255);
    gtotal = constrain(gtotal, 127, 255);
    btotal = constrain(btotal, 127, 255);
    rtotal = map(rtotal, 127, 255, 0, 255);
    gtotal = map(gtotal, 127, 255, 0, 255);
    btotal = map(btotal, 127, 255, 0, 255);
  }

  // Return an array with the three color values
  return [rtotal, gtotal, btotal];
}


function maxpool(img, skip, xoff, yoff) {
  //img.loadPixels();
  for (var x = 0; x < img.width; x += skip) {
    for (var y = 0; y < img.height; y += skip) {
      var brightest = findMax(img, x, y, skip);
      fill(brightest[0], brightest[1], brightest[2]);
      noStroke();
      rectMode(CORNER);
      rect(x + xoff, y + yoff, skip, skip);
    }
  }
}

function findMax(img, xstart, ystart, skip) {
  var record = 0;
  var brightest = [0, 0, 0];
  for (var x = 0; x < skip; x++) {
    for (var y = 0; y < skip; y++) {
      var index = ((x + xstart) + (y + ystart) * img.width) * 4;
      var r = img.pixels[index + 0];
      var g = img.pixels[index + 1];
      var b = img.pixels[index + 2];
      var sum = r + g + b;
      if (sum > record) {
        record = sum;
        brightest = [r, g, b];
      }
    }
  }
  return brightest;
}
