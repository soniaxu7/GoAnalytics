import json
import os
import pandas as pd
from flask import Flask, render_template, request
from goa.process.gorim import get_relations_helper

# set static folder that all the users can visit
app = Flask(__name__, static_folder='dist')

UPLOAD_FOLDER = 'dataset'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# response when frontend first time requests the page
@app.route("/")
@app.route("/upload")
def index():
    return render_template('index.html')

@app.route("/p/<name>")
def dataset_page(name):
    return render_template('index.html')

# upload dataset and stores in the "dataset" folder
@app.route('/api/upload_dataset', methods=['POST'])
def upload_dataset():
    # retrieves request data
    name = request.form['name'].lower()
    initiative = request.files['initiative']
    regulation = request.files['regulation']
    society = request.files['society']

    # use "os" to let this code works in both Windows and Mac/Linux
    initiative.save(os.path.join(app.config['UPLOAD_FOLDER'], name + '_initiative.csv'))
    regulation.save(os.path.join(app.config['UPLOAD_FOLDER'], name + '_regulation.csv'))
    society.save(os.path.join(app.config['UPLOAD_FOLDER'], name + '_society.csv'))

    data = {
        'Initiative': name + '_initiative.csv',
        'Regulation': name + '_regulation.csv',
        'Society': name + '_society.csv'
    }
    ret = json.dumps(data)

    return ret

@app.route('/api/get_column_names', methods=['GET'])
def get_column_names():
    name = request.args.get('name')

    # retrieve local CSV files by name
    initiative = pd.read_csv(os.path.join(app.config['UPLOAD_FOLDER'], name + '_initiative.csv'))
    initiative_columns = initiative.columns.tolist()
    regulation = pd.read_csv(os.path.join(app.config['UPLOAD_FOLDER'], name + '_regulation.csv'))
    regulation_columns = regulation.columns.tolist()
    society = pd.read_csv(os.path.join(app.config['UPLOAD_FOLDER'], name + '_society.csv'))
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
    # retrieves request data
    data = json.loads(request.data)
    name = data['name']
    initiative_columns = data['initiative']
    regulation_columns = data['regulation']
    society_columns = data['society']

    # retrieve years
    initiative = pd.read_csv(os.path.join(app.config['UPLOAD_FOLDER'], name + '_initiative.csv'))
    data_by_year = []
    for year in initiative['Year'].tolist():
        data_by_year.append({'year': year})

    # get data in Initiatives
    if len(initiative_columns) > 0:
        for col in initiative_columns:
            col_data = initiative[col].tolist()
            for i, row in enumerate(data_by_year):
                row['Initiative: ' + col] = col_data[i]

    # get data in Regulations
    if len(regulation_columns) > 0:
        regulation = pd.read_csv(os.path.join(app.config['UPLOAD_FOLDER'], name + '_regulation.csv'))
        for col in regulation_columns:
            col_data = regulation[col].tolist()
            for i, row in enumerate(data_by_year):
                row['Regulation: ' + col] = col_data[i]

    # get data in Society
    if len(society_columns) > 0:
        society = pd.read_csv(os.path.join(app.config['UPLOAD_FOLDER'], name + '_society.csv'))
        for col in society_columns:
            col_data = society[col].tolist()
            for i, row in enumerate(data_by_year):
                row['Society: ' + col] = col_data[i]

    ret = json.dumps(data_by_year)

    return ret


@app.route('/api/get_years', methods=['GET'])
def get_years():
    name = request.args.get('name')

    # get Years in any model
    initiative = pd.read_csv(os.path.join(app.config['UPLOAD_FOLDER'], name + '_initiative.csv'))
    years = initiative['Year'].tolist()

    ret = json.dumps(years)

    return ret


@app.route('/api/get_year_data', methods=['GET'])
def get_year_data():
    name = request.args.get('name')
    type = request.args.get('type')
    year = int(request.args.get('year'))

    # get data from selected year and type of model
    csv_file = pd.read_csv(os.path.join(app.config['UPLOAD_FOLDER'], name + '_' + type + '.csv'))
    csv_file.set_index('Year', inplace=True)

    # pre defined key of Canada states
    ca_states = ['ca-5682', 'ca-bc', 'ca-nu',
     'ca-nt', 'ca-ab', 'ca-nl', 'ca-sk', 'ca-mb',
     'ca-qc', 'ca-on', 'ca-nb', 'ca-ns', 'ca-pe',
     'ca-yt']

    # get target data
    data = []
    for state in ca_states:
        num = int(csv_file.loc[year, state])
        data.append([state, num])

    ret = json.dumps({'data': data})

    return ret


@app.route('/api/get_relations', methods=['GET'])
def get_relations():
    name = request.args.get('name')

    # get correlation data by helper functions
    ret = get_relations_helper(name)

    return ret
