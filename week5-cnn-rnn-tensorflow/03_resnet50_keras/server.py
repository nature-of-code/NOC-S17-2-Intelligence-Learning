#!/usr/bin/python

# import flask
from flask import Flask, jsonify, request, redirect, url_for, send_from_directory

from keras.applications.resnet50 import ResNet50
from keras.preprocessing import image
from keras.applications.resnet50 import preprocess_input, decode_predictions
import numpy as np

from io import BytesIO
from PIL import Image
import base64


model = ResNet50(weights='imagenet')

# Setup Flask app.
app = Flask(__name__)
app.debug = True

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
    data = request.form['img']
    img = Image.open(BytesIO(base64.b64decode(data)))
    img = img.resize((224,224))
    img = img.convert("RGB")
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)
    preds = model.predict(x)
    preds = decode_predictions(preds, top=3)[0]
    data = []
    for pred in preds:
        data.append({'id': pred[0], 'term': pred[1], 'score': float(pred[2])})
    return jsonify(status='got image',prediction=data)

# Run app:
if __name__ == '__main__':
#    app.run( host='0.0.0.0', port=8080, debug=True )
    app.run( host='0.0.0.0', port=8080, debug=False )
