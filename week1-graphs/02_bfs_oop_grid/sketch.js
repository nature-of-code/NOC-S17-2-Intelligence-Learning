// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Graph object
var graph;

// Keep all nodes in a 2D array called grid to track neighbors
var grid;

// Queue for BFS algorithm
var queue = [];
// Solved path
var path = [];

function setup() {
  createCanvas(400, 400);
  graph = new Graph();

  // Create a 2D array with cols and rows
  var cols = 10;
  var rows = 10;
  var spacing = 40;
  grid = new Array(10);
  // For every column
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(cols);
    // For every row
    for (var j = 0; j < rows; j++) {
      // Space out the nodes
      var x = spacing / 2 + i * spacing;
      var y = spacing / 2 + j * spacing;
      grid[i][j] = graph.addNode(x, y);
    }
  }

  // Connect them randomly to the right and down
  for (var j = 0; j < rows - 1; j++) {
    for (var i = 0; i < cols; i++) {
      var n = grid[i][j];
      // 80% chance of being connected
      if (random(1) < 0.8) {
        n.connect(grid[i][j + 1]);
      }
      if (random(1) < 0.8 && i < cols - 1) {
        n.connect(grid[i + 1][j]);
      }
    }
  }
  // Slow down framerate
  frameRate(15);

  // Start top left
  graph.setStart(grid[0][0]);

  // Pick a random end
  var endx = floor(random(cols));
  var endy = floor(random(rows));
  graph.setEnd(grid[endx][endy]);
  // Go
  queue.push(graph.start);
}


function draw() {
  background(0);
  // Draw the graph
  graph.show();

  // Now we do one iteration of the loop
  if (queue.length > 0) {
    var node = queue.shift();
    node.highlight();
    // If not already checked
    if (!node.searched) {
      if (node == graph.end) {
        console.log('end!');
        // Figure out the path by going backwards through parent nodes
        path.push(node);
        var next = node.parent;
        // Make path
        while (next) {
          path.push(next);
          next = next.parent;
        }
        // Stops draw() loop!
        noLoop();
      } else {
        // Look at node's neighbors
        var next = node.edges;
        for (var i = 0; i < next.length; i++) {
          // Place them all in the queue and update parent
          var neighbor = next[i];
          queue.push(neighbor);
          neighbor.parent = node;
        }
        // Mark that node as searched
        node.searched = true;
      }
    }
  }

  // Highlight th path if it exists!
  if (path.length > 0) {
    for (var i = 0; i < path.length; i++) {
      path[i].highlight();
    }
  }

}
