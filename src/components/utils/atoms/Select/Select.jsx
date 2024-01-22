import "./select.css";
export const Select = (props) => {


  return (
  <>
    <label>{props.label}</label>
    <select onChange={props.onChange} {...props}>
      {props.options.map((option) => (
        <option value={option[props.valueKey]}>{option[props.labelKey]}</option>
      ))}
    </select>
    </>
  );
};
