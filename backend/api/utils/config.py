import os
import sys
import pytz
import datetime
import collections
from utils.logger import logger
from dotenv import load_dotenv

load_dotenv()

### Timezone config: India Standard Time
ist = pytz.timezone("Asia/Kolkata")

CONTEXT_LIMIT = 30
MODEL_NAME = os.getenv("MODEL_NAME")
CLOUDFLARE_ACCOUNT_ID = os.getenv("CLOUDFLARE_ACCOUNT_ID")
CLOUDFLARE_WORKERS_AI_API_KEY = os.getenv("CLOUDFLARE_WORKERS_AI_API_KEY")

try:
  CONTEXT_LIMIT = int(CONTEXT_LIMIT)
except ValueError:
  logger.error(f"CONTEXT_LIMIT must be an integer. Got: {CONTEXT_LIMIT}")
  sys.exit(1)

for var_name in [
  "CLOUDFLARE_ACCOUNT_ID",
  "CLOUDFLARE_WORKERS_AI_API_KEY",
]:
  if not globals()[var_name]:
    logger.error(f"{var_name} environment variable is not set.")
    sys.exit(1)


def get_time_based_greeting():
  now = datetime.datetime.now(ist)
  if 5 <= now.hour < 12:
    return "Good morning"
  elif 12 <= now.hour < 18:
    return "Good afternoon"
  elif 18 <= now.hour < 22:
    return "Good evening"
  else:
    return "Hello"


server_lore = collections.defaultdict(str)
server_contexts = collections.defaultdict(list)
user_memory = collections.defaultdict(dict)