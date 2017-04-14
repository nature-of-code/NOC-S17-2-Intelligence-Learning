var img;

function preload() {
  img = loadImage('zero.png');
}

function setup() {
  createCanvas(200, 200);
  image(img, 0, 0, width, height);

  var base64 = img.canvas.toDataURL();
  base64 = base64.replace('data:image/png;base64,','');

  var data = {
    img: base64
  }
  httpPost('/upload', data, success, error);

  function success(reply) {
    console.log('success');
    console.log(reply);
  }

  function error(reply) {
    console.log('error');
    console.log(reply);
  }

}
