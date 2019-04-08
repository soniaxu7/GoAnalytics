import pandas as pd
import json

UPLOAD_FOLDER = './dataset/'

def get_relations_helper(name):
    init = pd.read_csv(UPLOAD_FOLDER + name + '_initiative.csv')
    regu = pd.read_csv(UPLOAD_FOLDER + name + '_regulation.csv')
    society = pd.read_csv(UPLOAD_FOLDER + name + '_society.csv')

    join = pd.merge(init, regu, on='Year', how='outer')
    join = pd.merge(join, society, on='Year', how='outer')

    # look into merged tables
    join.to_csv('./dataset/merged_Hello_world.csv', sep='\t', encoding='utf-8')

    # remove column 'Year'
    columns = list(join.columns)
    columns.remove('Year')
    merged = join[columns].copy()

    # print('--------', merged[merged.corr().notnull()])


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
