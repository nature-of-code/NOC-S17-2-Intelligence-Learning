#!/usr/bin/python

# import keras
# from flask import Flask, jsonify, request, redirect, url_for, send_from_directory
# from keras.models import load_model
from scipy.misc import imresize
import matplotlib.pyplot as plt

## Load the Keras Model
# model = load_model('model.h5')

def rgb2gray(rgb):
    return np.dot(rgb[...,:4], [0.299, 0.587, 0.114])

## Load an image
## requires pip install pillow
img = plt.imread('zero.png')
img = imresize(img, (28,28,1))
print(img.shape)

# # Setup Flask app.
# app = Flask(__name__)
# app.debug = True
#
# # Routes
# @app.route('/')
# def root():
#   return app.send_static_file('index.html')
#
# # All static files
# @app.route('/<path:path>')
# def static_proxy(path):
#   # send_static_file will guess the correct MIME type
#   return app.send_static_file(path)
#
# ## Also now a get request
#
# @app.route('/test')
# def test():
#     name = request.args.get('name')
#     if name is None:
#         return jsonify(status='no name');
#     else:
#         return jsonify(status='name',
#                    name=name)
# # Run app:
# if __name__ == '__main__':
#     app.run( host='0.0.0.0', port=8080, debug=True )
