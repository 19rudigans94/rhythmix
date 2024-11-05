import os
from flask import Flask, Response, jsonify

import aiofiles
import asyncio

app = Flask(__name__)

AUDIO_FOLDER = "tracks_stream/"


async def async_stream_audio(file_path):
    chunk_size = 1024 * 1024
    async with aiofiles.open(file_path, "rb") as audio_file:
        while chunk := await audio_file.read(chunk_size):
            yield chunk
            await asyncio.sleep(0.1)


@app.route("/stream/<filename>/", methods=['GET'])
def stream(filename):
    file_path = os.path.join(AUDIO_FOLDER, filename)

    if not os.path.exists(file_path):
        return jsonify({'error': 'file not found'}), 404 
    
    return Response(async_stream_audio(file_path), mimetype='audio/mpeg')


if __name__ == "__main__":  
    app.run(port=5000)