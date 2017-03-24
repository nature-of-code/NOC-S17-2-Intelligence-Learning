// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// This is the graph object

function Graph() {
  // It has an object to store all nodes by label
  this.graph = {};
  // It has a redundant array to iterate through all the nodes
  this.nodes = [];

  // Start and end
  this.start = null;
  this.end = null;
}

// Set start
Graph.prototype.setStart = function(node) {
  this.start = node;
  node.start = true;
}

// Set end
Graph.prototype.setEnd = function(node) {
  this.end = node;
  node.end = true;
}

// Add a node
Graph.prototype.addNode = function(label, x, y) {
  // Create the node
  var n = new Node(label, x, y);
  // Keep track of it
  this.graph[label] = n;
  this.nodes.push(n);
  // Return a reference back
  return n;
}

// Draw everything
Graph.prototype.show = function() {
  for (var i = 0; i < this.nodes.length; i++) {
    this.nodes[i].showEdges();
  }
  for (var i = 0; i < this.nodes.length; i++) {
    this.nodes[i].show();
  }
}
