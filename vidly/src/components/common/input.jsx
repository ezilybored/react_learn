import React from "react";

// Destructure props as arguments
const Input = ({ name, label, value, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        type="text"
        className="form-control"
      />
      {/* If error is truthy then the div is rendered, if not then it won't be */}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
