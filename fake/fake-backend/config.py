# config.py

import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")
    CLOUDINARY_CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME")
    CLOUDINARY_API_KEY = os.getenv("CLOUDINARY_API_KEY")
    CLOUDINARY_API_SECRET = os.getenv("CLOUDINARY_API_SECRET")
    SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
    EMAIL_SENDER = os.getenv("EMAIL_SENDER")
    BASE_URL = os.getenv("BASE_URL", "http://localhost:5000")
