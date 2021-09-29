import { useState } from "react";
import AddPatient from "../Util/patientList";

const patient_list = AddPatient();
// const init_patient_object = {};
// for (let p of patient_list) {
//   init_patient_object[p] = "";
// }

const useForm = () => {
  const initialValues = {
    adults: "",
    adolescents: "",
    children: "",
    custom_patient: "",
    sensor: "Dexcom",
    pump: "Cozmo",
    controller: "basal-bolus",
    parallel: "False",
    path: "default",
    scenario: "1",
    random_seed: "",
    seed_noise: "",
  };
  const [values, setValues] = useState(initialValues);

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
  const setInitialValues = () => {
    setValues(initialValues);
  };

  return {
    values,
    handleChange,
    customPatientHandleChange,
    setInitialValues,
  };
};
export default useForm;
