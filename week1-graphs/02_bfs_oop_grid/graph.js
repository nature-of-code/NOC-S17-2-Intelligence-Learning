function Graph() {
  this.graph = {};
  this.nodes = [];
  this.start = null;
  this.end = null;
}

Graph.prototype.setStart = function(node) {
  this.start = node;
  node.food = true;
}

Graph.prototype.setEnd = function(node) {
  this.end = node;
  node.food = true;
}

Graph.prototype.addNode = function(label, x, y) {
  var n = new Node(label, x, y);
  this.graph[label] = n;
  this.nodes.push(n);
  return n;
}

Graph.prototype.show = function() {
  for (var i = 0; i < this.nodes.length; i++) {
    this.nodes[i].showEdges();
  }
  for (var i = 0; i < this.nodes.length; i++) {
    this.nodes[i].show();
  }
}

// Graph.prototype.connect = function(a, b) {
//   this.graph[a].connect(b);
// }
