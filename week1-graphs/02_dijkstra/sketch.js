// Based on
// Grokking Algorithms
// http://amzn.to/2n7KF4h

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

var costs = {
  'a': 6,
  'b': 2,
  'fin': Infinity
};
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
