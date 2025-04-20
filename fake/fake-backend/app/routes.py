# app/routes.py

import os
import uuid
import shutil
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename

from app.detection.frame_extractor import extract_frames
from app.detection.model import detect_deepfake
from app.utils.cloudinary_helper import upload_to_cloudinary
from app.utils.retention_manager import schedule_deletion

main = Blueprint('main', __name__)

UPLOAD_FOLDER = 'app/storage/temp'
ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mov', 'jpg', 'jpeg', 'png'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@main.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    user_id = request.form.get('user_id')

    if file.filename == '' or not user_id:
        return jsonify({'error': 'Missing file or user_id'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        unique_id = str(uuid.uuid4())
        user_temp_dir = os.path.join(UPLOAD_FOLDER, user_id, unique_id)
        os.makedirs(user_temp_dir, exist_ok=True)
        file_path = os.path.join(user_temp_dir, filename)
        file.save(file_path)

        # Frame extraction
        frames = extract_frames(file_path, user_temp_dir)

        # Deepfake detection
        result = detect_deepfake(frames)

        # Upload original file to Cloudinary
        cloudinary_url = upload_to_cloudinary(file_path, user_id)

        # Schedule deletion after one month
        schedule_deletion(user_id, cloudinary_url)

        # Clean temp files
        shutil.rmtree(user_temp_dir)

        return jsonify({
            'message': 'File processed successfully',
            'result': result,
            'file_url': cloudinary_url
        })

    return jsonify({'error': 'Invalid file type'}), 400
