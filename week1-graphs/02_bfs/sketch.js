// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Based on
// Grokking Algorithms
// http://amzn.to/2n7KF4h

// A graph using only strings
var graph = {
  'you': ['alice', 'bob', 'claire'],
  'bob': ['anuj', 'peggy'],
  'alice': ['peggy'],
  'claire': ['thom', 'jonny'],
  'anuj': [],
  'peggy': [],
  'thom': [],
  'jonny': []
}

// Objects to track parents and searched
var parents = {};
var searched = {};

// Just a plain array for th queue
var queue = [];

// Trying to find shortest route to peggy
function isEnd(person) {
  return (person === 'peggy');
}

function setup() {
  noCanvas();

  // BFS algorithm

  // Start with this node
  queue.push('you');

  // While there are still nodes to search
  while (queue.length > 0) {

    // Look at the next node
    var person = queue.shift();

    console.log(person);

    // If not already checked
    if (!searched[person]) {
      // If we're done!
      if (isEnd(person)) {
        // Figure out the path by going backwards through parent nodes
        var path = [person];
        var next = parents[person];
        while (next) {
          path.push(next);
          next = parents[next];
        }
        // Print out the path
        console.log(path);
        break;
      } else {
        // Look at node's neighbors
        var next = graph[person];
        for (var i = 0; i < next.length; i++) {
          // Place them all in the queue and update parent
          var neighbor = next[i];
          queue.push(neighbor);
          parents[neighbor] = person;
        }
        // Mark that node as searched
        searched[person] = true;
      }
    }
  }
}
