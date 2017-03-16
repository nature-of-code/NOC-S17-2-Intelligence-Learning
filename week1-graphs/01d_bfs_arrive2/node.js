function Node(food, x, y) {
  this.x = x;
  this.y = y;
  this.food = false;
  this.edges = [];
  this.parent = null;
  this.searched = false;
}

Node.prototype.connect = function(neighbor) {
  for (var i = 0; i < arguments.length; i++) {
    this.edges.push(arguments[i]);
  }
}

Node.prototype.show = function() {
  stroke(255);
  fill(0);
  if (this.food) {
    fill(0, 255, 0);
  } else if (this.searched) {
    fill(150, 0, 150);
  }
  ellipse(this.x, this.y, 16, 16);
}

Node.prototype.highlight = function() {
  fill(0, 255, 255, 150);
  ellipse(this.x, this.y, 16, 16);
}


Node.prototype.showEdges = function() {
  noFill();
  stroke(255);
  for (var i = 0; i < this.edges.length; i++) {
    line(this.x, this.y, this.edges[i].x, this.edges[i].y);
  }
}
