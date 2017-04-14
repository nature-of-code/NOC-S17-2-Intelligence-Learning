#!/usr/bin/python

# import flask
from flask import Flask, jsonify, request, redirect, url_for, send_from_directory

from io import BytesIO
from PIL import Image
import base64

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
    # try:
        data = request.form['img']
        im = Image.open(BytesIO(base64.b64decode(data)))
        print(im)
        return jsonify(status='got image');
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
    app.run( host='0.0.0.0', port=8080, debug=True )
