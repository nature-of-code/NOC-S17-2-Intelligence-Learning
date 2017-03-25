// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// The data
var data;

// The graph
var graph;
// A lookup table for actors
// (redundant, the graph could handle this)
var actors;
// Dropdown menu for actors
var actorlist;

function preload() {
  data = loadJSON('bacon.json');
}

function setup() {
  noCanvas();
  // Create the graph
  graph = new Graph();
  // A separate lookup table for actors
  actors = {};

  // For all movies
  var movies = data.movies;
  for (var i = 0; i < movies.length; i++) {
    // Title and castlist
    var movie = movies[i].title;
    var cast = movies[i].cast;
    // Add the movie to the graph
    var movieNode = graph.addNode(movie);
    // Go through all the cast list
    for (var j = 0; j < cast.length; j++) {
      var name = cast[j];
      var actorNode;
      // Does the actor exist already?
      if (actors[name]) {
        actorNode = actors[name];
      // If not add a new node
      } else {
        actorNode = graph.addNode(name);
        actors[name] = actorNode;
      }
      // Connect movie and actor
      movieNode.connect(actorNode);
    }
  }

  // Create dropdown
  actorlist = createSelect();
  actorlist.parent('actorlist');
  var allactors = Object.keys(actors);
  // Add all the actors
  for (var i = 0; i < allactors.length; i++) {
    actorlist.option(allactors[i]);
  }
  // Set up an event
  actorlist.changed(findbacon);
}

function findbacon() {
  // Clear everyone from having been searched
  graph.clear();
  // Start and end
  var start = actors[actorlist.value()];
  var end = actors['Kevin Bacon'];
  graph.setStart(start);
  graph.setEnd(end);
  // Run the search!
  bfs();
}

function bfs() {
  // Create a queue ad path
  var queue = [];
  var path = [];

  // Get started
  queue.push(graph.start);

  while (queue.length > 0) {
    var node = queue.shift();
    // Are we done?
    if (node == graph.end) {
      // Figure out the path
      path.push(node);
      var next = node.parent;
      while (next) {
        path.push(next);
        next = next.parent;
      }
      break;
    } else {
      // Check all neighbors
      var next = node.edges;
      for (var i = 0; i < next.length; i++) {
        var neighbor = next[i];
        // Any neighbor not already searched add to queue
        if (!neighbor.searched) {
          queue.push(neighbor);
          // Updat the parent
          neighbor.parent = node;
        }
      }
      // Mark node as searched
      node.searched = true;
    }
  }

  console.log('-------finished-----')
  var result = '';
  for (var i = path.length-1; i >= 0; i--) {
    result += path[i].label;
    if (i != 0) {
      result += ' → ';
    }
    console.log(path[i].label);
  }
  createP(result);


}
