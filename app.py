from flask import Flask, render_template
from apipagarme import apipagarme

app = Flask(__name__)

app.register_blueprint(apipagarme)


@app.route("/")
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
