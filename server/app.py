from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from models import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'

migrate = Migrate(app, db)

db.init_app(app)
# server/app.py

from flask import Flask, make_response, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route('/movies', methods=['GET'])
def movies():
    response_dict = {
        "text": "Movies will go here"
    }

    return make_response(jsonify(response_dict), 200)

if __name__ == '__main__':
    app.run(port=5555, debug=True)