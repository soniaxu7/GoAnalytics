import json
import os
import csv
from flask import Flask, render_template, request, Response
import pandas as pd
import numpy

from goa.process.gorim import get_relations_helper

# from goa.storage.storage import run_storage

app = Flask(__name__, static_folder='./dist',)

UPLOAD_FOLDER = './dataset'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/")
@app.route("/upload")
@app.route("/viz")
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

@app.route('/api/get_column_names', methods=['GET'])
def get_column_names():
    name = request.args.get('name')

    initiative = pd.read_csv('./dataset/' + name + '_initiative.csv')
    initiative_columns = initiative.columns.tolist()
    regulation = pd.read_csv('./dataset/' + name + '_regulation.csv')
    regulation_columns = regulation.columns.tolist()
    society = pd.read_csv('./dataset/' + name + '_society.csv')
    society_columns = society.columns.tolist()

    data = {
        'name': name,
        'initiative_columns': initiative_columns,
        'regulation_columns': regulation_columns,
        'society_columns': society_columns
    }
    ret = json.dumps(data)

    return ret


@app.route('/api/get_column_data', methods=['GET', 'POST'])
def get_column_data():
    # space %20
    # name = request.args.get('name')
    # name = 'Hello_world'

    data = json.loads(request.data)
    name = data['name']
    initiative_columns = data['initiative']
    regulation_columns = data['regulation']
    society_columns = data['society']

    print('---------', data)

    initiative = pd.read_csv('./dataset/' + name + '_initiative.csv')
    data_by_year = []
    for year in initiative['Year'].tolist():
        data_by_year.append({'year': year})

    if len(initiative_columns) > 0:
        for col in initiative_columns:
            col_data = initiative[col].tolist()
            for i, row in enumerate(data_by_year):
                row['Initiative: ' + col] = col_data[i]

    if len(regulation_columns) > 0:
        regulation = pd.read_csv('./dataset/' + name + '_regulation.csv')
        for col in regulation_columns:
            col_data = regulation[col].tolist()
            for i, row in enumerate(data_by_year):
                row['Regulation: ' + col] = col_data[i]


    if len(society_columns) > 0:
        society = pd.read_csv('./dataset/' + name + '_society.csv')
        for col in society_columns:
            col_data = society[col].tolist()
            for i, row in enumerate(data_by_year):
                row['Society: ' + col] = col_data[i]

    ret = json.dumps(data_by_year)

    return ret


@app.route('/api/get_years', methods=['GET'])
def get_years():
    name = request.args.get('name')

    initiative = pd.read_csv('./dataset/' + name + '_initiative.csv')
    years = initiative['Year'].tolist()

    ret = json.dumps(years)

    return ret


@app.route('/api/get_year_data', methods=['GET'])
def get_year_data():
    name = request.args.get('name')
    type = request.args.get('type')
    year = int(request.args.get('year'))

    file = pd.read_csv('./dataset/' + name + '_' + type + '.csv')
    file.set_index('Year', inplace=True)

    print(file.loc[year, 'ca-bc'])

    ca_states = ['ca-5682', 'ca-bc', 'ca-nu',
     'ca-nt', 'ca-ab', 'ca-nl', 'ca-sk', 'ca-mb',
     'ca-qc', 'ca-on', 'ca-nb', 'ca-ns', 'ca-pe',
     'ca-yt']

    data = []
    for state in ca_states:
        num = int(file.loc[year, state])
        data.append([state, num])

    ret = json.dumps({'data': data})

    return ret


# @app.route('/api/get_csv', methods=['GET'])
# def get_csv():
#     with open('./dataset/Hello_world_initiative.csv') as csvfile:
#         file = csv.reader(csvfile)
#         return Response(
#             file,
#             mimetype="text/csv",
#             headers={"Content-disposition":
#                      "attachment; filename=Hello_world_initiative.csv"})


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
