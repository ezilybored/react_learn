import React from "react";

// Destructure props as arguments
const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {/* Allow for more inpout fields using the rest/spread operator. id, name and error are the only essential(constant) properties */}
      <input {...rest} name={name} id={name} className="form-control" />
      {/* If error is truthy then the div is rendered, if not then it won't be */}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
