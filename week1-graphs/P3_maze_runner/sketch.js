// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Videos
// https://youtu.be/HyK_Q5rrcr4
// https://youtu.be/D8UgRyRnvXU
// https://youtu.be/8Ju_uxJ9v44
// https://youtu.be/_p5IH0L63wo

// Depth-first search
// Recursive backtracker
// https://en.wikipedia.org/wiki/Maze_generation_algorithm

var cols, rows;
var w = 20;
var grid = [];

var current;

var stack = [];

function setup() {
  createCanvas(600, 600);
  cols = floor(width / w);
  rows = floor(height / w);
  //frameRate(5);

  // Create the grid
  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  // Create the maze all at once
  createMaze();

  // Start and end
  start = grid[0];
  end = grid[grid.length - 1];

  // openSet starts with beginning only (A*)
  openSet.push(start);
}

function draw() {
  background(51);
  // Draw maze
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }
  // Animate A*
  astar();
}


function createMaze() {
  // Start with the first spot
  var current = grid[0];
  current.visited = true;

  // STEP 1
  while (true) {
    // STEP 1: check available neighbors and pick a random one
    var next = current.checkNeighbors();
    // If it's valid
    if (next) {
      // It's done
      next.visited = true;

      // STEP 2: Keep track of where were in the stack
      stack.push(current);

      // STEP 3: Remove wallks between
      removeWalls(current, next);

      // STEP 4: Keep going
      current = next;
    } else if (stack.length > 0) {
      // Go back to the stack
      current = stack.pop();
      // All done
    } else {
      break;
    }
  }
}

// Find the 1D spot in array for 2D location
function index(i, j) {
  if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
    return -1;
  }
  return i + j * cols;
}


// Remove any walls between
function removeWalls(a, b) {
  var x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

// AStar stuff

// Function to delete element from the array
function removeFromArray(arr, elt) {
  // Could use indexOf here instead to be more efficient
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

// An educated guess of how far it is between two points
function heuristic(a, b) {
  // var d = dist(a.i, a.j, b.i, b.j);
  var d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}


// Open and closed set
var openSet = [];
var closedSet = [];

// Start and end
var start;
var end;

// The road taken
var path = [];

function astar() {
  // Am I still searching?
  if (openSet.length > 0) {
    // Best next option
    var winner = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    var current = openSet[winner];

    // Did I finish?
    if (current === end) {
      noLoop();
      console.log("DONE!");
    }

    // Best option moves from openSet to closedSet
    removeFromArray(openSet, current);
    closedSet.push(current);

    // Check all the neighbors
    var neighbors = current.getOptions();
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];

      // Valid next spot?
      if (!closedSet.includes(neighbor)) {
        var tempG = current.g + heuristic(neighbor, current);

        // Is this a better path than before?
        var newPath = false;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }

        // Yes, it's a better path
        if (newPath) {
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }

    }
    // Uh oh, no solution
  } else {
    console.log('no solution');
    noLoop();
    return;
  }

  // Find the path by working backwards
  path = [];
  var temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }


  // Drawing path as continuous line
  noFill();
  stroke(255, 0, 200);
  strokeWeight(2);
  beginShape();
  for (var i = 0; i < path.length; i++) {
    vertex(path[i].i * w + w / 2, path[i].j * w + w / 2);
  }
  endShape();

}
