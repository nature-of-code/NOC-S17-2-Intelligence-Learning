// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

function euclidean(person1, person2) {
  var shared = [];
  var ratings1 = ratings[person1];
  var ratings2 = ratings[person2];
  var movies = Object.keys(ratings1);
  var sum = 0;
  for (var i = 0; i < movies.length; i++) {
    var movie = movies[i];
    if (ratings2[movie] !== undefined) {
      var rating1 = ratings1[movie];
      var rating2 = ratings2[movie];
      var diff = rating1 - rating2;
      sum += diff * diff;
    }
  }
  return 1 / (1 + sqrt(sum));
}

function pearson(person1, person2) {
  var shared = [];
  var ratings1 = ratings[person1];
  var ratings2 = ratings[person2];
  var movies = Object.keys(ratings1);
  var sum1 = 0;
  var sum2 = 0;
  var sum1sq = 0;
  var sum2sq = 0;
  var pSum = 0;

  var n = 0;
  for (var i = 0; i < movies.length; i++) {
    var movie = movies[i];
    if (ratings2[movie] !== undefined) {
      var rating1 = ratings1[movie];
      var rating2 = ratings2[movie];
      sum1 += rating1;
      sum2 += rating2;
      sum1sq += (rating1 * rating1);
      sum2sq += (rating2 * rating2);
      pSum += (rating1 * rating2);
      n++;
    }
  }
  if (n == 0) {
    return 0;
  }

  var num = pSum - (sum1 * sum2 / n);
  var den = sqrt((sum1sq - sum1 * sum1 / n) * (sum2sq - sum2 * sum2 / n));
  if (den == 0) {
    return 0;
  }
  return num / den;
}
