var training = [];

// What is k
var k = 1;

// All the training data
var data;

// How many pixels to skip for visualization
var skip = 20;

// slider to play with k value
var kSlider;
var kParagraph;

function setup() {
  createCanvas(800, 600);

  // Create the slider interface
  kSlider = createSlider(1, 10, 1);
  kParagraph = createP();

  // Whenever you change the slider update the canvas
  kSlider.input(update);

  // Create 50 random data points
  for (var i = 0; i < 50; i++) {
    var x = random(width);
    var y = random(height);

    // Data randomly has labels A, B, or C
    var label = 'A';
    var r = random(1);
    if (r < 0.33) {
      label = 'B';
    } else if (r < 0.67) {
      label = 'C';
    }
    // A data point is the x,y location and label
    var point = {
      x: x,
      y: y,
      label: label
    };

    // Add to training array
    training.push(point);
  }

  // Update the canvas
  update();
}


// Instead of a draw() loop
function update() {
  background(0);

  // Current value of k
  var k = kSlider.value();
  kParagraph.html('k: ' + k);


  // Classify every possible spot in 2D space
  for (var x = 0; x < width; x += skip) {
    for (var y = 0; y < height; y += skip) {

      // Here is the KNN algorithm!

      // List of all neighbors by distance
      var neighbors = [];
      for (var i = 0; i < training.length; i++) {
        var point = training[i];
        // Euclidean distance to this neighbor
        var d = dist(x, y, point.x, point.y);
        // Add to an array
        neighbors.push({
          dist: d,
          label: point.label
        });
      }
      // Sort array by distance
      neighbors.sort(byDistance);

      // This function tells the array how to sort
      function byDistance(a, b) {
        return a.dist - b.dist;
      }

      // In the top k spots, how many neighbors per label
      var knn = {};
      for (var i = 0; i < k; i++) {
        // Here's the i'th closest neighbor
        var nb = neighbors[i];
        // Increment its count if we've seen it before
        // We could add something to weight by distance here!
        if (knn[nb.label]) {
          knn[nb.label]++;
        } else {
          // Otherwise start with 1
          knn[nb.label] = 1;
        }
      }

      // Here are all the possible labels
      var options = Object.keys(knn);

      // Which one is the most frequent?
      var record = 0;
      var classification = null;
      for (var i = 0; i < options.length; i++) {
        var label = options[i];
        var total = knn[label];
        // If it's count is higher than any we've found before
        if (total > record) {
          record = total;
          // This is the classification!
          classification = label;
        }
      }

      // Draw rectangle with a color based on classfied label
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

  // Now draw all the training data to see how it looks
  for (var i = 0; i < training.length; i++) {
    var point = training[i];
    if (point.label == 'A') {
      fill(255, 255, 0, 200);
    } else if (point.label == 'B') {
      fill(0, 255, 255, 200);
    } else {
      fill(255, 0, 255, 200);
    }
    stroke(0);
    ellipse(point.x, point.y, 24, 24);
    noStroke();
    fill(0);
    textAlign(CENTER);
    textSize(12);
    text(point.label, point.x, point.y + 6);
  }

}
