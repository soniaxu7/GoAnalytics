import json
import os
import csv
from flask import Flask, render_template, request, Response

from goa.process.gorim import get_relations_helper

# from goa.storage.storage import run_storage

app = Flask(__name__, static_folder='./dist',)
UPLOAD_FOLDER = './dataset'
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
    test = {'hi': 'get'}
    ret = json.dumps(test)

    return ret

@app.route('/api/upload_dataset', methods=['POST'])
def upload_dataset():
    name = request.form['name'].lower()
    initiative = request.files['initiative']
    regulation = request.files['regulation']
    society = request.files['society']

    initiative.save(os.path.join(app.config['UPLOAD_FOLDER'], name + '_initiative.csv'))
    regulation.save(os.path.join(app.config['UPLOAD_FOLDER'], name + '_regulation.csv'))
    society.save(os.path.join(app.config['UPLOAD_FOLDER'], name + '_society.csv'))

    test = {'hi': 'post'}
    ret = json.dumps(test)

    return ret

@app.route('/api/get_csv', methods=['GET'])
def get_csv():
    with open('./dataset/Hello_world_initiative.csv') as csvfile:
        file = csv.reader(csvfile)
        return Response(
            file,
            mimetype="text/csv",
            headers={"Content-disposition":
                     "attachment; filename=Hello_world_initiative.csv"})


if __name__ == '__main__':
    app.jinja_env.auto_reload = True
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.run(debug=True)

@app.route('/api/get_relations', methods=['GET'])
def get_relations():
    name = request.args.get('name')

    print(name)

    ret = get_relations_helper(name)

    return ret

# test google cloud storage
# run_storage()
