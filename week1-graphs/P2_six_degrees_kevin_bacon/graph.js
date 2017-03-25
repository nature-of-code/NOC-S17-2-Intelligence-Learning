// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Graph object

function Graph() {
  // store nodes by key and also in an array
  this.graph = {};
  this.nodes = [];
  // Start and end
  this.start = null;
  this.end = null;
}

// Set the start
Graph.prototype.setStart = function(node) {
  this.start = node;
}

// Set the end
Graph.prototype.setEnd = function(node) {
  this.end = node;
}

// Add a node
Graph.prototype.addNode = function(label) {
  var n = new Node(label);
  // Add to both the graph object and the nodes array
  this.graph[label] = n;
  this.nodes.push(n);
  return n;
}

// Clear all searched and parent values
Graph.prototype.clear = function() {
  for (var i = 0; i < this.nodes.length; i++) {
    this.nodes[i].searched = false;
    this.nodes[i].parent = null;
  }
}
