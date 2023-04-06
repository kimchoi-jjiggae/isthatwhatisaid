from models import db , User, AudioInput, WhisperOutput, CgptOutput
from app import app

with app.app_context():
    user = User(username='Ian', email='iankstrom@gmail.com', _password_hash='1234')
    db.session.add(user)
    db.session.commit()

    audio = AudioInput(audio='rando')
    db.session.add(audio)
    db.session.commit()
    
    whisper = WhisperOutput(text='asdf', prompt='asdf', audio_input_id=audio.id)
    db.session.add(whisper)
    db.session.commit()
    
    chat = CgptOutput(text='asdf', user_id=user.id, whisper_output_id=whisper.id)
    db.session.add(chat)
    
    db.session.commit()