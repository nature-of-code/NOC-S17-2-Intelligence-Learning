// Based on
// Grokking Algorithms
// http://amzn.to/2n7KF4h

var graph;
var grid;

var vehicle;

var SOLVING = 0;
var RUNNING = 1;
var state = SOLVING;
var index = 0;
var cols = 10;
var rows = 10;
var spacing = 40;

function setup() {
  createCanvas(400, 400);
  startOver();
}

var queue;
var path;

function startOver() {
  graph = new Graph();
  grid = new Array(10);
  path = [];
  queue = [];
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
      if (random(1) < 0.7) {
        n.connect(grid[i][j + 1]);
      }
      if (random(1) < 0.7 && i < cols - 1) {
        n.connect(grid[i + 1][j]);
      }
    }
  }
  graph.setStart(grid[0][0]);
  var endx = floor(random(cols));
  var endy = floor(random(rows));
  graph.setEnd(grid[endx][endy]);
  queue.push(graph.start);
  state = SOLVING;
}



function draw() {
  background(0);
  graph.show();

  if (state == SOLVING) {
    if (queue.length > 0) {
      var node = queue.pop();
      node.highlight();
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
          vehicle = new Vehicle(graph.start.x, graph.start.y);
          state = RUNNING;
          index = path.length-1;
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
    } else {
      console.log("can't solve");
      startOver();
    }
  } else if (state == RUNNING) {
    for (var i = 0; i < path.length; i++) {
      path[i].highlight();
    }
    var current = path[index];
    if (vehicle.reached(current.x, current.y)) {
      index--;
      if (index == -1) {
        startOver();
      }
    }

    vehicle.arrive(current.x, current.y);
    vehicle.update();
    vehicle.display();
  }

}
