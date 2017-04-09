# Import Flask:
from flask import Flask, jsonify, request

# Initialize Flask app:
app = Flask(__name__)

# Define default route:
@app.route('/')
@app.route('/index')
def index():
    return jsonify('hello')

@app.route('/test')
def test():
    name = request.args.get('name')
    if name is None:
        return 'no name';
    else:
        return 'name: ' + name;

# Run app:
if __name__ == '__main__':
    app.run( host='0.0.0.0', port=8080, debug=False )
