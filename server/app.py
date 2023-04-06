# server/app.py

from flask import Flask, request, make_response, jsonify
from flask_cors import CORS

app = Flask(__name__)

# CORS(app)

@app.route('/submit', methods=['POST', 'GET'])
def submit():
    data = request.get_json()
    print(data)
    # Changed 'echo' to 'print'
    # x = data.keys()
    # console.lo
    # x.value
    return {data}

if __name__ == '__main__':
    app.run(port=5555)


        # do something with the data here

    # import io
    # import openai
    # # changed to michellees key
    # openai.api_key = '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'

    # # need to adjust this logic so that it intakes the dynamically generated file based on user input
    # with open("./recording.m4a", "rb") as audio_file:
    #     audio_data = audio_file.read()
    # audio_file = io.BytesIO(audio_data)
    # audio_file.name = "recording.m4a"
    # transcript = openai.Audio.transcribe("whisper-1", file=audio_file)
    # print(transcript)

    # message = f'Transcript: {data}'