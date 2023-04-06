from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)

# CORS(app)

@app.route('/submit', methods=['POST', 'GET'])
def submit():
    data = request.get_json()
    data_json = json.dumps(data)
    file = data_json['file']

    return data_json

@app.route('/upload', methods=['POST'])
def upload():
    if 'audio' not in request.files:
        return 'No audio file in request.', 400

    audio_file = request.files['audio']
    audio_file.save('./uploads/test.mp3')
    # TODO: Call Whisper API with audio file and return response
    import io
    import openai
    openai.api_key = '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'
    with open("./uploads/test.mp3", "rb") as audio_file:
        audio_data = audio_file.read()
    audio_file = io.BytesIO(audio_data)
    audio_file.name = "test.mp3"
    transcript = openai.Audio.transcribe("whisper-1", file=audio_file)

    return transcript

if __name__ == '__main__':
    app.run(debug=True)
    

if __name__ == '__main__':
    app.run(port=5555)
