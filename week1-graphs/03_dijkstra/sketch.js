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

var processed = {};

function lowestCost(costs) {
  var record = Infinity;
  var lowest;
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

  var start = 'start';
  var end = 'fin';

  var node = lowestCost(costs);

  while (node != undefined) {
    var cost = costs[node];
    var neighbors = graph[node];
    for (n in neighbors) {
      var newcost = cost + neighbors[n];
      if (costs[n] > newcost) {
        costs[n] = newcost;
        parents[n] = node;
      }
    }
    processed[node] = true;
    node = lowestCost(costs);
  }

  console.log(graph);
  console.log(costs);
  console.log(parents);
  console.log(processed);

  var path = [end];
  var next = parents[end];
  while (next) {
    path.push(next);
    next = parents[next];
  }
  console.log(path);

}
