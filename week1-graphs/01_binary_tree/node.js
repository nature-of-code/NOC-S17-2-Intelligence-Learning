// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Node in the tree
function Node(val) {
  this.value = val;
  this.left = null;
  this.right = null;
}

// Search the tree for a value
Node.prototype.search = function(val) {
  if (this.value == val) {
    return this;
  } else if (val < this.value && this.left != null) {
    return this.left.search(val);
  } else if (val > this.value && this.right != null) {
    return this.right.search(val);
  }
  return null;
}

// Visit a node
Node.prototype.visit = function() {
  // Recursively go left
  if (this.left != null) {
    this.left.visit();
  }
  // Print out value
  console.log(this.value);
  // Recursively go right
  if (this.right != null) {
    this.right.visit();
  }
}

// Add a node
Node.prototype.addNode = function(n) {
  if (n.value < this.value) {
    if (this.left == null) {
      this.left = n;
    } else {
      this.left.addNode(n)
    }
  } else if (n.value > this.value) {
    if (this.right == null) {
      this.right = n;
    } else {
      this.right.addNode(n);
    }
  }
}
