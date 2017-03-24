// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Binary tree
var tree;


function setup() {
  createCanvas(800, 600);

  // New tree
  tree = new Tree();

  // Add ten random values
  for (var i = 0; i < 10; i++) {
    tree.addValue(floor(random(0, 100)));
  }

  background(0);

  // Traverse the tree
  tree.traverse();

  // Search the tree for 10
  var result = tree.search(10);
  if (result == null) {
    console.log('not found');
  } else {
    console.log(result);
  }
}
