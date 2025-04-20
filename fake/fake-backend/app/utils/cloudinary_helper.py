# app/utils/cloudinary_helper.py

import cloudinary
import cloudinary.uploader
import cloudinary.api
import os

# Initialize Cloudinary config (make sure to set these in your .env file)
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

def upload_to_cloudinary(file_path, user_id, public_id=None, user_email=None):
    folder = f"deepfake_detection/{user_id}"
    options = {
        "folder": folder,
        "public_id": public_id,
        "resource_type": "video" if file_path.endswith(('.mp4', '.mov')) else "image",
        "context": {
            "custom": {
                "user_id": user_id,
                "email": user_email or "not_provided"
            }
        }
    }
    response = cloudinary.uploader.upload(file_path, **options)
    return response.get("secure_url")

def delete_from_cloudinary(public_id):
    try:
        cloudinary.uploader.destroy(public_id, invalidate=True)
        return True
    except Exception as e:
        print("Delete error:", e)
        return False

def list_user_assets(user_id):
    folder = f"deepfake_detection/{user_id}"
    try:
        response = cloudinary.api.resources(type="upload", prefix=folder)
        return response.get("resources", [])
    except Exception as e:
        print("List error:", e)
        return []
