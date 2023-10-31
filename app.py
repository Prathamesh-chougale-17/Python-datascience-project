from flask import Flask, jsonify
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)


@app.route("/api/data-analysis")
def perform_data_analysis():
    try:
        # Run the Python data analysis script using subprocess
        result = subprocess.check_output(
            ["py", "datastudy.py"], stderr=subprocess.STDOUT, text=True
        )
        return jsonify({"result": result.strip()})
    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == "__main__":
    app.run(debug=True)
