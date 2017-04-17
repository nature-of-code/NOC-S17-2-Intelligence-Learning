// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Text input
var input;
// Submit button
var submitButton;

function setup() {
  createCanvas(200, 200);
  background(51);
  // Text input
  input = createInput('enter your name');
  // Submit button
  var submitButton = createButton('submit');
  submitButton.mousePressed(submit);

  // Send data to python Flask server
  function submit() {
    var name = input.value();
    loadJSON('/test?name=' + name, gotData);
  }
}

// Reply back from flask server
function gotData(data) {
  console.log(data);

  // Draw the name when it comes back in the canvas
  var name = data.name;
  var x = random(width);
  var y = random(height);
  fill(255);
  noStroke();
  text(name, x, y);
}
