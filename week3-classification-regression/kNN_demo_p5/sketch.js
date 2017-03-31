var training = [];

// What is k
var k = 1;

// Load all the data
var data;

var skip = 20;

var kSlider;
var kParagraph;

function setup() {
  createCanvas(800, 600);
  kSlider = createSlider(1, 10, 1);
  kParagraph = createP();
  //kSlider.parent(kParagraph);
  kSlider.input(update);
  noLoop();

  for (var i = 0; i < 50; i++) {
    var x = random(width);
    var y = random(height);
    var label = 'A';
    var r = random(1);
    if (r < 0.33) {
      label = 'B';
    } else if (r < 0.67) {
      label = 'C';
    }
    var sample = {
      x: x,
      y: y,
      label: label
    };
    training.push(sample);
  }

  update();
}

function update() {
  background(0);

  var k = kSlider.value();
  kParagraph.html('k: ' + k);

  // Classify every possible spot in 2D space
  for (var x = 0; x < width; x += skip) {
    for (var y = 0; y < height; y += skip) {

      // List of all neighbors by distance
      var neighbors = [];
      for (var i = 0; i < training.length; i++) {
        var sample = training[i];
        var d = dist(x, y, sample.x, sample.y);
        neighbors.push({
          dist: d,
          label: sample.label
        });
      }
      neighbors.sort(byDistance);

      function byDistance(a, b) {
        var diff = b.dist - a.dist;
        if (diff < 0) {
          return 1;
        } else if (diff > 0) {
          return -1;
        } else {
          return 0;
        }
      }

      // In the top k spots, how many neighbors per category
      var knn = {};
      for (var i = 0; i < k; i++) {
        var nb = neighbors[i];
        if (knn[nb.label]) {
          knn[nb.label]++;
        } else {
          knn[nb.label] = 1;
        }
      }

      var options = Object.keys(knn);

      var record = 0;
      var classification = null;

      for (var i = 0; i < options.length; i++) {
        var label = options[i];
        var total = knn[label];
        if (total > record) {
          record = total;
          classification = label;
        }
      }

      // Draw rectangle for this spot
      if (classification == 'A') {
        fill(255, 255, 0, 200);
      } else if (classification == 'B') {
        fill(0, 255, 255, 200);
      } else {
        fill(255, 0, 255, 200);
      }
      noStroke();
      rect(x, y, skip, skip);
    }
  }


  for (var i = 0; i < training.length; i++) {
    var sample = training[i];
    if (sample.label == 'A') {
      fill(255, 255, 0, 200);
    } else if (sample.label == 'B') {
      fill(0, 255, 255, 200);
    } else {
      fill(255, 0, 255, 200);
    }
    stroke(0);
    ellipse(sample.x, sample.y, 24, 24);
    noStroke();
    fill(0);
    textAlign(CENTER);
    textSize(12);
    text(sample.label, sample.x, sample.y + 6);
  }

}
