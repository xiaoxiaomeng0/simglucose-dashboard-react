import React from "react";

function SelectSensor({ values, handleChange }) {
  return (
    <div>
      <label>Select Sensor Name:</label>

      <input
        type="radio"
        id="dexcom"
        name="sensor"
        value="Dexcom"
        defaultChecked
        onChange={handleChange}
      />
      <label htmlFor="dexcom">Dexcom</label>
      <input
        type="radio"
        id="guardianRT"
        name="sensor"
        value="GuardianRT"
        onChange={handleChange}
      />
      <label htmlFor="guardianRT">GuardianRT</label>
      <input
        type="radio"
        id="navigator"
        name="sensor"
        value="Navigator"
        onChange={handleChange}
      />
      <label htmlFor="navigator">Navigator</label>
      <div>
        <label htmlFor="seed_for_sensor">
          Input a random seed for sensor noise:
        </label>
        <input
          type="text"
          name="seed_noise"
          id="seed_for_sensor"
          value={values.seed_noise}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default SelectSensor;
