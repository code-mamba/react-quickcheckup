import React, { useState } from "react";
import RadioButton from "src/components/atom/radio-button/radio-button";
import "./form-input.css";

export const FormInput = (props) => {
  const {
    type,
    label,
    onChange,
    name,
    value,
    rows,
    cols,
    min,
    max,
    required,
    options,
    optionValue,
    valuekey,
    errorMessage,
    image,
  } = props;
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
        <div className="label-container">
          <label>{label}</label>
          {required && <div className="required-element">*</div>}
        </div>
        {type === "textarea" ? (
          <>
            <textarea
              {...commonProps}
              value={value}
              rows={rows}
              cols={cols}
            ></textarea>
          </>
        ) : (
          <>
            <input
              {...commonProps}
              type={type}
              value={value}
              min={min}
              max={max}
              data-error="This is a custom Errot Text fot patern and fill blank"
            />
          </>
        )}
        <span>{errorMessage}</span>
      </div>
    );
  };

  const renderSelect = () => {
    return (
      <div className="formInput">
        <div className="label-container">
          <label>{label}</label>
          {required && <div className="required-element">*</div>}
        </div>
        <select {...commonProps}>
          <option value="" disabled selected>
            Select Here
          </option>
          {options.map((option) => (
            <option key={option.id} value={option[valuekey]}>
              {option[optionValue]}
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
        <RadioButton
          type={type}
          label={label}
          options={options}
          required={required}
          commonProps={commonProps}
        />
        <span>{errorMessage}</span>
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
          <span>{errorMessage}</span>
        </div>
      </div>
    );
  };
  return type === "radio"
    ? renderRadioButtons()
    : type === "range"
    ? renderRange()
    : type === "select"
    ? renderSelect()
    : renderInput();
};

export default FormInput;
