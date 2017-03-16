// Based on
// Grokking Algorithms
// http://amzn.to/2n7KF4h

var graph;
var grid;

var vehicle;

function setup() {
  createCanvas(400, 400);
  graph = new Graph();

  var cols = 10;
  var rows = 10;
  var spacing = 40;
  grid = new Array(10);
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(cols);
    for (var j = 0; j < rows; j++) {
      var x = spacing / 2 + i * spacing;
      var y = spacing / 2 + j * spacing;
      grid[i][j] = graph.addNode(false, x, y);
    }
  }

  for (var j = 0; j < rows - 1; j++) {
    for (var i = 0; i < cols; i++) {
      var n = grid[i][j];
      if (random(1) < 0.8) {
        n.connect(grid[i][j + 1]);
      }
      if (random(1) < 0.8 && i < cols - 1) {
        n.connect(grid[i + 1][j]);
      }
    }
  }

  graph.setStart(grid[0][0]);

  vehicle = new Vehicle(graph.start.x, graph.start.y);

  var endx = floor(random(cols));
  var endy = floor(random(rows));
  graph.setEnd(grid[endx][endy]);
  queue.push(graph.start);
  current = graph.start;
}

var queue = [];
var path = [];

var current;

function draw() {
  background(0);
  graph.show();
  current.highlight();

  if (!vehicle.reached(current.x, current.y)) {
    vehicle.arrive(current.x, current.y);
  } else {
    if (queue.length > 0) {
      var node = queue.pop();
      current = node;
      if (!node.searched) {
        if (node == graph.end) {
          console.log('end!');
          path.push(node);
          var next = node.parent;
          // Make path
          while (next) {
            path.push(next);
            next = next.parent;
          }
          noLoop();
        } else {
          var next = node.edges;
          for (var i = 0; i < next.length; i++) {
            var neighbor = next[i];
            queue.push(neighbor);
            neighbor.parent = node;
          }
          node.searched = true;
        }
      }
    }
  }
  if (path.length > 0) {
    for (var i = 0; i < path.length; i++) {
      path[i].highlight();
    }
  }

  vehicle.update();
  vehicle.display();

}
