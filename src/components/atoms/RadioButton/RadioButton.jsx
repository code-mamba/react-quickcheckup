import React from "react";
import Label from "src/components/atoms/Label/Label";
import "./radiobutton.css"

const RadioButton = ({ type,label, options, commonProps, required, errorMessage }) => {
  return (
    <>
      <Label label={label} required={required}/>
      <div className = "radio-button-content">
      {options.map ((option)=>(
      <label  key={option.label}>
        <input className="radioInput" type={type} value={option.value} {...commonProps} />
        {option.label}   
      </label>
      ))}
      </div>
    </>
  );
};

export default RadioButton;
