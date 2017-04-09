# Import Flask:
from flask import Flask, jsonify

# Initialize Flask app:
app = Flask(__name__)

# Define default route:
@app.route('/')
@app.route('/index')
def index():
    return jsonify('hello')

# Define form submission route:
@app.route('/test', methods=['GET'])
def test():
    # Get user's name from submitted form data:
    
    # Render hello page (with variables injected):
    return jsonify(request);

# Run app:
if __name__ == '__main__':
    app.run( host='0.0.0.0', port=8080, debug=False )
