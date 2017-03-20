function Node(label) {
  this.x = random(50,width-50);
  this.y = random(50,height-50);
  this.velX = 0;
  this.velY = 0;

  this.label = label;
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
  textAlign(CENTER);
  var w = textWidth(this.label);
  stroke(255);
  fill(0);
  ellipse(this.x, this.y, w * 2, w * 2);
  fill(255);
  noStroke();
  text(this.label, this.x, this.y);
}

Node.prototype.highlight = function() {
  var w = textWidth(this.label);
  noStroke();
  fill(0, 255, 0, 100);
  ellipse(this.x, this.y, w * 2, w * 2);
}

Node.prototype.showEdges = function() {
  noFill();
  stroke(255);
  for (var i = 0; i < this.edges.length; i++) {
    line(this.x, this.y, this.edges[i].x, this.edges[i].y);
  }
}
