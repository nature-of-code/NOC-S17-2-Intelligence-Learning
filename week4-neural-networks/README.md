# Neural Networks

## p5.js examples
* [Simple Perceptron ](https://github.com/shiffman/The-Nature-of-Code-Examples-p5.js/tree/master/chp10_nn/NOC_10_01_Perceptron)
* [Fully Connected Neural Network (one hidden layer) learning MNIST digits](https://github.com/shiffman/Neural-Network-p5)
* [Animated Network Visualization](https://github.com/shiffman/The-Nature-of-Code-Examples-p5.js/tree/master/chp10_nn/NOC_10_04_NetworkAnimation)

## Additional Processing examples
* [Nature of Code Chapter 10 Processing examples](https://github.com/shiffman/The-Nature-of-Code-Examples/tree/master/chp10_nn)
* [Charles Fried's Neural Network in Processing](https://github.com/CharlesFr/ANN_Tutorial)
* [Another Processing Example](https://github.com/ANyanCatFan/SimpleNN)

## Python examples
* [Make Your Own Neural Network ](https://github.com/makeyourownneuralnetwork/makeyourownneuralnetwork/) from Tariq Rashid
* [Abishek's Tensorflow Example](https://github.com/shekit/machine-learning-demystified/blob/master/week2/NeuralNet.ipynb)
* [How to freeze a model and serve it with a python API](https://blog.metaflow.fr/tensorflow-how-to-freeze-a-model-and-serve-it-with-a-python-api-d4f3596b3adc)

## History
This short list thanks to Andrey Kurenkov's excellent ['Brief' History of Neural Nets and Deep Learning](http://www.andreykurenkov.com/writing/a-brief-history-of-neural-nets-and-deep-learning/)
* In 1943, Warren S. McCulloch, a neuroscientist, and Walter Pitts, a logician, developed the first conceptual model of an artificial neural network. In their paper, "[A logical calculus of the ideas immanent in nervous activity](https://pdfs.semanticscholar.org/5272/8a99829792c3272043842455f3a110e841b1.pdf),” they describe the concept of a neuron, a single cell living in a network of cells that receives inputs, processes those inputs, and generates an output.
* Hebb's Rule from [The Organization of Behavior: A Neuropsychological Theory](https://alexa.design/2nyUyJi): "When an axon of cell A is near enough to excite a cell B and repeatedly or persistently takes part in firing it, some growth process or metabolic change takes place in one or both cells such that A's efficiency, as one of the cells firing B, is increased."
* Invented in 1957 by Frank Rosenblatt at the Cornell Aeronautical Laboratory ([original paper](http://www.ling.upenn.edu/courses/cogs501/Rosenblatt1958.pdf)), a perceptron is the simplest neural network possible: a computational model of a single neuron. A perceptron consists of one or more inputs, a processor, and a single output.
* In 1969, in their book [Perceptrons](https://mitpress.mit.edu/books/perceptrons) Marvin Minksy and Seymour Papert demonstrate the limitations of perceptrons to solve only "linearly separable" problems.  AI Winter #1!
* Paul Werbos's 1974 thesis [Beyond Regression: New Tools for Prediction and Analysis in the Behavioral Sciences](https://books.google.com/books/about/Beyond_Regression.html?id=z81XmgEACAAJ) proposes "backpropagation" as a solution to adjusting weights in the hidden layers of a neural network. The technique was popularized in the 1986 paper [Learning representations by back-propagating errors](http://www.iro.umontreal.ca/~vincentp/ift3395/lectures/backprop_old.pdf) by David Rumelhart, Geoffrey Hinton, and Ronald Williams
* Neural Networks come back with Yann LeCunn's paper [Backpropagation Applied to Handwritten Zip Code Recognition](http://yann.lecun.com/exdb/publis/pdf/lecun-89e.pdf). Here's a [1993 video on convolutional neural networks](https://youtu.be/FwFduRA_L6Q). But AI Winter returns again with the "[vanishing gradient problem](https://en.wikipedia.org/wiki/Vanishing_gradient_problem)."
* "Deep Learning" thaws the wintr with new methodologies for training: [A fast learning algorithm for deep belief nets ](https://www.cs.toronto.edu/~hinton/absps/fastnc.pdf) by Hinton, Osindero, Teh and raw power with GPUs: [Large-scale Deep Unsupervised Learning using Graphics Processors](http://www.machinelearning.org/archive/icml2009/papers/218.pdf)

## Online Reading
* [Neural Networks (Nature of Code Chapter 10)](http://natureofcode.com/book/chapter-10-neural-networks/)
* [A Quick Introduction to Neural Networks](https://ujjwalkarn.me/2016/08/09/quick-intro-neural-networks/) by Ujjwal Karn
* [Let’s code a Neural Network from scratch](https://medium.com/typeme/lets-code-a-neural-network-from-scratch-part-1-24f0a30d7d62) by Charles Fried
* [Rolf van Gelder's Neural Network in Processing](http://cagewebdev.com/wp-content/uploads/2017/01/Neural-Networks-for-Dummies.pdf)
* [Linear Algebra Cheatsheet](https://medium.com/towards-data-science/linear-algebra-cheat-sheet-for-deep-learning-cd67aba4526c) by Brendan Fortuner
* [A Step by Step Backpropagation Example](https://mattmazur.com/2015/03/17/a-step-by-step-backpropagation-example/) by Matt Mazur
* [A 'Brief' History of Neural Nets and Deep Learning](http://www.andreykurenkov.com/writing/a-brief-history-of-neural-nets-and-deep-learning/) by Andrey Kurenkov

## Additional Reading
* [Make Your Own Neural Network](http://amzn.to/2pgOaT9) by Tariq Rashid
* [Chapter 22 of The Computational Beauty of Nature](http://amzn.to/2oUYCjT) by Gary Flake

## Linear Algebra Review
* Vectors vs. Matrices
* "Elementwise" operations
* Matrix multiplication
* Transpose
* inputs and outputs
* weights

## Terminology
* complex adaptive system
* perceptron
* activation function
* weight
* multi-layered perceptron
* input layer, hidden layer, output layer
* back-propagation
* sigmoid
* gradient descent
* epoch
* deep learning

## Exercise ideas
* Redo the three layer network example using an existing matrix library like [math.js](http://mathjs.org/).
* Instead of using the supervised learning for any of the above examples, can you train a neural network to find the right weights by using a genetic algorithm?
* Visualize a neural network itself. You could start with just the simple perceptron or just go for drawing all the layers of the MNIST training example. How can you show the flow of information using color, geometry, etc.?
* Add a feature that allows the MNIST example to save and reload a model.
* Add a feature that allows users to add digits to the training or test set.
* Try the 3 layer network with your own data.
