# Daniel Shiffman
# Nature of Code: Intelligence and Learning
# https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

# import everything we need
from flask import Flask, jsonify, request

# ML stuff
from keras.applications.resnet50 import ResNet50
from keras.applications.resnet50 import preprocess_input, decode_predictions
import numpy as np

# Some file reading and image stuff
from keras.preprocessing import image
from io import BytesIO
from PIL import Image
import base64

# Setup Flask app.
app = Flask(__name__)
# Extra debugging
app.debug = True

# Load the RESNET model
model = ResNet50(weights='imagenet')

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
# Here we receive a "base64" encoded image from p5
# via a "POST" request
@app.route('/upload', methods=['POST'])
def upload():
    # Get the image data from the POST
    data = request.form['img']
    # This decodes it into an image
    img = Image.open(BytesIO(base64.b64decode(data)))
    # Resize to 224x224 and make sure it's RGB
    img = img.resize((224,224))
    img = img.convert("RGB")

    # Turn it into a matrix (224x224x3)
    x = image.img_to_array(img)
    # Add a dimension to make it (1x224x224x3)
    x = np.expand_dims(x, axis=0)
    # This remaps the pixel values to a negative<->positive range
    x = preprocess_input(x)

    # Get a prediction
    preds = model.predict(x)
    # decode the results into a list of tuples (class, description, probability)
    preds = decode_predictions(preds, top=3)[0]

    # This is a little goofy but we need to convert it to something that works
    # with jsonify. Python sets do not and also numpy float32's do not
    # So made a list of little dictionaries
    data = []
    for pred in preds:
        data.append({'id': pred[0], 'term': pred[1], 'score': float(pred[2])})
    # Send to p5
    return jsonify(status='got image',prediction=data)

# Run app:
if __name__ == '__main__':
    # Localhost and port 8080
    app.run( host='0.0.0.0', port=8080, debug=False )
    # If you enable debugging, you'll get more info
    # server will restart automatically when code changes, etc.
    # app.run( host='0.0.0.0', port=8080, debug=True )
