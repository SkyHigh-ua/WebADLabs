import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

@app.route("/data", methods=["POST"])
def POSTmethod():
    data = request.get_json()
    with sqlite3.connect('GridDB.sqlite') as con:
        db = con.cursor()
        if data == 'clear':
            db.execute('''DELETE FROM GRID''')
            response = "clear"
        else:
            db.execute('''INSERT INTO GRID VALUES (?, ?, ?, ?)''', data)
            response = "loaded"
    return response

@app.route("/data", methods=["GET"])
def GETmethod():
    with sqlite3.connect('GridDB.sqlite') as con:
        db = con.cursor()
        db.execute('''SELECT * FROM GRID''')
        data = db.fetchall()
    return data

app.run(debug=True)