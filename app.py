from flask import Flask, request, jsonify
from flask_cors import CORS  # Add this import
from main import finance_agent  # Import the finance agent from main.py

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.json
        query = data.get('query')
        
        if not query:
            return jsonify({'error': 'No query provided'}), 400
        
        # Use the finance agent to get the analysis
        response = finance_agent.run(query)
        
        # Extract the content from the response
        if hasattr(response, 'content'):
            result = response.content
        else:
            result = str(response)
            
        print("Sending response:", result)  # Debug log
        return jsonify({'result': result})
        
    except Exception as e:
        print("Error:", str(e))  # Debug log
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True) 