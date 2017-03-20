function Node(label) {
  this.label = label;
  this.edges = [];
  this.parent = null;
  this.searched = false;
}

Node.prototype.connect = function(neighbor) {
  for (var i = 0; i < arguments.length; i++) {
    this.edges.push(arguments[i]);
    // Connect both ways
    arguments[i].edges.push(this);
  }
}
