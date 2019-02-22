import pandas as pd
import json

def gorim():
    init = pd.read_csv('dataset/initiative.csv')
    regu = pd.read_csv('dataset/regulation.csv')
    society = pd.read_csv('dataset/society.csv')

    join = pd.merge(init, regu, on='Year')
    join = pd.merge(join, society, on='Year')

    corr = join.corr().abs().unstack().sort_values().drop_duplicates()

    data = json.loads(corr.to_json(orient='split'))
    n = len(data['index'])

    print(data)

    res = []
    for i in range(n):
        res.append([data['index'][i][0], data['index'][i][1], str(data['data'][i])])

    return res
