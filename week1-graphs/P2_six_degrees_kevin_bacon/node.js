// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Node object
function Node(label) {
  // Has a label
  this.label = label;
  // zero or more edges
  this.edges = [];
  // No parent and not searched by default
  this.parent = null;
  this.searched = false;
}

// Connect one or more neighbors
Node.prototype.connect = function(neighbor) {
  // This is a fancy way of having a function
  // that can accept a variable number of arguments
  for (var i = 0; i < arguments.length; i++) {
    this.edges.push(arguments[i]);
    // Connect both ways
    arguments[i].edges.push(this);
  }
}
