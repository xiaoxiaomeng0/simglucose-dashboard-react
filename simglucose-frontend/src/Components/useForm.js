import { useState } from "react";
import AddPatient from "../Util/patientList";

const patient_list = AddPatient();
const init_patient_object = {};
for (let p of patient_list) {
  init_patient_object[p] = "";
}

const useForm = () => {
  const [values, setValues] = useState({
    experiment_name: "",
    sim_time: "",
    start_time: "1:00",
    start_period: "AM",
    scenario: "1",
    random_seed: "",
    breakfast_time: "1:00",
    breakfast_period: "AM",
    breakfast_size: "",
    lunch_time: "1:00",
    lunch_period: "AM",
    lunch_size: "",
    dinner_time: "1:00",
    dinner_period: "AM",
    dinner_size: "",
    snack_time: "1:00",
    snack_period: "AM",
    snack_size: "",
    adults: "",
    adolescents: "",
    children: "",
    custom_patient: "",
    sensor: "Dexcom",
    seed_noise: "",
    pump: "Cozmo",
    controller: "basal-bolus",
    parallel: "False",
    path: "default",
  });

  //   const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "checkbox" && !e.target.checked) {
      setValues({ ...values, [name]: "" });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const customPatientHandleChange = (e) => {
    const { name, value } = e.target;

    if (!e.target.checked) {
      setValues({
        ...values,
        [name]: "",
      });
    } else {
      setValues({
        ...values,
        [name]: value,
        ["adolescents"]: "",
        ["adults"]: "",
        ["children"]: "",
      });
    }
  };

  return {
    values,
    handleChange,
    customPatientHandleChange,
  };
};
export default useForm;
