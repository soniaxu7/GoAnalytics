import pandas as pd
import json

UPLOAD_FOLDER = './dataset/'

# NaN issue: https://stackoverflow.com/questions/51995703/python-nan-values-in-df-corr


def get_formatted_column_names(dataset, prefix):
    columns = list(dataset.columns.values)
    formatted_names = dict()
    for name in columns:
        if name == 'Year':
            formatted_names[name] = name
        else:
            formatted_names[name] = prefix + name

    return formatted_names


def get_relations_helper(name):
    init = pd.read_csv(UPLOAD_FOLDER + name + '_initiative.csv', encoding = "utf-8")
    regu = pd.read_csv(UPLOAD_FOLDER + name + '_regulation.csv', encoding = "utf-8")
    society = pd.read_csv(UPLOAD_FOLDER + name + '_society.csv', encoding = "utf-8")

    init_cols = get_formatted_column_names(init, 'Initiative: ')
    init.rename(columns=init_cols,inplace=True)

    regu_cols = get_formatted_column_names(regu, 'Regulation: ')
    regu.rename(columns=regu_cols,inplace=True)

    society_cols = get_formatted_column_names(society, 'Society: ')
    society.rename(columns=society_cols,inplace=True)

    join = pd.merge(init, regu, on='Year', how='outer')
    join = pd.merge(join, society, on='Year', how='outer')

    # Save merged dataset as CSV file
    # join.to_csv('./dataset/merged_Hello_world.csv', sep='\t', encoding='utf-8')

    # remove column 'Year'
    columns = list(join.columns)
    columns.remove('Year')
    merged = join[columns].copy()

    corr = merged.corr().abs().unstack().sort_values().drop_duplicates()

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
