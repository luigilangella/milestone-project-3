import os, json, datetime
from dateutil.parser import parse
from flask import Flask, render_template, redirect, request, url_for
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from bson.json_util import dumps

app = Flask(__name__)

app.config["MONGO_DBNAME"] = 'ExpenceTracker'
app.config["MONGO_URI"] = os.environ['MONGO_URI']
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

mongo = PyMongo(app)

@app.route('/')
@app.route('/dashboard')
def dashboard():
    all_categories = mongo.db.expense_categories.find()
    income_categories = mongo.db.income_categories.find()
    data1 = dumps(all_categories)
    data2 = dumps(income_categories)
    all_data = json.loads(data1,encoding=list)
    all_data1 = json.loads(data2)
    data = all_data + all_data1
    with open('static/data/data.json', 'w') as file:
        file.write(dumps(data))
    all_categories = mongo.db.expense_categories.find()
    income_categories = mongo.db.income_categories.find()
    return render_template('dashboard.html', categories=all_categories, income_categories=income_categories)


@app.route('/addIncome/')
def addIncome():
    income_categories = mongo.db.income_categories.find()
    return render_template('addIncome.html', income_categories=income_categories, dateNow=datetime.date.today(),
                                              timeNow=datetime.datetime.now().time().strftime('%H:%M:%S'))

@app.route('/insertIncome', methods=['POST'])
def insertIncome():
    space = " "
    all_categories = mongo.db.income_categories
    dateTime = request.form.get('date'), request.form.get('time')
    all_categories.update({'name':request.form.get('name')},{'$set':
    {
        'name':request.form.get('name'),
        'description':request.form.get('description'),
        'date': parse(space.join(dateTime))
    },'$inc': {'value': float(request.form.get('value'))}})
    
    return redirect(url_for('dashboard'))

@app.route('/addExpense/')
def addExpense():
    all_categories = mongo.db.expense_categories.find()
    return render_template('addExpense.html', categories=all_categories, dateNow=datetime.date.today(),
                                              timeNow=datetime.datetime.now().time().strftime('%H:%M:%S'))

@app.route('/insertExpense', methods=['POST'])
def insertExpense():
    space = " "
    all_categories = mongo.db.expense_categories
    dateTime = request.form.get('date'), request.form.get('time')
    all_categories.update({'name':request.form.get('name')},{'$set':
    {
        'name':request.form.get('name'),
        'description':request.form.get('description'),
        'date': parse(space.join(dateTime))
    },'$inc': {'ammount': -float(request.form.get('ammount'))}})
    
    return redirect(url_for('dashboard'))


@app.route('/addCategory')
def addCategory():
    field = mongo.db
    return render_template('addCategory.html', expense_field=field.expense_categories.name, income_field=field.income_categories.name)


@app.route('/insert_category', methods=['POST'])
def insert_category():
    category_doc = {'name': request.form.get('category_name')}
    if (request.form.get('fields')) == 'expense_category':
        mongo.db.expense_categories.insert_one(category_doc)
    else:
        mongo.db.income_categories.insert_one(category_doc)
    return redirect(url_for('dashboard'))

@app.route('/editCategory')
def editCategory():
    all_categories = mongo.db.expense_categories.find()
    income = mongo.db.income_categories.find()
    return render_template('editCategory.html', categories=all_categories, income_categories=income)

@app.route('/reset_category/<category_id>')
def reset_category(category_id):
    
    if mongo.db.expense_categories.find_one(ObjectId(category_id)):
        mongo.db.expense_categories.update_many({'_id': ObjectId(category_id)},{'$set':
        {
            'description':'',
            'date': '',
            'ammount': float(0)
        }})
    else:
         mongo.db.income_categories.update_many({'_id': ObjectId(category_id)},{'$set':
        {
            'description':'',
            'date': '',
            'ammount': float(0)
        }})
    return redirect(url_for('dashboard'))

@app.route('/delete_category/<category_id>')
def delete_category(category_id):
    if mongo.db.expense_categories.find_one(ObjectId(category_id)):
        mongo.db.expense_categories.remove({'_id': ObjectId(category_id)})
    else:
        mongo.db.income_categories.remove({'_id': ObjectId(category_id)})
    return redirect(url_for('dashboard'))

if __name__ == '__main__':
    app.run(host=os.environ.get('IP'),
            port=(os.environ.get('PORT')),
            debug=True)
    url_for('static', filename='data/data.json')
