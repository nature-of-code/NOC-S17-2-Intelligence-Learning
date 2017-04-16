function setup() {
  createCanvas(200, 200);
  generate();
}

function generate() {
  var data = {
    seed: 'ince of denmark hamlet prince of denmark',
    temperature: 0.5,
    length: 100    
  }

  httpPost('/upload', data, success, error);

  function success(reply) {
    var result = JSON.parse(reply);
    console.log(result);
  }

  function error(reply) {
    console.log(reply);
  }
}
