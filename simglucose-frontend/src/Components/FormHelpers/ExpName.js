import React from "react";

function ExpName({ experimentNameRef }) {
  return (
    <div>
      <label htmlFor="experiment_name">Please input experiment name:</label>
      <input type="text" id="experiment_name" ref={experimentNameRef} />
    </div>
  );
}
export default ExpName;
