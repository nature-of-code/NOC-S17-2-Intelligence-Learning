var base64;
var submit;
var resultP;

var next = false;
var drawing = false;

function setup() {
  createCanvas(200, 200);
  resultP = createP(' ');
  submit = createButton('classify');
  submit.mousePressed(classify);
  background(0);
}

function mousePressed() {
  drawing = true;
  if (next) {
    background(0);
    next = false;
  }
}

function mouseReleased() {
  drawing = false;
}

function draw() {
  if (drawing) {
    stroke(255);
    strokeWeight(16);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function classify() {
  var img = get();
  var base64 = img.canvas.toDataURL();
  var cleaned = base64.replace('data:image/png;base64,', '');
  var data = {
    img: cleaned
  }

  httpPost('/upload', data, success, error);

  function success(reply) {
    var result = JSON.parse(reply);
    console.log(result);
    if (result.number != undefined) {
      var number = result.number;
      var confidence = result.prediction[number];
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
