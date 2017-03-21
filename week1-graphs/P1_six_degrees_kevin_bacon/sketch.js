// Based on
// Grokking Algorithms
// http://amzn.to/2n7KF4h

var data;

var graph;
var actors;
var actorlist;

function preload() {
  data = loadJSON('bacon.json');
}

function setup() {
  noCanvas();
  graph = new Graph();
  actors = {};

  var movies = data.movies;
  for (var i = 0; i < movies.length; i++) {
    var movie = movies[i].title;
    var cast = movies[i].cast;
    var movieNode = graph.addNode(movie);
    for (var j = 0; j < cast.length; j++) {
      var name = cast[j];
      var actorNode;
      if (actors[name]) {
        actorNode = actors[name];
      } else {
        actorNode = graph.addNode(name);
        actors[name] = actorNode;
      }
      movieNode.connect(actorNode);
    }
  }

  // var actorlist = select('#actorlist');
  // console.log(actorlist);
  // actorlist.option('test');

  actorlist = createSelect();
  actorlist.parent('actorlist');
  var allactors = Object.keys(actors);
  for (var i = 0; i < allactors.length; i++) {
    actorlist.option(allactors[i]);
  }
  actorlist.changed(findbacon);
}

function findbacon() {
  // Clear everyone from having been searched
  graph.clear();
  var start = actors[actorlist.value()];
  var end = actors['Kevin Bacon'];
  graph.setStart(start);
  graph.setEnd(end);
  bfs();
}



function bfs() {
  var queue = [];
  var path = [];
  queue.push(graph.start);

  while (queue.length > 0) {
    var node = queue.shift();
    if (node == graph.end) {
      path.push(node);
      var next = node.parent;
      while (next) {
        path.push(next);
        next = next.parent;
      }
      break;
    } else {
      var next = node.edges;
      for (var i = 0; i < next.length; i++) {
        var neighbor = next[i];
        if (!neighbor.searched) {
          queue.push(neighbor);
          neighbor.parent = node;
        }
      }
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
