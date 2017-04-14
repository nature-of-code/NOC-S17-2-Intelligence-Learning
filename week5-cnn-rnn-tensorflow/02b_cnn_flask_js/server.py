#!/usr/bin/python

# import flask
from flask import Flask, jsonify, request, redirect, url_for, send_from_directory

from io import BytesIO
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt
from scipy.misc import imresize
import base64
import keras
from keras.models import load_model

def four2one(rgb):
    return np.dot(rgb[...,:4], [0.333, 0.333, 0.333,0])

# Setup Flask app.
app = Flask(__name__)
app.debug = True

model = load_model('model.h5')

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
    # try:
        data = request.form['img']
        img = Image.open(BytesIO(base64.b64decode(data)))
        img = imresize(img, (28,28,3))
        gray = four2one(img)
        gray /= 255
        print(gray[0])
        inputs = gray.reshape(1, 28, 28, 1)
        print(inputs.shape)
        prediction = model.predict(inputs,batch_size=1, verbose=0)
        print(prediction)
        return jsonify(status='got image',prediction=prediction.tolist());
    # except Exception as err:
    #     print(err);
    #     return jsonify(status='something went wrong');

@app.route('/test')
def test():
    name = request.args.get('name')
    if name is None:
        return jsonify(status='no name');
    else:
        return jsonify(status='name',
                   name=name)
# Run app:
if __name__ == '__main__':
#    app.run( host='0.0.0.0', port=8080, debug=True )
    app.run( host='0.0.0.0', port=8080, debug=False )
