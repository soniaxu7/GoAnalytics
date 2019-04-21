import pandas as pd
import json

# all the uploaded dataset should be in this folder
UPLOAD_FOLDER = './dataset/'

# add prefix to the column names
def get_formatted_column_names(dataset, prefix):
    columns = list(dataset.columns.values)
    formatted_names = dict()
    for name in columns:
        if name == 'Year':
            formatted_names[name] = name
        else:
            formatted_names[name] = prefix + name

    return formatted_names

# get correlation results of the current dataset
def get_relations_helper(name):
    init = pd.read_csv(UPLOAD_FOLDER + name + '_initiative.csv', encoding="utf-8")
    regu = pd.read_csv(UPLOAD_FOLDER + name + '_regulation.csv', encoding="utf-8")
    society = pd.read_csv(UPLOAD_FOLDER + name + '_society.csv', encoding="utf-8")

    # add prefix to the column names
    init_cols = get_formatted_column_names(init, 'Initiative: ')
    init.rename(columns=init_cols,inplace=True)
    regu_cols = get_formatted_column_names(regu, 'Regulation: ')
    regu.rename(columns=regu_cols,inplace=True)
    society_cols = get_formatted_column_names(society, 'Society: ')
    society.rename(columns=society_cols,inplace=True)

    # merge 3 tables into one dataset in order to calculate correlation
    join = pd.merge(init, regu, on='Year', how='outer')
    join = pd.merge(join, society, on='Year', how='outer')

    # Check merged dataset as CSV file
    # join.to_csv('./dataset/merged_Hello_world.csv', sep='\t', encoding='utf-8')

    # remove column 'Year' because this is meaningless in correlation
    columns = list(join.columns)
    columns.remove('Year')
    merged = join[columns].copy()

    # When use corr() in Pandas, sometimes there are NaN values in the result
    # NaN issues: https://stackoverflow.com/questions/51995703/python-nan-values-in-df-corr
    corr = merged.corr().abs().unstack().sort_values().drop_duplicates()

    # format return data as Json format
    data = json.loads(corr.to_json(orient='split'))
    corr_data = []
    n = len(data['index'])
    for i in range(n):
        corr_data.append({
            'col_1': data['index'][i][0],
            'col_2': data['index'][i][1],
            'correlation': str(data['data'][i])
        })

    res = json.dumps(corr_data)

    return res
