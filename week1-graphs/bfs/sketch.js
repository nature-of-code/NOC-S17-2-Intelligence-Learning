// Based on
// Grokking Algorithms
// http://amzn.to/2n7KF4h

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

var parents = {};
var searched = {};

var queue = [];

function isEnd(person) {
  return (person === 'peggy');
}

function setup() {
  noCanvas();

  queue.push('you');
  while (queue.length > 0) {
    var person = queue.pop();
    console.log(person);
    if (!searched[person]) {
      if (isEnd(person)) {
				var path = [person];
				var next = parents[person];
				while (next) {
					path.push(next);
					next = parents[next];
				}
				console.log(path);
        break;
      } else {
				var next = graph[person];
				for (var i = 0; i < next.length; i++) {
					var neighbor = next[i];
					queue.push(neighbor);
					parents[neighbor] = person;
				}
				searched[person] = true;
      }
    }
  }
}
