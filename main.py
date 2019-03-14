import json
import os
from flask import Flask, render_template, request

from goa.process.gorim import gorim
# from goa.storage.storage import run_storage

app = Flask(__name__, static_folder='./dist',)
UPLOAD_FOLDER = './uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/")
@app.route("/upload")
def index():
    return render_template('index.html')

@app.route("/p/<name>")
def dataset_page(name):
    return render_template('index.html')

@app.route('/api/get_dataset', methods=['GET'])
def get_dataset():
    print(request)

    test = {'hi': 'get'}
    ret = json.dumps(test)

    return ret

@app.route('/api/upload_dataset', methods=['POST'])
def upload_dataset():
    print('--------------')
    name = request.form['name']
    initiative = request.form['initiative']
    print(request.form['name'])
    print(request.form['initiative'])
    # print(request.data['name'])
    # print(request.data['initiative'])
    print('--------------')

    filename = 'initiative'
    initiative.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))




    test = {'hi': 'post'}
    ret = json.dumps(test)

    return ret

if __name__ == '__main__':
    app.jinja_env.auto_reload = True
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.run(debug=True)

# test google cloud storage
# run_storage()
