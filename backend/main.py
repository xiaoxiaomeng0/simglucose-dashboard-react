import datetime
from flask import Flask, render_template, url_for, request, redirect, jsonify, flash
from flask_login.utils import login_required
import requests
# from static.util.catch_keyerror import catch_keyerror
from static.util.selection import select_path, select_parallel, select_scenario, build_env, select_controller, select_patient
from sim_engine import SimObj, batch_sim
from models import Result, db, app, ResultSchema, Experiment, ExperimentSchema
from flask_login import login_user, LoginManager, current_user, logout_user, login_required
from forms import RegisterForm, LoginForm
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta, datetime
from flask_cors import CORS
import copy
import pkg_resources
import pandas as pd
import platform


# Init schema
result_schema = ResultSchema()
results_schema = ResultSchema(many=True)

experiment_schema = ExperimentSchema()


PATIENT_PARA_FILE = pkg_resources.resource_filename(
    'simglucose', 'params/vpatient_params.csv')
patient_params = pd.read_csv(PATIENT_PARA_FILE)


@app.route("/all_results")
def show_all_results():
    all_results = Result.query.all()
    return results_schema.jsonify(all_results)

@app.route("/<experiment_name>")
def show_curr_experiment(experiment_name):
    curr_experiment = Experiment.query.filter_by(
        experiment_name=experiment_name).first()
    db.session.commit()
    return experiment_schema.jsonify(curr_experiment)

@app.route("/results/<experiment_name>")
def show_curr_experiment_results(experiment_name):
    curr_experiment = Experiment.query.filter_by(
        experiment_name=experiment_name).first()
    all_results = Result.query.filter_by(
        experiment_id=curr_experiment.id).all()
    db.session.commit()
    # db.session.close()
    return results_schema.jsonify(all_results)


@app.route("/simulate", methods=["POST"])
def simulate():
    print(request.json)
    
    experiment_name = request.json["experiment_name"]
    time = datetime.now()
    new_experiment = Experiment(
        experiment_name=experiment_name, time=time, status="pending")
    db.session.add(new_experiment)
    db.session.commit()
    sim_time = timedelta(hours=float(request.json["sim_time"]))
    scenario, start_time = select_scenario()
    controller = select_controller()
    save_path = select_path()
    parallel = select_parallel()
    envs = build_env(scenario, start_time)
    ctrllers = [copy.deepcopy(controller) for _ in range(len(envs))]
    sim_instances = [SimObj(e,
                            c,
                            sim_time,
                            path=save_path) for (e, c) in zip(envs, ctrllers)]
    
    batch_sim(sim_instances, experiment_name, parallel=parallel)

    return ""

    


@app.route("/test")
def test():
    return render_template("test.html")


@app.route("/view")
def view_result():
    return render_template("view.html")


if __name__ == "__main__":
    app.run(debug=True, port=5004)
