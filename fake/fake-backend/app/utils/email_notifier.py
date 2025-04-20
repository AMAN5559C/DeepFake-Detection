# app/utils/email_notifier.py

import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
SENDER_EMAIL = os.getenv("EMAIL_SENDER")  # verified sender in SendGrid

def send_deletion_warning(user_email, user_id, file_name, extend_url):
    subject = "⚠️ Your video will be deleted soon"
    html_content = f"""
    <p>Hi there 👋,</p>

    <p>This is a reminder that your video <strong>{file_name}</strong> is scheduled for deletion due to the 1-month storage policy.</p>

    <p>If you'd like to keep it longer, just click the link below to extend its storage by another month:</p>

    <p><a href="{extend_url}" target="_blank">🔗 Extend Video Retention</a></p>

    <p>Otherwise, it will be permanently deleted.</p>

    <br />
    <p>Regards,<br />Deepfake Detection Team 🤖</p>
    """

    try:
        message = Mail(
            from_email=SENDER_EMAIL,
            to_emails=user_email,
            subject=subject,
            html_content=html_content
        )
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
        print(f"✅ Email sent to {user_email} (status: {response.status_code})")
        return True
    except Exception as e:
        print("❌ Email sending failed:", e)
        return False
