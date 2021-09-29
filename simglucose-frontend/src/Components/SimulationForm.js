import React, { useRef } from "react";
import ExpName from "./FormHelpers/ExpName";
import SimTime from "./FormHelpers/SimTime";
import SelectScenario from "./FormHelpers/SelectScenario";
import SelectPatients from "./FormHelpers/SelectPatients";
import SelectSensor from "./FormHelpers/SelectSensor";
import SelectPumpControllerAnimatePara from "./FormHelpers/SelectPumpControllerAnimatePara";
import SelectSavedPath from "./FormHelpers/SelectSavedPath";

import useForm from "./useForm";

import "bootstrap/dist/css/bootstrap.min.css";

function SimulationForm({ changeExperimentName }) {
  const exprimtNameRef = useRef();
  const simTimeRef = useRef();
  const startTimeRef = useRef();
  const startPeriodRef = useRef();

  const { values, handleChange, customPatientHandleChange, setInitialValues } =
    useForm();

  const handleSubmit = (e) => {
    e.preventDefault();

    const submittedData = {
      ...values,
      experiment_name: exprimtNameRef.current.value,
      sim_time: simTimeRef.current.value,
      start_time: startTimeRef.current.value,
      start_period: startPeriodRef.current.value,
    };

    changeExperimentName(exprimtNameRef.current.value);

    fetch("http://127.0.0.1:5004/simulate", {
      method: "POST",
      body: JSON.stringify(submittedData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(console.log(submittedData))
      .catch((error) => console.log(error));

    setInitialValues();
    // exprimtNameRef.current.value = "";
    simTimeRef.current.value = "";
    startTimeRef.current.value = "";
    startPeriodRef.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <ExpName exprimtNameRef={exprimtNameRef} />
      <SimTime
        simTimeRef={simTimeRef}
        startTimeRef={startTimeRef}
        startPeriodRef={startPeriodRef}
      />
      <SelectScenario values={values} handleChange={handleChange} />
      <SelectPatients
        values={values}
        handleChange={handleChange}
        customPatientHandleChange={customPatientHandleChange}
      />
      <SelectSensor values={values} handleChange={handleChange} />
      <SelectPumpControllerAnimatePara
        values={values}
        handleChange={handleChange}
      />
      <SelectSavedPath values={values} handleChange={handleChange} />
      <button className="btn btn-primary">Submit</button>
    </form>
  );
}

export default SimulationForm;
