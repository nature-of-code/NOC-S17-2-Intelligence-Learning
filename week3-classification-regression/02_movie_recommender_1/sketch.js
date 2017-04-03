// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Data set and code based on
// https://github.com/arthur-e/Programming-Collective-Intelligence/blob/master/chapter2/recommendations.py

// All the data from the JSON file
var data;
// Movie ratings by person
var ratings;
// A list of all the movies
var allMovies;

// Preload all the data
function preload() {
  data = loadJSON('ratings.json');
}

function setup() {
  noCanvas();

  // Get the bits out of the data we want
  ratings = data.ratings;
  allMovies = data.movies;

  // This generates an interface for a user to rate some movies
  var dropdowns = [];
  for (var i = 0; i < allMovies.length; i++) {
    // Make a DIV for each movie
    var div = createDiv(allMovies[i] + ' ');
    div.style('padding','4px 0px');
    div.parent('#interface');
    // Create a dropdown menu for each movie
    var dropdown = createSelect();
    dropdown.option('not seen');
    // 1 to 5 stars
    for (var stars = 1; stars < 6; stars++) {
      dropdown.option(stars);
    }
    dropdown.parent(div);
    // Connect the dropdown with the movie title
    dropdown.movie = allMovies[i];
    dropdowns.push(dropdown);
  }


  // This is a submit button
  var submit = createButton('submit');
  submit.parent('#interface');
  submit.style('margin','4px 0px');
  submit.style('padding','4px');

  // When the button is clicked
  submit.mousePressed(function() {
    // Make a new user
    var user = {};
    // Attach all the ratings
    for (var i = 0; i < dropdowns.length; i++) {
      var value = dropdowns[i].value();
      if (value != 'not seen') {
        var movie = dropdowns[i].movie;
        // Make sure they are numbers!
        user[movie] = Number(value);
      }
    }
    // Put it in the data
    ratings['user'] = user;
    // Call the get Recommendations function!
    // We can use either "euclidean" distance or "pearson" score
    getRecommendations('user', euclidean);
  });
}

// A function to get recommendations
function getRecommendations(person, similarity) {

  // Clear the div
  select("#results").html('');

  // This will be the object to store recommendations
  var recommendations = {};

  // Let's get all the people in the database
  var people = Object.keys(ratings);

  // For every person
  for (var i = 0; i < people.length; i++) {
    var other = people[i];

    // Don't use yourself for a recommendation!
    if (other != person) {
      // Get the similarity score
      var sim = similarity(person, other);
      // If it's 0 or less ignore!
      if (sim <= 0) continue;
      // What movies did the other person rate?
      var movies = Object.keys(ratings[other]);
      for (var j = 0; j < movies.length; j++) {
        var movie = movies[j];
        // As long as I have not already rated the movie!
        if (!ratings[person][movie]) {
          // Have we not seen this movie before with someone else?
          if (recommendations[movie] == undefined) {
            recommendations[movie] = {
              total: 0,
              simSum: 0,
              ranking: 0
            }
          }
          // Add up the other persons rating weighted by similarity
          recommendations[movie].total += ratings[other][movie] * sim;
          // Add up all similarity scores
          recommendations[movie].simSum += sim;
        }
      }
    }
  }

  // Ok, now we can calculate the estimated star rating for each movie
  var movies = Object.keys(recommendations);
  for (var i = 0; i < movies.length; i++) {
    var movie = movies[i];
    // Total score divided by total similarity score
    recommendations[movie].ranking = recommendations[movie].total / recommendations[movie].simSum;
  }

  // Sore movies by ranking
  movies.sort(byRanking);
  function byRanking(a, b) {
    return recommendations[b].ranking - recommendations[a].ranking;
  }

  // Display everything in sorted order
  for (var i = 0; i < movies.length; i++) {
    var movie = movies[i];
    var stars = recommendations[movie].ranking;
    var rec = createP(movie + ' ' + nf(stars,1,1) + '⭐');
    rec.parent('#results');
  }
}
