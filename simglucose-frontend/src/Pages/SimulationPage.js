import { useState, useEffect, useRef } from "react";
import SimulationForm from "../Components/SimulationForm";
import ChartSection from "../Components/Chart";
import useForm from "../Components/useForm";

import AddPatient from "../Util/patientList";

const patient_list = AddPatient();

export const SimulationPage = () => {
  const [results, setResults] = useState([]);
  const [currentPatient, setCurrentPatient] = useState("");
  const [experimentName, setExperimentName] = useState("");

  const changeExperimentName = (name) => {
    setExperimentName(name);
  };
  useEffect(() => {
    if (experimentName) {
      const refreshID = setInterval(() => {
        fetch(`http://127.0.0.1:5004/${experimentName}`)
          .then((response) => response.json())
          .then((resp) => {
            if (resp.status === "pending") {
              fetch(`http://127.0.0.1:5004/results/${experimentName}`)
                .then((response) => response.json())
                .then((resp) => {
                  setResults(resp);
                })
                .catch((error) => console.log(error));
            } else {
              clearInterval(refreshID);
            }
          })
          .catch((error) => console.log(error));

        return () => {
          clearInterval(refreshID);
        };
      }, 1000);
    }
  }, [experimentName]);

  return (
    <>
      <SimulationForm changeExperimentName={changeExperimentName} />
      {patient_list.map((p) => {
        const filteredResults = results.find(
          (result) => result.patient_id === p
        );
        return filteredResults ? (
          <ChartSection results={results} patientName={p} />
        ) : null;
      })}
    </>
  );
};
