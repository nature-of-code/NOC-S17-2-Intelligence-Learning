// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Seeking "vehicle" follows the mouse position

// Implements Craig Reynold's autonomous steering behaviors
// One vehicle "seeks"
// See: http://www.red3d.com/cwr/

var population = [];

var food = [];
var poison = [];
var nutrition = [0.1, -1];

var debug;

function setup() {
  var canvas = createCanvas(800, 600);
  canvas.parent('canvascontainer');

  debug = select('#debug');


  angleMode(RADIANS);
  for (var i = 0; i < 10; i++) {
    population[i] = new Vehicle(width / 2, height / 2);
  }
  for (var i = 0; i < 10; i++) {
    food[i] = createVector(random(width), random(height));
  }
  for (var i = 0; i < 5; i++) {
    poison[i] = createVector(random(width), random(height));
  }
}

function mouseDragged() {
  population.push(new Vehicle(mouseX, mouseY));
}

function draw() {
  background(0);

  if (random(1) < 0.1) {
    food.push(createVector(random(width), random(height)));
  }

  if (random(1) < 0.01) {
    poison.push(createVector(random(width), random(height)));
  }

  for (var i = population.length - 1; i >= 0; i--) {
    var v = population[i];

    // Call the appropriate steering behaviors for our agents
    v.eat(food, 0);
    v.eat(poison, 1);
    v.boundaries();

    v.update();
    v.display();

    if (v.dead()) {
      population.splice(i, 1);
      food.push(v.position.copy());
    } else {
      var child = v.birth();
      if (child != null) {
        population.push(child);
      }
    }
  }

  for (var i = 0; i < food.length; i++) {
    fill(0, 255, 0);
    noStroke();
    ellipse(food[i].x, food[i].y, 4);
  }

  for (var i = 0; i < poison.length; i++) {
    fill(255, 0, 0);
    noStroke();
    ellipse(poison[i].x, poison[i].y, 4);
  }
}
