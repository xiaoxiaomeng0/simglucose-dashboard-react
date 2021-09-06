import React from "react";

function ExpName({ values, handleChange }) {
  return (
    <div>
      <label htmlFor="experiment_name">Please input experiment name:</label>
      <input
        type="text"
        id="experiment_name"
        value={values.experiment_name}
        name="experiment_name"
        onChange={handleChange}
      />
    </div>
  );
}
export default ExpName;
