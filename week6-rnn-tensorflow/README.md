## Examples
* [RNN1: training and testing LSTM for text generation](https://github.com/shiffman/NOC-S17-2-Intelligence-Learning/tree/master/week6-rnn-tensorflow/01a_rnn_keras)
* [RNN2: Generating RNN text suggestions with p5](https://github.com/shiffman/NOC-S17-2-Intelligence-Learning/tree/master/week6-rnn-tensorflow/01b_rnn_flask_js)

## Recurrent Neural Networks
* [The Unreasonable Effectiveness of Recurrent Neural Networks](http://karpathy.github.io/2015/05/21/rnn-effectiveness/) by Andrej Karpathy
* [Andrej Karpathy talk on char-rnn](https://skillsmatter.com/skillscasts/6611-visualizing-and-understanding-recurrent-networks)
* [Recurrent Neural Networks Tutorial, Part 1](http://www.wildml.com/2015/09/recurrent-neural-networks-tutorial-part-1-introduction-to-rnns/) by Denny Britz.
* [Anyone Can Learn To Code an LSTM-RNN in Python (Part 1: RNN)](https://iamtrask.github.io/2015/11/15/anyone-can-code-lstm/) by Andrew Trask
* [Rohan & Lenny #3: Recurrent Neural Networks & LSTMs](https://ayearofai.com/rohan-lenny-3-recurrent-neural-networks-10300100899b)
* [A Deep Dive into Recurrent Neural Nets](http://nikhilbuduma.com/2015/01/11/a-deep-dive-into-recurrent-neural-networks/) by Nikhil Buduma
* [Generating Sequences With Recurrent Neural Networks](http://arxiv.org/abs/1308.0850) by Alex Graves
* [Generating Text with Recurrent Neural Networks](http://www.cs.utoronto.ca/~ilya/pubs/2011/LANG-RNN.pdf) by Ilya Sutskever
* [Tomas Mikolov's Thesis](http://www.fit.vutbr.cz/~imikolov/rnnlm/thesis.pdf)
* [LSTM Networks for Sentiment Analysis](http://deeplearning.net/tutorial/lstm.html)
* [Recurrent Neural Networks in Tensorflow](https://www.tensorflow.org/versions/r0.10/tutorials/recurrent/)
* [Siraj's RNN video](https://www.youtube.com/watch?v=cdLUzrjnlr4), [code on github](https://github.com/llSourcell/recurrent_neural_net_demo/blob/master/rnn.py)

### Other projects and resources
* [Writing with the Machine](https://www.robinsloan.com/notes/writing-with-the-machine/)
* [Magenta: Make Music and Art Using Machine Learning](https://magenta.tensorflow.org/)
* [Handwriting Generation with RNN and p5.js](http://blog.otoro.net/2017/01/01/recurrent-neural-network-artist/)
* [Experiments in handwriting](http://distill.pub/2016/handwriting/)
* [RNN for generating Baroque Music](https://www.youtube.com/watch?v=SacogDL_4JU)

### Related open source frameworks:
* [char-rnn](https://github.com/karpathy/char-rnn)
* [torch-rnn](https://github.com/jcjohnson/torch-rnn)
* [Recurrent-JS](https://github.com/karpathy/recurrentjs) and [Recurrent-Node-JS](https://github.com/shiffman/Recurrent-Node-JS)
* [NeuralTalk2](https://github.com/karpathy/neuraltalk2)
* [Show and Tell: A Neural Image Caption Generator](https://github.com/tensorflow/models/tree/master/im2txt) with Tensorflow
* [DenseCap: Fully Convolutional Localization Networks for Dense Captioning](http://cs.stanford.edu/people/karpathy/densecap/)

### Why RNN?
* ANNs (and CNNs) can't handle "sequential" or "temporal" input.
* ANNs have no memory.
* ANNs have a fixed architecture: fixed input, fixed output

### Examples of data that do not fit ANNs/CNNs
* Text (sequence of characters, words)
* Music (sequences of notes, rhythm)
* Drawings (sequences of "vector" paths)

### Terminology
* word embeddings: expressing words as vectors of numbers
   * "The only way to make sentences work with ANNs would be to have billions of output neurons that each map to a single possible sentence in the permutation of all [sensible] sentences that can be formed by the vocabulary we have. And that doesn’t sound like a good idea." -- [Rohan & Lenny #3: Recurrent Neural Networks & LSTMs](https://ayearofai.com/rohan-lenny-3-recurrent-neural-networks-10300100899b)
* temporal data: data that varies over time (a sequence)
* one-hot encoding: [What is one hot encoding and when is it used in data science?](https://www.quora.com/What-is-one-hot-encoding-and-when-is-it-used-in-data-science)
* [Vanishing gradient problem](https://en.wikipedia.org/wiki/Vanishing_gradient_problem). [Rohan #4: The vanishing gradient problem](https://ayearofai.com/rohan-4-the-vanishing-gradient-problem-ec68f76ffb9b)
* hidden state: values of hidden vector at a given time

### RNN Parameters
* `maxlen` - length of a "sentence" for inputting into RNN.
* temperature (aka "diversity"): A number in the range of 0-1 (cannot be 0). The temperature is divides probabilities before applying softmax. Lower temperature will result in more "expected" outcomes (high probabilities are even higher). A higher temperature increases the "diversity" of outcomes, but may produce less "correct-sounding" results.

### RNN architectures
* one to one (ANN)
* one to many (captioning)
* many to one (sentiment analysis)
* many to many (text, music generation, language translation)

### RNN Steps one to many (for, say, image captioning)
1. Send in input image x (not a sequence)
2. Compute hidden (time=1) vectors based on inputs<->hidden weights.
3. Compute hidden (time=2) vectors based on hidden<->hidden weights.
4. Compute hidden (time=3) vectors based on hidden<->hidden weights.
5. keep going?
6. Compute output y (time=1) vectors based on hidden1<->output weights. (could happen right after step 1)
7. Compute output y (time=2) vectors based on hidden2<->output weights.
8. Compute output y (time=3) vectors based on hidden3<->output weights.
9. keep going?
* Incidentally, the above is known as LRCN (Long-Term Recurrent Convolutional Networks)



## Tools, frameworks, libraries for this week's examples

The tools (Python, Flask, p5.js, Keras/Tensorflow) are [the same as last week](https://github.com/shiffman/NOC-S17-2-Intelligence-Learning/tree/master/week5-cnn-tensorflow#tools-frameworks-libraries-for-this-week). Below are some additional elements related to RNN.

### Python
* `open()` and `read()` for reading in a text file: [python docs](https://docs.python.org/2/tutorial/inputoutput.html)
* [dictionaries in python](https://docs.python.org/3/tutorial/datastructures.html#tut-dictionaries) for looking up characters by index, and index by characters.
* `enumerate()`: [docs](https://docs.python.org/2.3/whatsnew/section-enumerate.html) for iterating over all characters.

### Keras/Tensorflow
* [LSTM](https://keras.io/layers/recurrent/): A "Recurrent Layer" (also GRU, SimpleRNN)
