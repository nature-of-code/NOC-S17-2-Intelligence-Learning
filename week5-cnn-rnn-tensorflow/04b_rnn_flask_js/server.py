#!/usr/bin/python

# import flask
from flask import Flask, jsonify, request, redirect, url_for, send_from_directory

import keras
from keras.models import load_model
import numpy as np

# Setup Flask app.
app = Flask(__name__)
app.debug = True

def sample(preds, temperature=1.0):
    # helper function to sample an index from a probability array
    preds = np.asarray(preds).astype('float64')
    preds = np.log(preds) / temperature
    exp_preds = np.exp(preds)
    preds = exp_preds / np.sum(exp_preds)
    probas = np.random.multinomial(1, preds, 1)
    return np.argmax(probas)

model = load_model('model.h5')

maxlen = 40
text = open('hamlet.txt').read().lower()  # read the file and convert to lowercase
chars = sorted(list(set(text)))
# what position does each character exist at in the prev list
char_indices = dict((c,i) for i, c in enumerate(chars))
indices_char = dict((i,c) for i,c in enumerate(chars))


# Routes
@app.route('/')
def root():
  return app.send_static_file('index.html')

# All static files
@app.route('/<path:path>')
def static_proxy(path):
  # send_static_file will guess the correct MIME type
  return app.send_static_file(path)

## Also now a post request to receive a file
@app.route('/upload', methods=['POST'])
def upload():
    sentence = request.form['seed']
    print(sentence)
    # sentence = 'ince of denmark hamlet prince of denmark'
    diversity = float(request.form['temperature'])
    length = int(request.form['length'])
    generated = ''
    # generated += sentence
    for i in range(length):
        x = np.zeros((1, maxlen, len(chars)))
        for t, char in enumerate(sentence):
            x[0, t, char_indices[char]] = 1.
        preds = model.predict(x, verbose=0)[0]
        next_index = sample(preds, diversity)
        next_char = indices_char[next_index]
        generated += next_char
        sentence = sentence[1:] + next_char
    return jsonify(status='success',sentence=generated);

# Run app:
if __name__ == '__main__':
#    app.run( host='0.0.0.0', port=8080, debug=True )
    app.run( host='0.0.0.0', port=8080, debug=False )
