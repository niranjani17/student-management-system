from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)  # frontend connect aaga

# Data store pannu - simple list
students = []

# --- ROUTES ---

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

# 1. All Students edukka
@app.route('/api/students', methods=['GET'])
def get_students():
    try:
        return jsonify(students), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# 2. Pudusa Student Add Panna
@app.route('/api/students', methods=['POST'])
def add_student():
    try:
        data = request.get_json()
        
        if not data: