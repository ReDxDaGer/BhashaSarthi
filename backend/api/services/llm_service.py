import io
import requests
import numpy as np
from utils.logger import logger
from typing import List, Dict, Union
from utils.config import (
  MODEL_NAME,
  CLOUDFLARE_ACCOUNT_ID,
  CLOUDFLARE_WORKERS_AI_API_KEY,
)

class LLMService:
    def __init__(self): 
        self.model_search_url = f"https://api.cloudflare.com/client/v4/accounts/{CLOUDFLARE_ACCOUNT_ID}/ai/models/search"
        self.model_inference_url = f"https://api.cloudflare.com/client/v4/accounts/{CLOUDFLARE_ACCOUNT_ID}/ai/run/{MODEL_NAME}"
        

        self.headers = {"Authorization": f"Bearer {CLOUDFLARE_WORKERS_AI_API_KEY}"}

    def __init__(self, bot_persona_file="path/to/your/bot_persona.txt"):
        self.model_search_url = f"https://api.cloudflare.com/client/v4/accounts/{CLOUDFLARE_ACCOUNT_ID}/ai/models/search"
        self.model_inference_url = f"https://api.cloudflare.com/client/v4/accounts/{CLOUDFLARE_ACCOUNT_ID}/ai/run/{MODEL_NAME}"
        self.headers = {"Authorization": f"Bearer {CLOUDFLARE_WORKERS_AI_API_KEY}"}
        self.bot_persona = self.read_bot_persona(bot_persona_file)
        self.chat_history = []

    def read_bot_persona(self, file_path):
        try:
            with open(file_path, 'r') as file:
                return file.read().strip()
        except FileNotFoundError:
            logger.error(f"Bot persona file not found: {file_path}")
            return "I am a customer service bot. How can I assist you today?"
        except IOError:
            logger.error(f"Error reading bot persona file: {file_path}")
            return "I am a customer service bot. How can I assist you today?"

    def chat_completion(self, message: str) -> str:
        # Add the user's message to the chat history
        self.chat_history.append(f"Customer: {message}")

        # Prepare the full prompt with bot persona and chat history
        full_prompt = f"{self.bot_persona}\n\nChat History:\n"
        full_prompt += "\n".join(self.chat_history[-5:])  # Include last 5 messages for context
        full_prompt += f"\n\nAssistBot:"

        # Use 'prompt' instead of 'message' in the payload
        json = {"prompt": full_prompt}
        bot_response = ""

        try:
            response = requests.post(
                self.model_inference_url,
                headers=self.headers,
                json=json,
            )
            if response.status_code == 200:
                result = response.json()
                bot_response = str(result["result"]["response"])
                if not bot_response:
                    bot_response = "⚠️ I apologize, but I'm having trouble processing your request right now. Can I connect you with a human representative?"
            else:
                logger.error(f"Non-200 response: {response.status_code}, Response: {response.text}")
                bot_response = "I'm sorry, but I'm experiencing some technical difficulties. Let me connect you with a human representative who can assist you further."
        except requests.RequestException as e:
            logger.error(f"API request failed: {e}")
            bot_response = "I apologize, but I'm having trouble accessing my knowledge base at the moment. Would you like me to connect you with a human representative?"
        except KeyError:
            logger.error("Unexpected API response format")
            bot_response = "I'm having trouble understanding your request. Could you please rephrase it, or would you prefer to speak with a human representative?"

        # Add the bot's response to the chat history
        self.chat_history.append(f"AssistBot: {bot_response}")
        return bot_response
    
    def fetch_model(self) -> List[str]:
        model_list = []
        try:
            response = requests.get(
                self.model_search_url,
                headers=self.headers,
            )
            result = response.json()

            if "result" in result:
                for obj in result["result"]:
                    if "meta" in obj["name"]:
                        model_list.append(obj["name"])
            else:
                logger.error(f"Unexpected API response format: {result}")
    
        except requests.RequestException as e:
            logger.error(f"API request failed: {e}")
        except KeyError:
            logger.error("Unexpected API response format")

        return model_list