# schedule.py

from apscheduler.schedulers.blocking import BlockingScheduler
from app.utils.retention_manager import run_retention_check

scheduler = BlockingScheduler()

# Runs every day at 3 AM UTC
@scheduler.scheduled_job('cron', hour=3)
def scheduled_cleanup():
    print("Running scheduled retention check...")
    run_retention_check()

if __name__ == "__main__":
    scheduler.start()
