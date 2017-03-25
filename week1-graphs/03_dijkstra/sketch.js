// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Based on
// Grokking Algorithms
// http://amzn.to/2n7KF4h

// Each node in the graph contains a list of pairs in the form:
// target node: cost to go to that node from self
var graph = {
  'start': {
    'a': 6,
    'b': 2
  },
  'a': {
    'fin': 1
  },
  'b': {
    'a': 3,
    'fin': 5
  },
  'fin': {}
}

// The variable costs stores the costs between the start node and any other node
// It is updated when the algorithm is executed.
// All the nodes have to be enlisted here with their costs from start
// For the unknown costs, Infinity is the initial value
var costs = {
  'a': 6,
  'b': 2,
  'fin': Infinity
};

// This variable stores the parents nodes (or "previous" nodes)
// for every node in the path
// It has to be initialized with the nodes that have "start" as a parent
// The other nodes will be added by the algorithm
var parents = {
  'a': 'start',
  'b': 'start'
};

// Keep track of already processed nodes
var processed = {};

// Find the node with the lowest cost that is not processed
function lowestCost(costs) {
  var record = Infinity;
  var lowest;
  // This is like a "foreach" loop
  for (node in costs) {
    if (costs[node] < record && !processed[node]) {
      record = costs[node];
      lowest = node;
    }
  }
  return lowest;
}


function setup() {
  noCanvas();

  // Start and end
  var start = 'start';
  var end = 'fin';

  // What's the lowest cost
  var node = lowestCost(costs);

  // As long as I still haves somewhere to go
  while (node != undefined) {
    // What's the cost?
    var cost = costs[node];
    // What are the neighbors?
    var neighbors = graph[node];
    // Update costs for all neighbors
    for (n in neighbors) {
      var newcost = cost + neighbors[n];
      // Is the new cost less?
      if (costs[n] > newcost) {
        costs[n] = newcost;
        parents[n] = node;
      }
    }
    // It's processed
    processed[node] = true;
    // Keep going
    node = lowestCost(costs);
  }

  console.log(graph);
  console.log(costs);
  console.log(parents);
  console.log(processed);

  // Put together a path
  var path = [end];
  var next = parents[end];
  while (next) {
    path.push(next);
    next = parents[next];
  }
  console.log(path);

}
