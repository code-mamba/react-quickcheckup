import { useState } from "react";
import "./formInput.css";

export const FormInput = (props) => {
  const {
    type,
    label,
    onChange,
    id,
    options,
    rows,
    labelkey,
    valuekey,
    name,
    value,
    min,
    max,
    required,
    ...inputProps
  } = props;
  const [focused, setFocused] = useState(false);

  const renderRadioButtons = () => {
    return (
      <div className="formInput">
        <label>{label}</label>
        {options.map((option) => (
          <label key={option.label}>
            {option.label}
            <input
              type={type}
              name={name}
              value={option.value}
              onChange={onChange}
              required={required}
            />
          </label>
        ))}
      </div>
    );
  };

  const renderSelect = () => {
    return (
      <>
        <label>{label}</label>
        <div>
          <select name={name} onChange={onChange} required={required}>
            {options.map((option) => (
              <option key={option.id} value={option[valuekey]}>
                {option[labelkey]}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  };

  const renderRange = () => {
    return (
      <>
        <label>{props.label}</label>
        <div className="rangeImage">
          <img src={props.image} />
          <input
            type={type}
            min={min}
            max={max}
            name={name}
            onChange={onChange}
            onBlur={() => setFocused(true)}
            focused={focused.toString()}
            required={required}
          />
        </div>
      </>
    );
  };

  const renderInput = () => {
    return (
      <div className="formInput">
        <label>{props.label}</label>
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={() => setFocused(true)}
          focused={focused.toString()}
          required={required}
        />
        <span>{props.errorMessage}</span>
      </div>
    );
  };
  const renderTextAreaInput = () => {
    return (
      <div className="formInput">
        <label>{props.label}</label>
        <textarea
          name={name}
          value={value}
          rows={rows}
          onChange={onChange}
          onBlur={() => setFocused(true)}
          focused={focused.toString()}
          required={required}
        ></textarea>
        <span>{props.errorMessage}</span>
      </div>
    );
  };
  const renderTimeInput = () => {
    return (
      <div className="formInput">
        <label>{props.label}</label>
        <input
          type={type}
          name={name}
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          onBlur={() => setFocused(true)}
          focused={focused.toString()}
          required={required}
        />
      </div>
    );
  };
  const renderDateInput = () => {
    return (
      <div className="formInput">
        <label>{props.label}</label>
        <input
          type={type}
          name={name}
          min={min}
          value={value}
          onChange={onChange}
          onBlur={() => setFocused(true)}
          focused={focused.toString()}
          required={required}
        />
        <span>{props.errorMessage}</span>
      </div>
    );
  };
  return type === "radio"
    ? renderRadioButtons()
    : type === "range"
    ? renderRange()
    : type === "select"
    ? renderSelect()
    : type === "textarea"
    ? renderTextAreaInput()
    : type === "date"
    ? renderDateInput()
    : type === "time"
    ? renderTimeInput()
    : renderInput();
};
export default FormInput;
