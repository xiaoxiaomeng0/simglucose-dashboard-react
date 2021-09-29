import React from "react";

function ExpName({ exprimtNameRef }) {
  return (
    <div>
      <label htmlFor="experiment_name">Please input experiment name:</label>
      <input type="text" id="experiment_name" ref={exprimtNameRef} />
    </div>
  );
}
export default ExpName;
