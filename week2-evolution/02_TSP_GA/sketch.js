var cities = [];
var totalCities = 10;

var recordDistance = Infinity;
var bestEver;

var population = [];
var popTotal = 100;

function setup() {
  createCanvas(600, 600);
  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(10, width - 10), random(10, height / 2 - 10));
    cities[i] = v;
  }

  for (var i = 0; i < popTotal; i++) {
    population[i] = new DNA();
  }

}

function draw() {
  background(0);

  stroke(255);
  strokeWeight(1);
  noFill();


  var minDist = Infinity;
  var maxDist = 0;

  var bestNow;
  for (var i = 0; i < population.length; i++) {
    var d = population[i].calcDistance();
    if (d < recordDistance) {
      recordDistance = d;
      bestEver = population[i];
    }
    if (d < minDist) {
      minDist = d;
      bestNow = population[i];
    }
    if (d > maxDist) {
      maxDist = d;
    }
  }

  bestNow.show();
  translate(0, height / 2);
  line(0, 0, width, 0);
  bestEver.show();

  var sum = 0;
  for (var i = 0; i < population.length; i++) {
    sum += population[i].mapFitness(minDist, maxDist);
  }

  for (var i = 0; i < population.length; i++) {
    population[i].normalizeFitness(sum);
  }

  // Double check
  var sum = 0;
  for (var i = 0; i < population.length; i++) {
    sum += population[i].fitness;
  }

  // Selection
  var newPop = [];
  for (var i = 0; i < population.length; i++) {
    var index = 0;
    var r = random(1);
    while (r > 0) {
      r -= population[index].fitness;
      index += 1;
    }
    index -= 1;
    newPop[i] = new DNA(population[index].order);
    if (random(1) < 0.5) {
      newPop[i].shuffle();
    }
  }
  population = newPop;
}
