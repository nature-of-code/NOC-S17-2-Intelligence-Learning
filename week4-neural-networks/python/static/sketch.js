
var input;
var submitButton;

function setup() {
  createCanvas(200,200);
  background(51);
  input = createInput('enter your name');
  var submitButton = createButton('submit');
  submitButton.mousePressed(submit);

  function submit() {
    var name = input.value();
    loadJSON('/test?name=' + name, gotData);
  }
}

function gotData(data) {
  console.log(data);
  var name = data.name;
  var x = random(width);
  var y = random(height);
  fill(255);
  noStroke();
  text(name, x, y);
}
