from flask import Flask, render_template, request

from goa.process.gorim import gorim
# from goa.storage.storage import run_storage

app = Flask(__name__, static_folder='./dist',)

@app.route("/")
@app.route("/upload")
@app.route("/p")
def index():
    return render_template('index.html')

@app.route('/test')
def gorim_test():
    data = gorim()

    return render_template(
        'gorim.html',
        data=data)

@app.route('/form')
def form():
    return render_template('form.html')

@app.route('/submitted', methods=['POST'])
def submitted_form():
    name = request.form['name']
    email = request.form['email']
    site = request.form['site_url']
    comments = request.form['comments']

    return render_template(
        'submitted_form.html',
        name=name,
        email=email,
        site=site,
        comments=comments)

if __name__ == '__main__':
    app.jinja_env.auto_reload = True
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.run(debug=True, host='0.0.0.0')

# test google cloud storage
# run_storage()



