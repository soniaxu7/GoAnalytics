## Requirements
1. Google Cloud Server (Flask on App Engine)
2. python3.7 (python 2.7 will be deprecated from 2020)

## Remote Google Cloud server URL
[Click Here](http://starlit-granite-232504.appspot.com)

## Installation
[Google Cloud doc](https://cloud.google.com/appengine/docs/standard/python/getting-started/python-standard-env)

a. Create an isolated Python environment in a directory external to your project and activate it
```
python3 -m venv env
source env/bin/activate
```

b.Navigate to your project directory and install dependencies:
```
pip3 install  -r requirements.txt
```


## Running in local machine (auto reload)
```
export FLASK_APP=main.py
export FLASK_DEBUG=1
python -m flask run
```

## Initiate Google Cloud
```
gcloud init
```

## Push to the remote server
```
gcloud app deploy
```

## Author
[Sonia Xu](mailto:soniaxu7@foxmail.com)

