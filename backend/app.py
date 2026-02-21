from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

# Database connection
def get_db():
    return sqlite3.connect("database.db")

# Create student
@app.route("/create", methods=["POST"])
def create_student():
    data = request.json
    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            roll TEXT,
            department TEXT,
            email TEXT
        )
    """)

    cur.execute(
        "INSERT INTO students (name, roll, department, email) VALUES (?, ?, ?, ?)",
        (data["name"], data["roll"], data["department"], data["email"])
    )

    conn.commit()
    conn.close()
    return jsonify({"message": "Student added successfully"})

# Read students
@app.route("/students", methods=["GET"])
def get_students():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM students")
    students = cur.fetchall()
    conn.close()
    return jsonify(students)

# Delete student
@app.route("/delete/<int:id>", methods=["DELETE"])
def delete_student(id):
    conn = get_db()
    cur = conn.cursor()
    cur.execute("DELETE FROM students WHERE id=?", (id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Student deleted"})

# Update student
@app.route("/update/<int:id>", methods=["PUT"])
def update_student(id):
    data = request.json
    conn = get_db()
    cur = conn.cursor()
    cur.execute(
        "UPDATE students SET name=?, roll=?, department=?, email=? WHERE id=?",
        (data["name"], data["roll"], data["department"], data["email"], id)
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Student updated"})

if __name__ == "__main__":
    app.run(debug=True)