

from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db
from models import AudioInput

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
db.init_app(app)

migrate = Migrate(app, db)
from sqlalchemy.orm import sessionmaker

# server/app.py

from flask import Flask, make_response, jsonify
from flask_cors import CORS
import json
from sqlalchemy import create_engine
import io
import openai

# CORS(app)

@app.route('/submit', methods=['POST', 'GET'])
def submit():
    data = request.get_json()
    data_json = json.dumps(data)
    file = data_json['file']

    return data_json

@app.route('/upload', methods=['POST'])
def upload():
    engine = create_engine('sqlite:///app.db')
    Session = sessionmaker(bind=engine)
    session = Session()
    if 'audio' not in request.files:
        return 'No audio file in request.', 400

    audio_file = request.files['audio']
    audio_file.save('./uploads/test.mp3')
    # TODO: Call Whisper API with audio file and return response


    # YOU HAVE TO REPLACE THIS EACH TIME YOU PUSH TO GITHUB! OR WE HAVE TO FIGURE OUT HOW TO USE VENVS ETC
    openai.api_key = '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'    
    with open("./uploads/test.mp3", "rb") as audio_file:
        audio_data = audio_file.read()
    audio_file = io.BytesIO(audio_data)
    audio_file.name = "test.mp3"
    new_audio = AudioInput(audio = "test")
    session.add(new_audio)
    session.commit()
    transcript = openai.Audio.transcribe("whisper-1", file=audio_file)

    return transcript

if __name__ == '__main__':

    app.run(port=5555, debug=True)

