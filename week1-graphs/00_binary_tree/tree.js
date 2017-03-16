function Tree() {
  this.root = null;
}

Tree.prototype.traverse = function() {
  this.root.visit();
}

Tree.prototype.addNode = function(n) {
  if (this.root == null) {
    this.root = n;
  } else {
    this.root.addNode(n);
  }
}

Node.prototype.visit = function() {
  if (this.left != null) {
    this.left.visit();
  }

  console.log(this.label);
  // draw something?

  if (this.right != null) {
    this.right.visit();
  }
}

Node.prototype.addNode = function(n) {
  if (n.label > this.label) {
    if (this.right == null) {
      this.right = n;
    } else {
      this.right.addNode(n);
    }
  } else if (n.label < this.label) {
    if (this.left == null) {
      this.left = n;
    } else {
      this.left.addNode(n);
    }
  }
}

function Node(label, x, y) {
  this.label = label;
  this.left = null;
  this.right = null;
  this.x = x;
  this.y = y;
}
