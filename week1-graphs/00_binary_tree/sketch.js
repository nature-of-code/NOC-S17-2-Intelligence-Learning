var tree;

function setup() {
  // var canvas = createCanvas(600, 400);
  // canvas.parent('canvasdiv');
  // var input = select('#word');
  // var submit = select('#submit');
  // submit.mousePressed(addNode);
  // function addNode() {
  //   var label = input.value();
  //   var n = new Node(label);
  //   tree.addNode(n);
  //   background(51);
  //   tree.traverse();
  // }
  // background(51);
  noCanvas();
  tree = new Tree();
  randomSeed(10);
  for (var i = 0; i < 10; i++) {
    var n = new Node(floor(random(100)));
    tree.addNode(n);
  }
  tree.traverse();
}
