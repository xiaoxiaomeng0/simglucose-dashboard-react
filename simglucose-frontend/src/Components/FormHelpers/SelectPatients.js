import React from "react";
import AddPatient from "../../Util/patientList";

function SelectPatients(props) {
  const { values, handleChange, customPatientHandleChange } = props;
  const patient_list = AddPatient();

  return (
    <div>
      <label>Please select virtual patients:</label>
      <input
        type="checkbox"
        value="1"
        id="adolescents"
        name="adolescents"
        checked={values.adolescents}
        onChange={handleChange}
        disabled={values.custom_patient ? true : false}
      />
      <label htmlFor="adolescents">All Adolescents</label>
      <input
        type="checkbox"
        value="2"
        id="adults"
        name="adults"
        checked={values.adults}
        onChange={handleChange}
        disabled={values.custom_patient ? true : false}
      />
      <label htmlFor="adults">All Adults</label>
      <input
        type="checkbox"
        value="3"
        id="children"
        name="children"
        checked={values.children}
        onChange={handleChange}
        disabled={values.custom_patient ? true : false}
      />
      <label htmlFor="children">All Children</label>
      <input
        type="checkbox"
        value="4"
        id="custom_patient"
        name="custom_patient"
        checked={values.custom_patient}
        onChange={customPatientHandleChange}
      />
      <label htmlFor="custom_patient">By Patient ID</label>
      {values.custom_patient ? (
        <div>
          {patient_list.map((patient) => {
            return (
              <div key={patient}>
                <input
                  type="checkbox"
                  id={patient}
                  name={patient}
                  value={patient}
                  onChange={handleChange}
                />
                <label htmlFor={patient}>{patient}</label>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default SelectPatients;
