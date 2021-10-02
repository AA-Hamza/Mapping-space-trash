from flask import render_template,redirect,url_for
from website.models import Objects
from website import app


@app.route("/home",methods =['GET','POST'])
@app.route('/raw',methods =['GET'])
def raw():
    return render_template('raw.html',enumerate=enumerate,data=Objects.query.all(),title ='Raw Data')

@app.route('/model',methods =['GET','POST'])
def home():
    return redirect(url_for('raw'))
