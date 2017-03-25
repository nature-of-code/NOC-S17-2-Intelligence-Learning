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

// Each cell
function Cell(i, j) {
  this.i = i;
  this.j = j;
  // Any walls?
  this.walls = [true, true, true, true];
  // Has this been visited yet? (DFS)
  this.visited = false;

  // f, g, and h values for A*
  this.f = 0;
  this.g = 0;
  this.h = 0;

  // Where can I go next? (A*)
  this.getOptions = function() {
    var options = [];
    if (!this.walls[0]) options.push(grid[index(i, j - 1)]);
    if (!this.walls[1]) options.push(grid[index(i + 1, j)]);
    if (!this.walls[2]) options.push(grid[index(i, j + 1)]);
    if (!this.walls[3]) options.push(grid[index(i - 1, j)]);
    return options;
  }

  // Are there any available neighbors still? (DFS)
  this.checkNeighbors = function() {
    var neighbors = [];

    var top = grid[index(i, j - 1)];
    var right = grid[index(i + 1, j)];
    var bottom = grid[index(i, j + 1)];
    var left = grid[index(i - 1, j)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  }

  // Draw the cell
  this.show = function() {
    stroke(255);
    strokeWeight(1);
    var x = this.i * w;
    var y = this.j * w;
    stroke(255);
    if (this.walls[0]) {
      line(x, y, x + w, y);
    }
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w);
    }
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w);
    }
    if (this.walls[3]) {
      line(x, y + w, x, y);
    }
  }
}
