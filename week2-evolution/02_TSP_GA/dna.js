function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function DNA(order) {
  this.dist = Infinity;
  this.fitness = 0;

  if (order instanceof Array) {
    this.order = order.slice();
  } else {
    this.order = [];
    for (var i = 0; i < totalCities; i++) {
      this.order[i] = i;
    }
    for (var n = 0; n < 10; n++) {
      this.shuffle();
    }
  }
}

DNA.prototype.shuffle = function() {
  var i = floor(random(this.order.length));
  var j = floor(random(this.order.length));
  swap(this.order, i, j);
}

DNA.prototype.show = function() {
  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();
  for (var i = 0; i < this.order.length; i++) {
    var n = this.order[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();
}

DNA.prototype.calcDistance = function() {
  var sum = 0;
  for (var i = 0; i < this.order.length - 1; i++) {
    var cityAIndex = this.order[i];
    var cityA = cities[cityAIndex];
    var cityBIndex = this.order[i + 1];
    var cityB = cities[cityBIndex];
    var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  this.dist = sum;
  return sum;
};

DNA.prototype.mapFitness = function(minD, maxD) {
  this.fitness = map(this.dist, minD, maxD, 1, 0);
  return this.fitness;
}

DNA.prototype.normalizeFitness = function(total) {
  this.fitness /= total;
}
