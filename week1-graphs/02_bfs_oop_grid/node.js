// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// An object for an individual node

function Node(x, y) {
  // Position
  this.x = x;
  this.y = y;
  // Start or end node?
  this.start = false;
  this.end = false;
  // Neighbors
  this.edges = [];
  this.parent = null;
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
  stroke(255);
  fill(0);
  // Different colors based on what has happened so far
  if (this.start || this.end) {
    fill(0, 255, 0);
  } else if (this.searched) {
    fill(150, 0, 150);
  }
  ellipse(this.x, this.y, 16, 16);
}

// Highlight the node a different color
Node.prototype.highlight = function() {
  fill(0, 255, 255, 150);
  ellipse(this.x, this.y, 16, 16);
}

// Draw lines to neighbors
Node.prototype.showEdges = function() {
  noFill();
  stroke(255);
  for (var i = 0; i < this.edges.length; i++) {
    line(this.x, this.y, this.edges[i].x, this.edges[i].y);
  }
}
