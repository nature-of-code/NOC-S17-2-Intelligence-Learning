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
  this.nodes[0].x = width/2;
  this.nodes[0].y = height/2;
  this.nodes[0].velX = 0;
  this.nodes[0].velY = 0;
  for (var i = 1; i < this.nodes.length; i++) {
    var node1 = this.nodes[i];
    for (var j = 0; j < this.nodes.length; j++) {
      if (i == j) continue;
      var node2 = this.nodes[j];
      var dx = node1.x - node2.x;
      var dy = node1.y - node2.y;
      var dist = Math.sqrt(Math.pow(dx, 2)+Math.pow(dy, 2));
      
      var Fspring = (node1.edges.indexOf(node2) >= 0 || node2.edges.indexOf(node1) >= 0)
          ? (this.springLength-dist) * 0.06 : 0;
      var Fcoulomb = 1 / (dist*0.06+0.0001);
      var Fres = Fspring + Fcoulomb;

      
      node1.velX /= 1.05;
      node1.velY /= 1.05;

      var angle = Math.atan2(dy, dx);
      node1.velX += Math.cos(angle) * Fres;
      node1.velY += Math.sin(angle) * Fres;
    }
  }

  var totalChange = 0;
  for (var i = 0; i < this.nodes.length; i++) {
    var node = this.nodes[i];
    node.x += node.velX;
    node.y += node.velY;
    totalChange += Math.abs(node.velX) + Math.abs(node.velY);
  }

  return totalChange;
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
