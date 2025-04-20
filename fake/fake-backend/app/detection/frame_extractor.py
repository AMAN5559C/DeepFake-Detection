# app/detection/frame_extractor.py

import cv2
import os
import uuid

def extract_frames(video_path, output_folder, fps=1):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    vidcap = cv2.VideoCapture(video_path)
    video_fps = vidcap.get(cv2.CAP_PROP_FPS)
    interval = int(video_fps // fps)

    success, image = vidcap.read()
    count = 0
    frame_paths = []

    while success:
        if count % interval == 0:
            frame_id = str(uuid.uuid4())
            frame_path = os.path.join(output_folder, f"{frame_id}.jpg")
            cv2.imwrite(frame_path, image)
            frame_paths.append(frame_path)
        success, image = vidcap.read()
        count += 1

    vidcap.release()
    return frame_paths

# Example usage:
# frames = extract_frames("video.mp4", "./temp_frames", fps=1)
