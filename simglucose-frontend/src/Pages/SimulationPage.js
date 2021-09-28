import { useState, useEffect, useRef } from "react";
import SimulationForm from "../Components/SimulationForm";
import ChartSection from "../Components/Chart";
import useForm from "../Components/useForm";

export const SimulationPage = () => {
  const { handleChange, values, customPatientHandleChange } = useForm();
  const [results, setResults] = useState([]);
  const [currentPatient, setCurrentPatient] = useState("");
  //   const [experimentStatus, setExperimentStatus] = useState("pending");
  const [experimentName, setExperimentName] = useState("");
  const experimentNameRef = useRef();

  const experimentNameData = {
    experiment_name: experimentName,
  };
  const changeExperimentName = () => {
    setExperimentName(experimentNameRef.current.value);
  };
  // const enteredExperimentName =
  // const fetchExperimentInterval = () => {
  //     if (values.experiment_name) {
  //         const refreshID = setInterval(() => {
  //             fetch(
  //                 `http://127.0.0.1:5004/${values.experiment_name}`
  //             )
  //                 .then((response) => response.json())
  //                 .then((resp) => {
  //                     setExperimentStatus(resp.status);
  //                 })
  //                 .catch((error) => console.log(error))
  //             if (experimentStatus == "completed") {
  //                 clearInterval(refreshID)
  //             }
  //        }, 1000)
  //     }
  // }
  //   useEffect(() => {
  //     if (values.experiment_name) {
  //       const refreshID = setInterval(() => {
  //         fetch(`http://127.0.0.1:5004/${values.experiment_name}`)
  //           .then((response) => response.json())
  //           .then((resp) => {
  //             setExperimentStatus(resp.status);
  //           })
  //           .catch((error) => console.log(error));
  //         fetch(
  //           `http://127.0.0.1:5004/results/${values.experiment_name}/adolescent%23001`
  //         )
  //           .then((response) => response.json())
  //           .then((resp) => {
  //             setResults(resp);
  //           })
  //           .catch((error) => console.log(error));
  //         if (experimentStatus == "completed") {
  //           clearInterval(refreshID);
  //         }
  //         return () => {
  //           clearInterval(refreshID);
  //         };
  //       }, 1000);
  //     }
  //   }, [values.experiment_name, experimentStatus]);

  //   const id = setInterval(() => {
  //     fetch(
  //       `http://127.0.0.1:5004/results/${values.experiment_name}/adolescent%23001`
  //     )
  //       .then((response) => response.json())
  //       .then((resp) => {
  //         setResults(resp);
  //         console.log(resp);
  //       })
  //       .catch((error) => console.log(error));
  //   }, 1000);
  //   return () => {
  //     clearInterval(id);
  //   };
  // }, [values.experiment_name]);

  //
  return (
    <>
      <SimulationForm
        values={values}
        handleChange={handleChange}
        customPatientHandleChange={customPatientHandleChange}
        experimentNameData={experimentNameData}
        experimentNameRef={experimentNameRef}
        changeExperimentName={changeExperimentName}
      />

      <ChartSection listOfResults={results} currentPatient={currentPatient} />
    </>
  );
};
