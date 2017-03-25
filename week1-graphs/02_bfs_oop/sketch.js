// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Based on
// Grokking Algorithms
// http://amzn.to/2n7KF4h

// Now everything is stord in Objects
// Here is a graph object
var graph;

function setup() {
  createCanvas(400, 400);
  // Create a new graph
  graph = new Graph();

  // Add a bunch of nodes
  var you = graph.addNode('you');
  var bob = graph.addNode('bob');
  var alice = graph.addNode('alice');
  var claire = graph.addNode('claire');
  var anuj = graph.addNode('anuj');
  var peggy = graph.addNode('peggy');
  var thom = graph.addNode('thom');
  var jonny = graph.addNode('jonny');

  // Add node connections
  you.connect(alice, bob, claire);
  bob.connect(anuj, peggy);
  alice.connect(peggy);
  claire.connect(thom, jonny);

  // Set the start and end
  graph.setStart(you);
  graph.setEnd(thom);

  // Draw the graph
  background(51);
  graph.show();

  // Run the search algorithm
  bfs();
}


function bfs() {

  // Create a queue ad path
  var queue = [];
  var path = [];
  // Get started
  queue.push(graph.start);
  while (queue.length > 0) {
    var person = queue.shift();
    // If not already checked
    if (!person.searched) {
      // If we're done!
      if (person == graph.end) {
        // Figure out the path by going backwards through parent nodes
        path.push(person);
        var next = person.parent;
        while (next) {
          path.push(next);
          next = next.parent;
        }
        // Print out the path
        console.log(path);
        break;
      } else {
        // Look at node's neighbors
        var next = person.edges;
        for (var i = 0; i < next.length; i++) {
          // Place them all in the queue and update parent
          var neighbor = next[i];
          queue.push(neighbor);
          neighbor.parent = person;
        }
        // Mark that node as searched
        person.searched = true;
      }
    }
  }

  for (var i = 0; i < path.length; i++) {
    path[i].highlight();
  }


}
