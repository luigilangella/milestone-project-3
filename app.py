import os
from flask import Flask, render_template, redirect, request, url_for
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

app = Flask(__name__)

app.config["MONGO_DBNAME"] = 'expense-tracker'
app.config["MONGO_URI"] = 'mongodb+srv://luigi76langella:Marilena7376@myfirstcluster-m2dp9.mongodb.net/expense-tracker?retryWrites=true&w=majority'

mongo = PyMongo(app)

@app.route('/')
@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html',  categories=mongo.db.categories.find())

if __name__ == '__main__':
    app.run(host=os.environ.get('IP'),
            port=(os.environ.get('PORT')),
            debug=True)