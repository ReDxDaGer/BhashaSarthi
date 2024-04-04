from flask import Flask, render_template, request
from googletrans import Translator

app = Flask(__name__)
translator = Translator()

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/translate", methods=["GET", "POST"])
def translate():
    if request.method == "POST":
        text = request.form["text"]
        src_lang = request.form["src_lang"]
        dest_lang = request.form["dest_lang"]
        
        translation = translator.translate(text, src=src_lang, dest=dest_lang)
        translated_text = translation.text
        
        return render_template("result.html", text=text, src_lang=src_lang, dest_lang=dest_lang, translated_text=translated_text)
    else:
        return render_template("translate.html")
    
@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/team')
def team():
    return render_template('team.html')

@app.errorhandler(404)
def page_not_found(error):
    return render_template('error.html', error_code=404, error_message="Page Not Found"), 404

@app.errorhandler(500)
def internal_server_error(error):
    return render_template('error.html', error_code=500, error_message="Internal Server Error"), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0" , port=5000, debug=True)
