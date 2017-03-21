function Graph() {
  this.graph = {};
  this.nodes = [];
  this.start = null;
  this.end = null;

  this.springLength = 64;
}

Graph.prototype.setStart = function(node) {
  this.start = node;
}

Graph.prototype.simulate = function() {
  this.nodes[0].pos.set(width / 2, height / 2);

  for (var i = 1; i < this.nodes.length; i++) {
    var node1 = this.nodes[i];
    for (var j = 0; j < this.nodes.length; j++) {
      if (i == j) continue;
      var node2 = this.nodes[j];
      var force = p5.Vector.sub(node1.pos, node2.pos);
      var dist = force.mag();

      var spring = 0;
      var k = 0.06;
      if (node1.isConnected(node2) || node2.isConnected(node1)) {
        spring = k * (this.springLength - dist);
      }
      var separate = 1 / (dist * k);
      force.setMag(spring + separate)
      node1.vel.mult(0.95);
      node1.vel.add(force);
    }
  }

  for (var i = 0; i < this.nodes.length; i++) {
    var node = this.nodes[i];
    node.pos.add(node.vel);
  }
}

Graph.prototype.setEnd = function(node) {
  this.end = node;
}

Graph.prototype.addNode = function(label) {
  var n = new Node(label);
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
