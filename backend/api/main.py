from flask import Flask , request , url_for , jsonify
from services.llm_service import LLMService
from models.model import User , db
from services.auth import auth_bp
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SESSION_TYPE'] = 'filesystem'

db.init_app(app)

with app.app_context():
    db.create_all()


@app.route("/api/translation", methods=["POST"])
def translation():
    try:
        service =  LLMService(bot_persona_file="bot_persona.txt")
    except FileNotFoundError as e:
        return jsonify({"error": str(e)}), 500
    
    data = request.json
    message = data.get('message')
    if not message:
        return jsonify({"error": "message is required"}), 400
    try:
        response = service.chat_completion(message)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(port=8000)