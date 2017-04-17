var textInput;
var maxlen = 40;

var suggestionP;

var waiting = false;

var slider;
var lengthInput;

function setup() {
  noCanvas();
  textInput = select('#textInput');
  lengthSlider = select('#lenSlider');
  tempSlider = select('#tempSlider');

  textInput.input(generate);
  lengthSlider.input(generate);
  tempSlider.input(generate);

}

function generate() {

  select('#length').html(lengthSlider.value())
  select('#temperature').html(tempSlider.value())

  var original = textInput.value();
  var txt = original.toLowerCase();

  while (txt.length < maxlen) {
    txt += original.toLowerCase();
  }
  if (txt.length > maxlen) {
    txt = txt.substring(txt.length - maxlen, txt.length);
  }

  var data = {
    seed: txt,
    temperature: 0.5,
    length: lengthSlider.value()
  }

  if (!waiting) {
    waiting = true;
    console.log('seed: ' + txt);
    httpPost('/upload', data, success, error);
  }

  function success(reply) {
    var result = JSON.parse(reply);
    // console.log(result);
    select('#original').html(original);
    select('#prediction').html(result.sentence);
    waiting = false;
  }

  function error(reply) {
    console.log(reply);
  }
}
