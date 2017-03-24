// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// An object for an individual node

function Node(label) {

  // Nodes have physics now!
  this.pos = createVector(random(width),random(height));
  this.vel = createVector();

  // And a color
  this.col = color(0);

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

// Is this node connected to another node?
Node.prototype.isConnected = function(neighbor) {
  var index = this.edges.indexOf(neighbor);
  if (index >= 0) {
    return true;
  } else {
    return false;
  }
}

// Draw!
Node.prototype.show = function() {
  textAlign(CENTER);
  var w = textWidth(this.label);
  stroke(255);
  fill(this.col);
  ellipse(this.pos.x, this.pos.y, w * 2, w * 2);
  fill(255);
  noStroke();
  text(this.label, this.pos.x, this.pos.y);
}

// Highlight!
Node.prototype.highlight = function() {
  this.col = color(0, 150, 0);
}

// Draw connections as lines
Node.prototype.showEdges = function() {
  noFill();
  stroke(255);
  for (var i = 0; i < this.edges.length; i++) {
    line(this.pos.x, this.pos.y, this.edges[i].pos.x, this.edges[i].pos.y);
  }
}
