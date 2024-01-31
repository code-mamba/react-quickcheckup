import React, { useState } from "react";
import "./formInput.css";

export const FormInput = (props) => {
  const { type, label, onChange, name, value, rows, min, max, required, options, labelkey, valuekey, errorMessage, image } = props;
  const [focused, setFocused] = useState(false);

  const commonProps = {
    name,
    onChange,
    onBlur: () => setFocused(true),
    focused: focused.toString(),
    required,
  };

  const renderInput = () => {
    return (
      <div className="formInput">
        <label>{label}</label>
        {type === "textarea" ? (
          <>
            <textarea {...commonProps} value={value} rows={rows}></textarea>
          </>
        ) : (
          <>
            <input {...commonProps} type={type} value={value} min={min} max={max} />
          </>
        )}
        <span>{errorMessage}</span>
      </div>
    );
  };

  const renderSelect = () => {
    return (
      <div className="formInput">
        <label>{label}</label>
        <select {...commonProps}>
        <option value="" disabled selected>
            Select Here
          </option>
          {options.map((option) => (
            <option key={option.id} value={option[valuekey]}>
              {option[labelkey]}
            </option>
          ))}
        </select>
        <span>{errorMessage}</span>
      </div>
    );
  };

  const renderRadioButtons = () => {
    return (
      <div className="formInput">
        <label>{label}</label>
        {options.map((option) => (
          <label key={option.label}>
            {option.label}
            <input type={type} {...commonProps} value={option.value} />
          </label>
        ))}
      </div>
    );
  };

  const renderRange = () => {
    return (
      <div className="formInput">
        <label>{label}</label>
        <div className="rangeImage">
          <img src={image} alt="range" />
          <input type={type} {...commonProps} min={min} max={max} />
        </div>
      </div>
    );
  };

  return type === "radio" ? renderRadioButtons() : type === "range" ? renderRange() : type === "select" ? renderSelect() : renderInput();
};

export default FormInput;
