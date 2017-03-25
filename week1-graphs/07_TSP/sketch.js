// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Code for this video: https://youtu.be/BAejnwN4Ccw

// Array of cities
var cities = [];
var totalCities = 5;

// Best total distance
var recordDistance;
// Best path
var bestEver;

function setup() {
  createCanvas(400, 300);
  // Make random cities
  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(width), random(height));
    cities[i] = v;
  }

  // Calculate total distance through array
  var d = calcDistance(cities);
  recordDistance = d;
  bestEver = cities.slice();

}

function draw() {
  background(0);

  // Draw everything
  fill(255);
  for (var i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 8, 8);
  }

  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();
  for (var i = 0; i < cities.length; i++) {
    vertex(cities[i].x, cities[i].y);
  }
  endShape();

  stroke(255, 0, 255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (var i = 0; i < cities.length; i++) {
    vertex(bestEver[i].x, bestEver[i].y);
  }
  endShape();

  // Randomly swap two cities
  var i = floor(random(cities.length));
  var j = floor(random(cities.length));
  swap(cities, i, j);

  // Is this better?
  var d = calcDistance(cities);
  if (d < recordDistance) {
    recordDistance = d;
    bestEver = cities.slice();
  }
}

// A swap function for an array
function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

// Total distance through array
function calcDistance(points) {
  var sum = 0;
  for (var i = 0; i < points.length - 1; i++) {
    var d = dist(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
    sum += d;
  }
  return sum;
}
