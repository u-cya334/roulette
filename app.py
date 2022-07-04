from flask import Flask,request
from flask import render_template

app = Flask(__name__)


@app.route("/roulette/j1ik23en4n2")
def daikiti():
    return render_template('roulette.html')

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/roulette")
def home2():
    return render_template("home.html")

@app.route("/roulette/jdiakikkeyno")
def daikyou():
    return render_template("roulette_daikyo.html")

if __name__ == "__main__":
    app.run(debug=True)
