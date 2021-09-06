import React from "react";
import ExpName from "./FormHelpers/ExpName";
import SimTime from "./FormHelpers/SimTime";
import SelectScenario from "./FormHelpers/SelectScenario";
import SelectPatients from "./FormHelpers/SelectPatients";
import SelectSensor from "./FormHelpers/SelectSensor";
import SelectPumpControllerAnimatePara from "./FormHelpers/SelectPumpControllerAnimatePara";
import SelectSavedPath from "./FormHelpers/SelectSavedPath";

import "bootstrap/dist/css/bootstrap.min.css";

function SimulationForm(props) {
  const { handleChange, values, customPatientHandleChange } = props;

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:5004/simulate", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(console.log(values))
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <ExpName values={values} handleChange={handleChange} />
      <SimTime values={values} handleChange={handleChange} />
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
