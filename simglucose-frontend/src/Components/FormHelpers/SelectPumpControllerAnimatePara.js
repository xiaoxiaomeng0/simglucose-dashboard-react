import React from "react";

function SelectPumpControllerAnimatePara({ values, handleChange }) {
  const controllers = ["Basal Bolus"];
  return (
    <div>
      <label>Select Insulin Pump:</label>
      <input
        type="radio"
        id="Cozmo"
        name="pump"
        value="Cozmo"
        onChange={handleChange}
        defaultChecked
      />
      <label htmlFor="Cozmo">Cozmo</label>
      <input
        type="radio"
        id="Insulet"
        name="pump"
        value="Insulet"
        onChange={handleChange}
      />
      <label htmlFor="Insulet">Insulet</label>
      <div>
        <label>Select Controller:</label>
        {controllers.map((item) => {
          return (
            <div key={item}>
              <input
                type="radio"
                id={item}
                name="controller"
                value={item}
                defaultChecked
                onChange={handleChange}
              />
              <label htmlFor={item}>{item}</label>
            </div>
          );
        })}
      </div>

      <label>Parallel Computation:</label>
      <div>
        <input
          type="radio"
          id="with_parallel"
          name="parallel"
          value="True"
          onChange={handleChange}
        />
        <label htmlFor="with_parallel">Yes</label>
      </div>
      <div>
        <input
          type="radio"
          id="no_parallel"
          name="parallel"
          value="False"
          defaultChecked
          onChange={handleChange}
        />
        <label htmlFor="no_parallel">No</label>
      </div>
    </div>
  );
}

export default SelectPumpControllerAnimatePara;
