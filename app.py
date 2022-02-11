from flask import Flask, render_template, request
import time 
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Charla21@localhost/final-project'
db = SQLAlchemy(app)


class Data(db.Model):
    __tablename__ = "customers"
    customer_id = db.Column(db.Integer, primary_key = True)
    firstName = db.Column(db.String(120))
    lastName = db.Column(db.String(120))
    email = db.Column(db.String(120), unique = True)
    

    def __init__(self, firstName, lastName, email):
        self.firstName = firstName
        self.lastName = lastName
        self.email = email



@app.route("/")
def index():
    return render_template("index.html")

   
@app.route("/submit", methods = ['POST'])
def thankyou():
    if request.method == 'POST':
        firstName = request.form["firstName"]
        lastName = request.form["lastName"]
        email=request.form["email"]

        data = Data(firstName, lastName, email)
        db.session.add(data)
        db.session.commit()
        return render_template('thankyou.html')


@app.route("/budget")
def budget():
    return render_template("budget.html")
    

if __name__ == '__main__':
    app.run(debug = True)





