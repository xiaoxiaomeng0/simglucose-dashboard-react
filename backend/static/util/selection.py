import pkg_resources
import pandas as pd
from simglucose.controller.basal_bolus_ctrller import BBController
from werkzeug.wrappers import request
from flask import request
from simglucose.simulation.scenario_gen import RandomScenario
from simglucose.simulation.scenario import CustomScenario
from simglucose.sensor.cgm import CGMSensor
from simglucose.actuator.pump import InsulinPump
from simglucose.patient.t1dpatient import T1DPatient
from simglucose.simulation.env import T1DSimEnv
from datetime import datetime, timedelta
import os
import copy
import json
import numpy


PATIENT_PARA_FILE = pkg_resources.resource_filename(
    'simglucose', 'params/vpatient_params.csv')


def str2bool(s):
    if s == 'True':
        return True
    elif s == 'False':
        return False
    else:
        raise ValueError(f"{s} cannot be converted to boolean.")


def parsetime(s, period):
    date = datetime.now().date()
    s = str(date) + " " + s + period
    datetime_object = datetime.strptime(s, "%Y-%m-%d %I:%M%p")
    return datetime_object


def select_scenario():
    sim_start_hour = request.json["start_time"]
    sim_start_period = request.json["start_period"]
    if sim_start_period == "AM":
        convert_time = timedelta(hours=float(sim_start_hour.split(":")[0]))
    else:
        convert_time = timedelta(
            hours=(float(sim_start_hour.split(":")[0]) + 12))

    start_time = datetime.combine(datetime.now().date(),
                                  datetime.min.time()) + convert_time

    scenario_select = request.json["scenario"]
    if scenario_select == "1":
        rand_scenario_seed = int(
            request.json["random_seed"])
        scenario = RandomScenario(
            start_time=start_time, seed=rand_scenario_seed)
    elif scenario_select == "2":
        scenario_tuple = []
        breakfast_time = request.json.get("breakfast_time", None)
        breakfast_period = request.json.get("breakfast_period", None)
        breakfast_size = request.json.get("breakfast_size", None)
        if breakfast_time and breakfast_size:
            scenario_tuple.append(
                (parsetime(breakfast_time, breakfast_period), float(breakfast_size)))

        lunch_time = request.json.get("lunch_time", None)
        lunch_period = request.json.get("lunch_period", None)
        lunch_size = request.json.get("lunch_size", None)
        if lunch_time and lunch_size:
            scenario_tuple.append(
                (parsetime(lunch_time, lunch_period), float(lunch_size)))

        dinner_time = request.json.get("dinner_time", None)
        dinner_period = request.json.get("dinner_period", None)
        dinner_size = request.json.get("dinner_size", None)
        if dinner_time and dinner_size:
            scenario_tuple.append(
                (parsetime(dinner_time, dinner_period), float(dinner_size)))

        snack_time = request.json.get("snack_time", None)
        snack_period = request.json.get("snack_period", None)
        snack_size = request.json.get("snack_size", None)
        if snack_time and snack_size:
            scenario_tuple.append(
                (parsetime(snack_time, snack_period), float(snack_size)))

        scenario = CustomScenario(
            start_time=start_time, scenario=scenario_tuple)
    return scenario, start_time


def select_path():
    path = request.json["path"]
    if path == "custom":
        save_path = request.json["path_input"]
    elif path == "default" or path == "":
        foldername = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        save_path = os.path.join(os.path.abspath('./results/'), foldername)
    return save_path


def select_controller():
    controller = request.json["controller"]
    if controller == "basal-bolus":
        controller = BBController()
    return controller


def select_patient():
    adults = request.json.get("adults", None)
    adolescents = request.json.get("adolescents", None)
    children = request.json.get("children", None)
    custom_patient = request.json.get("custom_patient", None)
    patient_params = pd.read_csv(PATIENT_PARA_FILE)
    all_patient_names = list(patient_params["Name"].values)
    customed_patient_list = []
    if adolescents:
        customed_patient_list = all_patient_names[0:10]
    if adults:
        customed_patient_list = all_patient_names[10:20]
    if children:
        customed_patient_list = all_patient_names[20:30]
    if custom_patient:
        for p_name in all_patient_names:
            selected_patient = request.json.get(p_name, None)
            if selected_patient:
                customed_patient_list.append(selected_patient)
    return customed_patient_list

def select_parallel():
    parallel = request.json["parallel"]
    parallel = str2bool(parallel)
    return parallel


def build_env(scenario, start_time):
    patient_names = select_patient()
    cgm_sensor_name = request.json["sensor"]
    cgm_seed = int(request.json["seed_noise"])
    insulin_pump_name = request.json["pump"]

    def local_build_env(pname):
        patient = T1DPatient.withName(pname)
        cgm_sensor = CGMSensor.withName(cgm_sensor_name, seed=cgm_seed)
        insulin_pump = InsulinPump.withName(insulin_pump_name)
        scen = copy.deepcopy(scenario)
        env = T1DSimEnv(patient, cgm_sensor, insulin_pump, scen)
        return env

    envs = [local_build_env(p) for p in patient_names]
    return envs
