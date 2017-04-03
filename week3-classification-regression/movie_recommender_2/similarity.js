// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Data set and code based on
// https://github.com/arthur-e/Programming-Collective-Intelligence/blob/master/chapter2/recommendations.py

// This finds the "euclidean distance" between two people
// It's the same as dist(x1,y1,x2,y2)
// The difference here is that the coordinates are "movie ratings"
// and the dimensions are greater than 2
// Function receives two people
function euclidean(person1, person2) {
  // Ratings of person 1 and 2
  var ratings1 = ratings[person1];
  var ratings2 = ratings[person2];

  // Need to add up all the differences
  var sum = 0;

  // All the movies rated by person 1
  var movies = Object.keys(ratings1);
  // For every movie
  for (var i = 0; i < movies.length; i++) {
    var movie = movies[i];
    // As long as both rated the movie
    if (ratings2[movie] !== undefined) {
      var rating1 = ratings1[movie];
      var rating2 = ratings2[movie];
      // Difference between the ratings
      var diff = rating1 - rating2;
      // Square it
      sum += diff * diff;
    }
  }

  // This maps the distance to 0 and 1
  // Higher score is more similar
  return 1 / (1 + sqrt(sum));
}

// This is a special kind of similarity check.
// It accounts for the fact that some reviewers might tend
// to give higher scores than others.
// It's called the "Pearson correlation coefficient"

// https://en.wikipedia.org/wiki/Pearson_correlation_coefficient

function pearson(person1, person2) {
  // Ratings of person 1 and 2
  var ratings1 = ratings[person1];
  var ratings2 = ratings[person2];
  // All the movies rated by person 1
  var movies = Object.keys(ratings1);

  // We'll be calculating something called standard deviation
  // So need the sum of all ratings and sum of all ratings squared
  // And sum of rating1 * rating2
  var sum1 = 0;
  var sum2 = 0;
  var sum1sq = 0;
  var sum2sq = 0;
  var pSum = 0;

  // Need to count how many movies we're looking at
  var n = 0;
  for (var i = 0; i < movies.length; i++) {
    var movie = movies[i];
    // As long as person 1 and 2 both rated the movie
    if (ratings2[movie] !== undefined) {
      // Both ratings
      var rating1 = ratings1[movie];
      var rating2 = ratings2[movie];
      // Sum all the ratings
      sum1 += rating1;
      sum2 += rating2;
      // Sum all the ratings squared
      sum1sq += (rating1 * rating1);
      sum2sq += (rating2 * rating2);
      // Sum the product of the ratings
      pSum += (rating1 * rating2);
      n++;
    }
  }

  // If there were no ratings then return 0
  if (n == 0) {
    return 0;
  }

  // Pearson Correlation Coefficient formula
  var num = pSum - (sum1 * sum2 / n);
  var den = sqrt((sum1sq - sum1 * sum1 / n) * (sum2sq - sum2 * sum2 / n));
  if (den == 0) {
    return 0;
  }
  return num / den;
}
