import http
from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)

openai.api_key ="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"

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a supportive AI tutor."},
                {"role": "user", "content": user_message},
            ]
        )
        reply = response.choices[0].message.content
        return jsonify({"reply": reply})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
