// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Tree object
function Tree() {
  // Just store the root
  this.root = null;
}

// Start by visiting the root
Tree.prototype.traverse = function() {
  this.root.visit(this.root);
}

// Start by searching the root
Tree.prototype.search = function(val) {
  var found = this.root.search(val);
  return found;
}

// Add a new value to the tree
Tree.prototype.addValue = function(val) {
  var n = new Node(val);
  if (this.root == null) {
    this.root = n;
    // An initial position for the root node
    this.root.x = width / 2;
    this.root.y = 16;
  } else {
    this.root.addNode(n);
  }
}
