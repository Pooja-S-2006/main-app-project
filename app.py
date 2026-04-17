from flask import Flask, render_template, request, jsonify, redirect, url_for, session
from flask_cors import CORS
import os
import subprocess
import json
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'your-secret-key-change-in-production'
CORS(app)

# Configuration
FRONTEND_DIR = "frontend"
BACKEND_DIR = "backend"

@app.route('/')
def index():
    """Serve the main frontend application"""
    return render_template('index.html')

@app.route('/api/submodules')
def get_submodules():
    """Get list of all submodules"""
    submodules = {
        "lib": {
            "name": "UI Component Library",
            "description": "Reusable React components",
            "path": "lib"
        },
        "code-engine": {
            "name": "Code Execution Engine",
            "description": "Judge0 API integration for code execution",
            "path": "code-engine"
        },
        "problem-module": {
            "name": "Problem Management",
            "description": "Coding problems and test cases",
            "path": "problem-module"
        },
        "auth-module": {
            "name": "Authentication Module",
            "description": "User authentication with JWT",
            "path": "auth-module"
        },
        "leaderboard-module": {
            "name": "Leaderboard Module",
            "description": "User rankings and scores",
            "path": "leaderboard-module"
        }
    }
    return jsonify(submodules)

@app.route('/api/setup', methods=['POST'])
def setup_project():
    """Initialize the project structure and submodules"""
    try:
        # Create directories
        dirs_to_create = [
            'lib', 'code-engine', 'problem-module', 
            'auth-module', 'leaderboard-module',
            'frontend', 'backend', 'docs'
        ]
        
        for dir_name in dirs_to_create:
            os.makedirs(dir_name, exist_ok=True)
        
        return jsonify({
            "status": "success",
            "message": "Project structure created successfully"
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route('/api/git/submodule/add', methods=['POST'])
def add_submodule():
    """Add a git submodule"""
    data = request.json
    submodule_name = data.get('name')
    submodule_url = data.get('url')
    
    if not submodule_name or not submodule_url:
        return jsonify({
            "status": "error",
            "message": "Submodule name and URL are required"
        }), 400
    
    try:
        # Add git submodule
        result = subprocess.run(
            ['git', 'submodule', 'add', submodule_url, submodule_name],
            capture_output=True,
            text=True
        )
        
        if result.returncode == 0:
            return jsonify({
                "status": "success",
                "message": f"Submodule {submodule_name} added successfully"
            })
        else:
            return jsonify({
                "status": "error",
                "message": result.stderr
            }), 500
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route('/api/git/submodule/update', methods=['POST'])
def update_submodules():
    """Update all submodules"""
    try:
        # Initialize submodules
        subprocess.run(['git', 'submodule', 'init'], capture_output=True)
        # Update submodules
        result = subprocess.run(['git', 'submodule', 'update', '--recursive'], 
                              capture_output=True, text=True)
        
        if result.returncode == 0:
            return jsonify({
                "status": "success",
                "message": "All submodules updated successfully"
            })
        else:
            return jsonify({
                "status": "error",
                "message": result.stderr
            }), 500
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route('/api/git/submodule/clone', methods=['POST'])
def clone_with_submodules():
    """Clone project with all submodules"""
    data = request.json
    repo_url = data.get('url')
    
    if not repo_url:
        return jsonify({
            "status": "error",
            "message": "Repository URL is required"
        }), 400
    
    try:
        # Clone repository with submodules
        result = subprocess.run(
            ['git', 'clone', '--recurse-submodules', repo_url],
            capture_output=True,
            text=True
        )
        
        if result.returncode == 0:
            return jsonify({
                "status": "success",
                "message": "Repository cloned with submodules successfully"
            })
        else:
            return jsonify({
                "status": "error",
                "message": result.stderr
            }), 500
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route('/api/math/calculate', methods=['POST'])
def calculate():
    """Use calc.py for mathematical calculations"""
    from calc import add, sub, mul, div, power, modulus, average, square
    
    data = request.json
    operation = data.get('operation')
    a = data.get('a')
    b = data.get('b')
    
    try:
        if operation == 'add':
            result = add(a, b)
        elif operation == 'sub':
            result = sub(a, b)
        elif operation == 'mul':
            result = mul(a, b)
        elif operation == 'div':
            result = div(a, b)
        elif operation == 'power':
            result = power(a, b)
        elif operation == 'modulus':
            result = modulus(a, b)
        elif operation == 'average':
            result = average(a, b)
        elif operation == 'square':
            result = square(a)
        else:
            return jsonify({
                "status": "error",
                "message": "Invalid operation"
            }), 400
        
        return jsonify({
            "status": "success",
            "result": result
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route('/docs')
def documentation():
    """Serve project documentation"""
    return render_template('docs.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
