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
  cols = floor(width/w);
  rows = floor(height/w);
  //frameRate(5);

  // Create a grid of Cell objects
  for (var   j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  // Start with the first
  current = grid[0];
}

function draw() {
  background(51);
  // Draw everything
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  // Current is checked
  current.visited = true;
  // Highlighg it
  current.highlight();
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
