var canvasWidth = 720;
var canvasHeight = 480;

function Node(val, x, y) {
  this.value = val;
  this.left = null;
  this.right = null;
  this.distance = 2;
  this.x = x;
  this.y = y;
}

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

Node.prototype.visit = function(parent) {
  if (this.left != null) {
    this.left.visit(this);
  }
  console.log(this.value);
  fill(255);
  noStroke();
  textAlign(CENTER);
  textSize(9);
  //text(this.value, this.x, this.y);
  stroke(255);
  //noFill();
  ellipse(this.x, this.y, 11, 11);
  line(parent.x, parent.y, this.x, this.y);
  fill(0);
  text(this.value, this.x, this.y+4);
  if (this.right != null) {
    this.right.visit(this);
  }
}

Node.prototype.addNode = function(n) {
  if (n.value < this.value) {
    if (this.left == null) {
      this.left = n;
      this.left.x = this.x - (canvasWidth/Math.pow(2,n.distance));
      this.left.y = this.y + (canvasHeight/12);
    } else {
      n.distance++;
      this.left.addNode(n)
    }
  } else if (n.value > this.value) {
    if (this.right == null) {
      this.right = n;
      this.right.x = this.x + (canvasWidth/Math.pow(2,n.distance));
      this.right.y = this.y + (canvasHeight/12);
    } else {
      n.distance++;
      this.right.addNode(n);
    }
  }
}
