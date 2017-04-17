// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Submit button
var submit;
// Show results
var resultP;

var next = false;
var drawing = false;

function setup() {
  // Create DOM elements
  var canvas = createCanvas(200, 200);
  canvas.mousePressed(startDrawing);
  canvas.mouseReleased(stopDrawing);
  resultP = createP(' ');
  submit = createButton('classify');
  // When the button is pressed classify!
  submit.mousePressed(classify);
  background(0);
}

// Turn drawing on
function startDrawing() {
  drawing = true;
  if (next) {
    // Clear the background
    background(0);
    next = false;
  }
}

// Turn drawing off when you release
function stopDrawing() {
  drawing = false;
}

function draw() {
  // If you are drawing
  if (drawing) {
    stroke(255);
    strokeWeight(16);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

// Run the classification
function classify() {
  // Get all the pixels!
  var img = get();
  // Turn it to a base64 encoded string
  var base64 = img.canvas.toDataURL();
  // Get rid of the header stuff (should maybe do this in flask)
  var cleaned = base64.replace('data:image/png;base64,', '');
  // Make an object to post
  var data = {
    img: cleaned
  }

  // Post the data!
  httpPost('/upload', data, success, error);

  // Here is where we get a reply
  function success(reply) {
    // Parse the reply
    var result = JSON.parse(reply);
    console.log(result);

    // As long as we got something
    if (result.number != undefined) {
      // Look at number and probability (confidence)
      var number = result.number;
      var confidence = result.prediction[number];
      // Display the results in the paragraph element
      resultP.html(number + '<br/>' + 'confidence: ' + nf(100 * confidence, 2, 1) + '%');
    } else {
      resultP.html('error');
    }
    next = true;
  }

  function error(reply) {
    console.log(reply);
    resultP.html('error');
  }
}
