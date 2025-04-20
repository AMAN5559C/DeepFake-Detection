import os
import datetime
import cloudinary
import cloudinary.api
import cloudinary.uploader
from app.utils.email_notifier import send_deletion_warning

# Setup Cloudinary config
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

DELETION_THRESHOLD_DAYS = 30
WARNING_THRESHOLD_DAYS = 27  # Send warning ~3 days before deletion

def list_all_resources():
    return cloudinary.api.resources(type="upload", prefix="", max_results=500)

def parse_timestamp(resource):
    created_at = resource['created_at']
    return datetime.datetime.strptime(created_at, "%Y-%m-%dT%H:%M:%SZ")

def run_retention_check():
    try:
        resources = list_all_resources().get("resources", [])
        now = datetime.datetime.utcnow()

        for res in resources:
            created_at = parse_timestamp(res)
            age_days = (now - created_at).days

            public_id = res['public_id']
            user_id = public_id.split('/')[0]  # Folder = user ID
            file_name = public_id.split('/')[-1]
            user_email = res.get('context', {}).get('custom', {}).get('email', None)

            # Send warning email
            if WARNING_THRESHOLD_DAYS <= age_days < DELETION_THRESHOLD_DAYS:
                if user_email:
                    extend_url = f"https://your-app.com/extend/{user_id}/{file_name}"
                    send_deletion_warning(user_email, user_id, file_name, extend_url)

            # Delete if expired
            elif age_days >= DELETION_THRESHOLD_DAYS:
                cloudinary.uploader.destroy(public_id)
                print(f"✅ Deleted expired file: {public_id}")

    except Exception as e:
        print("❌ Error during retention check:", e)

# Stub function to avoid ImportError
def schedule_deletion(public_id, scheduled_date=None):
    # In real usage, this might push a scheduled job or database flag
    print(f"[Scheduled] Deletion for {public_id} on {scheduled_date or 'auto-calculated'}")
