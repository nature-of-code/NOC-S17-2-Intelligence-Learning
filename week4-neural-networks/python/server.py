#!/usr/bin/python

from flask import Flask, jsonify, request, redirect, url_for, send_from_directory

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

## Also now a get request

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
