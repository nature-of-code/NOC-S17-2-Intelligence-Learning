// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// An object for an individual node

function Node(label) {
  // Nodes get random location (not a great solution)
  this.x = random(50,width-50);
  this.y = random(50,height-50);
  // The "label" or "value"
  this.label = label;
  // An array of edges
  this.edges = [];
  // Parent
  this.parent = null;
  // Searched?
  this.searched = false;
}

// Connect any neighbors
Node.prototype.connect = function() {
  // This is a fancy way of having a function
  // that can accept a variable number of arguments
  for (var i = 0; i < arguments.length; i++) {
    this.edges.push(arguments[i]);
  }
}

// Draw it
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

// Highlight it
Node.prototype.highlight = function() {
  var w = textWidth(this.label);
  noStroke();
  fill(0, 255, 0, 100);
  ellipse(this.x, this.y, w * 2, w * 2);
}

// Draw lines to the neighbors
Node.prototype.showEdges = function() {
  noFill();
  stroke(255);
  for (var i = 0; i < this.edges.length; i++) {
    line(this.x, this.y, this.edges[i].x, this.edges[i].y);
  }
}
