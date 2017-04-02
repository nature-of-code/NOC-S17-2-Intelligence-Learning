// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Data set and code based on
// https://github.com/arthur-e/Programming-Collective-Intelligence/blob/master/chapter2/recommendations.py

var data;
var ratings;
var allMovies;

function preload() {
  data = loadJSON('ratings.json');
}

function setup() {
  noCanvas();
  ratings = data.ratings;
  allMovies = data.movies;

  var dropdowns = [];
  for (var i = 0; i < allMovies.length; i++) {
    var div = createDiv(allMovies[i] + ' ');
    div.style('padding','4px 0px');
    div.parent('#interface');
    var dropdown = createSelect();
    dropdown.option('not seen');
    for (var stars = 1; stars < 6; stars++) {
      dropdown.option(stars);
    }
    dropdown.parent(div);
    dropdown.movie = allMovies[i];
    dropdowns.push(dropdown);
  }


  var submit = createButton('submit');
  submit.parent('#interface');
  submit.style('margin','4px 0px');
  submit.style('padding','4px');
  submit.mousePressed(function() {
    var user = {};
    for (var i = 0; i < dropdowns.length; i++) {
      var value = dropdowns[i].value();
      if (value != 'not seen') {
        var movie = dropdowns[i].movie;
        user[movie] = Number(value);
      }
    }
    ratings['user'] = user;
    getRecommendations('user', euclidean);
  });



  //console.log(ratings);
  //console.log(similarity('Lisa Rose', 'Gene Seymour'));
  //console.log(pearson('Lisa Rose', 'Gene Seymour'));
  //topMatches('Toby');
  //getRecommendations('Toby');
}

function getRecommendations(person, similarity) {
  var recommendations = {};
  var people = Object.keys(ratings);
  for (var i = 0; i < people.length; i++) {
    var other = people[i];
    if (other != person) {
      var sim = similarity(person, other);
      if (sim <= 0) continue;
      var movies = Object.keys(ratings[other]);
      for (var j = 0; j < movies.length; j++) {
        var movie = movies[j];
        if (!ratings[person][movie]) {
          if (recommendations[movie] == undefined) {
            recommendations[movie] = {
              total: 0,
              simSum: 0,
              ranking: 0
            }
          }
          recommendations[movie].total += ratings[other][movie] * sim;
          recommendations[movie].simSum += sim;
        }
      }
    }
  }
  var movies = Object.keys(recommendations);
  for (var i = 0; i < movies.length; i++) {
    var movie = movies[i];
    recommendations[movie].ranking = recommendations[movie].total / recommendations[movie].simSum;
  }

  movies.sort(byRanking);
  function byRanking(a, b) {
    return recommendations[b].ranking - recommendations[a].ranking;
  }

  for (var i = 0; i < movies.length; i++) {
    var movie = movies[i];
    var stars = recommendations[movie].ranking;
    var rec = createP(movie + ' ' + nf(stars,1,1) + '⭐');
    rec.parent('#results');
  }
}


function topMatches(person, n) {
  var people = Object.keys(ratings);
  var scores = [];
  for (var i = 0; i < people.length; i++) {
    var other = people[i];
    if (other != person) {
      var sim = pearson(person, other);
      scores.push({
        name: other,
        score: sim
      });
    }
  }
  scores.sort(byScore);
  function byScore(a, b) {
    return b.score - a.score;
  }
}
