# Daniel Shiffman
# Nature of Code: Intelligence and Learning
# https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

# import everything we need
from flask import Flask, jsonify, request

# ML stuff
import keras
from keras.models import load_model
import numpy as np

# Setup Flask app.
app = Flask(__name__)
# Extra debugging
app.debug = True


# helper function to sample an index from a probability array
# This comes directly from
# https://github.com/fchollet/keras/blob/master/examples/lstm_text_generation.py
def sample(preds, temperature=1.0):
    preds = np.asarray(preds).astype('float64')
    preds = np.log(preds) / temperature
    exp_preds = np.exp(preds)
    preds = exp_preds / np.sum(exp_preds)
    probas = np.random.multinomial(1, preds, 1)
    return np.argmax(probas)

# Load in the model
model = load_model('model.h5')

# Same maxlen as in the model
maxlen = 40

# We have to build the same dictionaries here from the source text
# We could instead save and load these instead?
# read the file and convert to lowercase (must match how we did it during training)
text = open('hamlet.txt').read().lower()
# Get a list of all the unique characters
chars = sorted(list(set(text)))
# Two dictionaries
# Lookup a character by index
# Lookup an index by character
char_indices = dict((c,i) for i, c in enumerate(chars))
indices_char = dict((i,c) for i,c in enumerate(chars))

# Routes
# This is root path, use index.html in "static" folder
@app.route('/')
def root():
  return app.send_static_file('index.html')

# This is a nice way to just serve everything in the "static" folder
@app.route('/<path:path>')
def static_proxy(path):
  # send_static_file will guess the correct MIME type
  return app.send_static_file(path)

# This is the new piece
# Here we receive the "seed" text from p5 via a "POST" request
# and send back the generated text
@app.route('/upload', methods=['POST'])
def upload():
    # Grab the seed sentence
    # Should check to make sure it is maxlen chars
    sentence = request.form['seed']
    # Grab diversity
    temperature = float(request.form['temperature'])
    # Grab length (how many chars to generate)
    length = int(request.form['length'])
    # Start with empty generated string
    generated = ''

    for i in range(length):
        # First vectorize the text we are feeding in
        x = np.zeros((1, maxlen, len(chars)))
        for t, char in enumerate(sentence):
            x[0, t, char_indices[char]] = 1.
        # Then get a probability map of possible predictions of the next char
        preds = model.predict(x, verbose=0)[0]
        # Pick one
        next_index = sample(preds, temperature)
        # What character is it?
        next_char = indices_char[next_index]
        # Add it
        generated += next_char
        # Now feed in the previous sentence minus the first char plus the next char
        sentence = sentence[1:] + next_char
    # send back the generated sentence
    return jsonify(status='success',sentence=generated);

# Run app:
if __name__ == '__main__':
    # Localhost and port 8080
    app.run( host='0.0.0.0', port=8080, debug=False )
    # If you enable debugging, you'll get more info
    # server will restart automatically when code changes, etc.
    # app.run( host='0.0.0.0', port=8080, debug=True )
