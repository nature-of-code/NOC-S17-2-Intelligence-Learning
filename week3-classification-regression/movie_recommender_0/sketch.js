// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Data set and code based on
// https://github.com/arthur-e/Programming-Collective-Intelligence/blob/master/chapter2/recommendations.py

// All the data from the JSON file
var data;
// Movie ratings by person
var ratings;

// Preload all the data
function preload() {
  data = loadJSON('ratings.json');
}

function setup() {
  noCanvas();

  // Get the bits out of the data we want
  ratings = data.ratings;

  // This is really what we are doing in this example
  // Euclidean distance and Pearson Coefficent
  console.log(euclidean('Lisa Rose', 'Toby'));
  console.log(pearson('Lisa Rose', 'Toby'));
  // Sorting all by similarity
  console.log(similarityList('Toby', euclidean));


  // Down here all of this is just to make an interface for a user
  // To do this in a webpage

  // make two dropdowns and a button
  var person1 = createSelect().parent('#similarity');
  var person2 = createSelect().parent('#similarity');
  var simButton = createButton('similarity score').parent('#similarity');

  // All the people are options in the drop down
  var people = Object.keys(ratings);
  for (var i = 0; i < people.length; i++) {
    person1.option(people[i]);
    person2.option(people[i]);
  }
  // Calculate similiarity scores when you click the button
  simButton.mousePressed(function() {
    var simE = euclidean(person1.value(), person2.value());
    var simP = pearson(person1.value(), person2.value());
    var results = select('#sresults');
    results.html('Euclidean: ' + nf(simE, 1, 2) + '  Pearson: ' + nf(simP, 1, 2));
  });

  // Another dropdown for all matches
  var person3 = createSelect().parent('#matches');
  for (var i = 0; i < people.length; i++) {
    person3.option(people[i]);
  }

  // A button to list all the matches
  var matchButton = createButton('get matches').parent('#matches');
  matchButton.mousePressed(function() {
    // Hardcoding in Euclidean distance
    // Could make this an interface option to try Pearson instead
    var scores = similarityList(person3.value(), euclidean);
    var results = select('#mresults').html('');
    for (var i = 0; i < scores.length; i++) {
      var div = createDiv(scores[i].name + ': ' + nf(scores[i].score, 1, 2));
      div.parent(results);
    }
  });

}

// A function to rank all other people by similarity
function similarityList(person, similarity) {
  // Here is everyone
  var people = Object.keys(ratings);
  // An array to store all similarity scores
  var scores = [];
  for (var i = 0; i < people.length; i++) {
    var other = people[i];
    // Don't compare yourself
    if (other != person) {
      // Get the score
      var sim = similarity(person, other);
      // Add to array
      scores.push({
        name: other,
        score: sim
      });
    }
  }
  // Sort by score
  scores.sort(byScore);

  function byScore(a, b) {
    return b.score - a.score;
  }
  // Send it back
  return scores;
}
