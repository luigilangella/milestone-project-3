import os
from flask import Flask, render_template, redirect, request, url_for
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from bson.json_util import dumps

app = Flask(__name__)

app.config["MONGO_DBNAME"] = 'expense-tracker'
app.config["MONGO_URI"] = os.environ.get('MONGO_URI')

mongo = PyMongo(app)

data = dumps(mongo.db.categories.find())


with open('static/data.json', 'w') as file:  # Use file to refer to the file object

   file.write(data)

@app.route('/')
@app.route('/dashboard')
def dashboard():
    all_categories = mongo.db.categories.find()
    return render_template('dashboard.html',  categories=all_categories)

@app.route('/addExpense')
def addExpense():
    all_categories = mongo.db.categories.find()
    return render_template('addExpense.html', categories=all_categories)

@app.route('/insertExpense', methods=['POST'])
def insertExpense():
    result = request.form.to_dict()
    print(result)
    mongo.db.categories.update_one({}, result)
    return redirect(url_for('dashboard'))

@app.route('/addCategory')
def addCategory():
    return render_template('addCategory.html')

if __name__ == '__main__':
    app.run(host=os.environ.get('IP'),
            port=(os.environ.get('PORT')),
            debug=True)
    url_for('static', filename='data.json')
