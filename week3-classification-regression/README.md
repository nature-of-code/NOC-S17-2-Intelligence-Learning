## What is a "Machine Learning"? (From [Andrew Ng's Coursera Course](https://www.coursera.org/learn/machine-learning))
* "Field of study that gives computers the ability to learn without being explicitly programmed." -- Arthur Samuels (1959). [Self-learning and checkers](https://en.wikipedia.org/wiki/Arthur_Samuel#Computer_checkers_.28draughts.29_development).
* "A computer program is said to learn from experience E with respect to some class of tasks T and performance measure P, if its performance at tasks in T, as measured by P, improves with experience E." -- Tom Mitchell (1998): [Maching Learning book](http://amzn.to/2nLdRgQ).
  * Example: classifying images of dogs and cats.
    * E = Watching you classify images as dogs or cats.
    * T = Classifying images as dogs or cats.
    * P = The % of images correctly classified.

## Supervised Learning
* From Andrew Ng: "In supervised learning, we are given a data set and already know what our correct output should look like, having the idea that there is a relationship between the input and the output."
* Adapted from [Nature of Code Chapter 10](http://natureofcode.com/book/chapter-10-neural-networks/): Supervised Learning is a strategy that involves a "teacher" that trains the learning system. For example, consider facial recognition. The "teacher" shows the network a bunch of faces (the teacher already knows the names associated with each face). The learning system makes its guesses and the teacher provides the answers. The learning system can then compare its answers to the known “correct” ones and make adjustments according to its errors.

## Classification and Regression
* Classification and regression both involve making a "prediction" based on input data.
* Classification refers to predicting an output with a discrete set of possibilities like a set of categories or labels. For example: "Given an input image, is it a dog or cat?"
* Regression refers to predicting an "continuous" output (a fancy way of saying number). For example: "Given the number of bedrooms, what is the price of a house?" or "Given an input image of a cat, how much does the cat weigh?"

## Terminology
* [Euclidean distance](https://github.com/shiffman/NOC-S17-2-Intelligence-Learning/wiki/Glossary:-Mathematics#euclidean-distance)
* [Covariance](https://github.com/shiffman/NOC-S17-2-Intelligence-Learning/wiki/Glossary:-Statistics#covariance)
* [Pearson Correlation coefficient](https://github.com/shiffman/NOC-S17-2-Intelligence-Learning/wiki/Glossary:-Statistics#correlation)
* [Training set](https://github.com/shiffman/NOC-S17-2-Intelligence-Learning/wiki/Glossary:-Machine-Learning#training-set)
* [Learning algorithm](https://github.com/shiffman/NOC-S17-2-Intelligence-Learning/wiki/Glossary:-Machine-Learning#algorithms)
* [Model](https://github.com/shiffman/NOC-S17-2-Intelligence-Learning/wiki/Glossary:-Machine-Learning#models)
* [Cost function](https://github.com/shiffman/NOC-S17-2-Intelligence-Learning/wiki/Glossary:-Machine-Learning#loss-function)

## Some key JavaScript techniques for this week
* Objects as dictionaries (aka Hash Tables, aka Associate Arrays)
* How to sort an array.
* How to pass a function into a function.
* Anonymous Functions
* Chaining

## KNN
* "K-Nearest Neighbor" is a machine learning algorithm used for both classification and regression. It is a "lazy learning" algorithm due to the fact that there is really is no learning at all. New data points are classified / valued according to a distance comparison with every data point in a training set.
* Classification of a new data point is calculate according to the class of the majority of its nearest K neighbors. Its nearest K neighbors are determined by a similarity function (my examples use Euclidean distance, see above.)
* In the case of regression, a new data point is assigned a value according the average of the values of its K nearest neighbors.
* It can be advantageous to normalize all data (between say a range of 0 and 1) so that a particular feature with a large range doesn't skew the distance calculations.
* It can also be advantageous to assign a weight to the classification or value of each neighbor according to its distance.
* [Chapters 1,2,8 of Collective Intelligence](https://getit.library.nyu.edu/go/9421232) (available via NYU Library)
* [Rebecca Fiebrink's Machine Learning for Musicians and Artists Session 1](https://www.kadenze.com/courses/machine-learning-for-musicians-and-artists-v/sessions/classification-part-i)
* [KNN Python from scratch Tutorial](http://machinelearningmastery.com/tutorial-to-implement-k-nearest-neighbors-in-python-from-scratch/)
* [KNN Wikipedia](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm)
* [KNN in Python with scikit Learn](http://scikit-learn.org/stable/modules/neighbors.html)

## Linear Regression with Gradient Descent
* Linear Regression, a machine learning technique borrowed from statistics, refers to the process of fitting a linear equation (`y = mx + b`) to a set of training data (`x` being the input, `y` the output). Predictions can be made for new input data by feeding `x` into the equation and solving for `y`.
* Multiple Linear Regression refers to the scenario where there are multiple input variables, typically listed as `x0`, `x1`, `x2`, and so on. In this case the equation to solve for is: `y = m0x0 + m1x1 + m2x2 + b`.
* Polynomial Regression refers to the process of fitting a polynomial equation to the data. This is useful when there is not a linear (straight line) relationship between x and y. An example of a polynomial equation (of order 3) is `y = a * x^3 + b * x^2 + c * x + d`. There is also exponential, power law, logarithmic and more types of regression!
* While most regression problems can be solved using statistics, for example with a method known as "ordinary least squares", in the case or large data sets with many input variables, the equation cannot easily be estimated in one fell swoop. This is where the machine learning technique known as "gradient descent" comes in. Gradient descent is an algorithmic process which adjusts the parameters of a model according to errors to minimize errors. Performed iteratively overtime, a linear or polynomial regression equation can be estimated. This technique will serve as a fundamental piece of building a neural network simulation and so while it is unnecessary in the simple linear regression examples for this week, it's the perfect place to learn and practice the algorithm.
* [Rebecca Fiebrink's Machine Learning for Musicians and Artists Session 2](https://www.kadenze.com/courses/machine-learning-for-musicians-and-artists-v/sessions/regression)
* [Chapter 3 of An Introduction to Statistical Learning (ISL)](http://www-bcf.usc.edu/~gareth/ISL/)
* [Linear Regression with Gradient Descent video tutorial from Siraj](https://www.youtube.com/watch?v=XdM6ER7zTLk)
* [Week 1 of Andrew Ng's Machine Learning Coursera course](https://www.coursera.org/learn/machine-learning/home/week/1)
* [Tom Alexander's JS Regression Library](https://github.com/Tom-Alexander/regression-js)
* A video [tutorial](https://www.youtube.com/watch?v=HJRWhgyjoNo&t=608s) of the math and implementation by Jyo Pari
