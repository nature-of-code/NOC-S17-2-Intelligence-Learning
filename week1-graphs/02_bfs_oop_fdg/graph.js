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

  // Now a "rest distance" between nodes
  this.springLength = 64;
}

// Set start
Graph.prototype.setStart = function(node) {
  this.start = node;
}

// Set end
Graph.prototype.setEnd = function(node) {
  this.end = node;
}

// Add a node
Graph.prototype.addNode = function(label) {
  // Create the node
  var n = new Node(label);
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

// Simulate some physics!
Graph.prototype.simulate = function() {

  // First node always in center
  this.nodes[0].pos.set(width / 2, height / 2);

  // Look at every node against every other node
  for (var i = 1; i < this.nodes.length; i++) {
    var node1 = this.nodes[i];
    for (var j = 0; j < this.nodes.length; j++) {
      // Nodes don't interact with themselves!
      if (i == j) continue;
      var node2 = this.nodes[j];

      // A vector that points between the nodes
      var force = p5.Vector.sub(node1.pos, node2.pos);
      var dist = force.mag();

      // What is spring force?
      var spring = 0;
      var k = 0.06;
      // If they are connected calculate
      if (node1.isConnected(node2) || node2.isConnected(node1)) {
        spring = k * (this.springLength - dist);
      }
      // All nodes need their own space even if not connected
      var separate = 1 / (dist * k);
      // Apply the force!
      force.setMag(spring + separate)
      node1.vel.add(force);
      // Slow down velocity so that it dampens over time
      node1.vel.mult(0.95);
    }
  }

  // Add velocity to position for all nodes
  for (var i = 0; i < this.nodes.length; i++) {
    var node = this.nodes[i];
    node.pos.add(node.vel);
  }
}
