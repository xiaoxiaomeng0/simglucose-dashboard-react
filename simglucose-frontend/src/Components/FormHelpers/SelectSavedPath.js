import React from "react";

function SelectSavedPath({ values, handleChange }) {
  return (
    <div>
      <h3>Saved Folder:</h3>
      <div>
        <input
          type="radio"
          id="default-path"
          name="path"
          value="default"
          defaultChecked
          onChange={handleChange}
        />
        <label htmlFor="default-path">Default Folder</label>
      </div>
      <div>
        <input
          type="radio"
          id="custom-path-radio"
          name="path"
          value="custom"
          onChange={handleChange}
        />
        <label htmlFor="custom-path-radio">Custom Folder</label>
        <input
          type="text"
          id="custom-path-input"
          name="path_input"
          disabled={values.path === "default" ? true : false}
        />
      </div>
    </div>
  );
}

export default SelectSavedPath;
