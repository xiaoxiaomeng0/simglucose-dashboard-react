from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
# from flask_login import UserMixin
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
try:
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:iaoeng@localhost:5432/simglucose'
except:
    print("connection error")

app.config['SECRET_KEY'] = '8BYkEfBA6O6donzWlSihBXox7C0sKRed'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)

class Result(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.String, nullable=False)
    time = db.Column(db.DateTime, nullable=False)
    reward = db.Column(db.Float, nullable=False)
    cgm = db.Column(db.Float)
    cho = db.Column(db.Float)
    insulin = db.Column(db.Float)
    bg = db.Column(db.Float)
    lbgi = db.Column(db.Float)
    hbgi = db.Column(db.Float)
    risk = db.Column(db.Float)
    experiment_id = db.Column(db.Integer, db.ForeignKey(
        "experiment.id"), nullable=False)

    def __repr__(self):
        return f"Results(Time = {self.time}, Patient_ID = {self.patient_id}), BG = {self.bg}, \
        CGM = {self.cgm}, CHO = {self.cho}, reward = {self.reward}\
        INSULIN = {self.insulin}, LBGI = {self.lbgi}, \
        HBGI = {self.hbgi}, RISK = {self.risk}, experiment_id = {self.experiment_id}"


class ResultSchema(ma.Schema):
    class Meta:
        fields = ('result_id', 'patient_id', 'time', 'bg', 'cgm',
                  'cho', 'lbgi', 'hbgi', 'insulin', 'risk', "experiment_id")


class Experiment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    experiment_name = db.Column(db.String, unique=True, nullable=False)
    time = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String, nullable=False)
    results = db.relationship("Result", backref="experiment", lazy=True)

class ExperimentSchema(ma.Schema):
    class Meta:
        fields = ('experiment_id', "experiment_name", "time", "status")




# class User(UserMixin, db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String, unique=True, nullable=False)
#     email = db.Column(db.String, unique=True, nullable=False)
#     password = db.Column(db.String, nullable=False)



db.create_all()
Result.query.delete()
Experiment.query.delete()
db.session.commit()
