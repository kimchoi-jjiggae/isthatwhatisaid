from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.hybrid import hybrid_property

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    # write validation for email to check if it is valid email

    # @hybrid_property
    # def password_hash(self):

    cgpt_outputs = db.relationship('CgptOutput', backref='user')

class AudioInput(db.Model):
    __tablename__ = 'audio_inputs'

    id = db.Column(db.Integer, primary_key=True)
    audio = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

class WhisperOutput(db.Model):
    __tablename__ = 'whisper_outputs'

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String)
    prompt = db.Column(db.String)

    audio_input_id = db.Column(db.Integer, db.ForeignKey('audio_inputs.id'))

class CgptOutput(db.Model):
    __tablename__ = 'cgpt_outputs'

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String)

    whisper_output_id = db.Column(db.Integer, db.ForeignKey('whisper_outputs.id'))

