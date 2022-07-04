from flask import Flask,request
from flask import render_template

app = Flask(__name__)


@app.route("/")
def home():
    return render_template('roulette.html')

if __name__ == "__main__":
    app.run(debug=True)
