## Introduction
GoAnalytics, is a single page applicaiton which is support GoRIM model. It provides upload CSV files, find aggregations and correlations, visualize trend as well as display Canada map by data.

## Requirements
### Backend
- Environment: Python 3.7
- pip3
- Dependecies: [requirement.txt](https://github.com/soniaxu7/GoAnalytics/blob/master/documents/requirement.txt.md)
- Entry backend file: ```/main.py``
- Entry HTML file: ``/templates/index.html``

For more information about backend file structure, pleaes refer to documents [here](https://github.com/soniaxu7/GoAnalytics/blob/master/documents/backend.file.structure.md).

### Frontend
- Environment: Node >= 10.15.3
- NPM >= 6.4. 1
- Dependecies: [package.json](https://github.com/soniaxu7/GoAnalytics/blob/master/documents/package.json.md)
- Entry JS file: /static/

For more information about frontend file structure, pleaes refer to documents [here](https://github.com/soniaxu7/GoAnalytics/blob/master/documents/frontend.file.structure.md).

## Install Dependencies
1. Python Dependencies: First create an virtual environment (such as "evn") in your local repository, then instal all the dependencies using ``pip3``.
```
python3 -m venv env
source env/bin/activate
pip3 install  -r requirements.txt
```
2. JavaScript Dependencies
```
npm install
```

## Running in local machine (auto reload)
1. Backend
```
npm run flask
```
2. Frontend
```
npm start
```
3. After successfully installed dependencies, visit your application on [here](http://localhost:5000).

## Demo
#### Upload page
<div>
  <img width="600" src="https://github.com/soniaxu7/GoAnalytics/blob/master/documents/images/upload_page.png">
<div>

#### Trend page
<div>
  <img width="600" src="https://github.com/soniaxu7/GoAnalytics/blob/master/documents/images/trend_page.png">
<div>

## Note
As long as all the dependencies are installed correctly, the applciation can be run and deployed in any platform not limited to MacOS.

## Author
[Sonia Xu](mailto:soniaxu7@foxmail.com)
