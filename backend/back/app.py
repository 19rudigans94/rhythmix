from flask import Flask, jsonify, send_file
import os
import asyncio

app = Flask(__name__)

TRACKS_DIR = "tracks_/"


@app.route('/tracks', methods=['GET'])
async def list_tracks():
    tracks = os.listdir(TRACKS_DIR)
    return jsonify(tracks)


@app.route('/stream/<track_name>', methods=['GET'])
async def stream_tracks(track_name):
    """
    Отправляет файл трека по запросу.
    
    :param track_name: Имя трека, который нужно отправить.
    """
    track_path = os.path.join(TRACKS_DIR, track_name)
    if os.path.exists(track_path):
        return await send_file(track_path, as_attachment=False)
    else:
        return jsonify({"error": "Track not found"}), 404

@app.route('/stream_async/<track_name>')
async def stream_track_async(track_name):
    """
    Асинхронно отправляет файл трека по частям.
    
    :param track_name: Имя трека, который нужно отправить.
    """
    track_path = os.path.join(TRACKS_DIR, track_name)
    if not os.path.exists(track_path):
        return jsonify({"error": "Track not found"}) ,404
    
    async def generate():
        """
        Генератор для чтения файла трека по частям.
        """
        with open(track_path, 'rb') as track_file:
            while True:
                data = track_file.read(1024)
                if not data:
                    break
                yield data
    return app.response_class(generate(), mimetype='audio/mpeg')

if __name__ == '__main--':
    app.run(debug=True)

    
