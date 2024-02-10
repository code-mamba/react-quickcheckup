import React from "react";
import "./label.css"
const Label = ({ label, required }) => {
  return (
    <div className="label-container">
      <label>{label}</label>
      {required && <div className="required-element">*</div>}
    </div>
  );
};

export default Label;
