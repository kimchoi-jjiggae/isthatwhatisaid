from models import db , User, AudioInput, WhisperOutput, CgptOutput
from app import app

with app.app_context():
    user = User(username='Ian', email='iankstrom@gmail.com', _password_hash='1234')
    audio = AudioInput(audio='rando')
    whisper = WhisperOutput(text='asdf', prompt='asdf')
    chat = CgptOutput(text='asdf')
    db.session.add(user)
    db.session.add(audio)
    db.session.add(whisper)
    db.session.add(chat)
    db.session.commit()