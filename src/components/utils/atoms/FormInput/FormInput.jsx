import { useState } from "react";
import "./formInput.css";

export const FormInput = (props) => {
  const { label, onChange, id, ...inputProps } = props;
  const[focused, setFocused] = useState(false)


  const renderRadioButtons = () => {
    return (
      <div className="formInput">
        <label>{props.label}</label>
        {inputProps.options.map((option) => (
          <label key={option.label}>
            {option.label}
            <input
              type={inputProps.type}
              name={inputProps.name}
              value={option.value}
              onChange={onChange}
            />
          </label>
        ))}
      </div>
    );
  };

  const renderSelect = () => {
    return (
      <>
        <label>{props.label}</label>
        <select onChange={props.onChange} {...props}>
          {props.options.map((option) => (
            <option key={option.id} value={option[props.value]}>
              {option[props.labelkey]}
            </option>
          ))}
        </select>
      </>
    );
  };

  const renderInput = () => {
    
    return (
      <div className="formInput">
        <label>{props.label}</label>
        <input {...inputProps} onChange={onChange} onBlur={(e=> setFocused(true))} focused={focused.toString()} />
        <span>{props.errorMessage}</span>
      </div>
    );
  };

  return props.type === "radio"
    ? renderRadioButtons()
    : props.type === "select"
    ? renderSelect()
    : renderInput();
};
export default FormInput;
