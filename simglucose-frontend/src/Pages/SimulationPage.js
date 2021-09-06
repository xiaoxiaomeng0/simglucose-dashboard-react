import { useState, useEffect } from "react";
import SimulationForm from "../Components/SimulationForm";
import RenderLineChart from "../Components/Chart";
import useForm from "../Components/useForm";

export const SimulationPage = () => {
  const { handleChange, values, customPatientHandleChange } = useForm();
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(
      `http://127.0.0.1:5004/results/${values.experiment_name}/` +
        escape("adolescent#001")
    )
      .then((response) => response.json())
      .then((resp) => {
        setResults(resp);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <SimulationForm
        values={values}
        handleChange={handleChange}
        customPatientHandleChange={customPatientHandleChange}
      />
      <RenderLineChart listOfResults={results} />
    </>
  );
};
