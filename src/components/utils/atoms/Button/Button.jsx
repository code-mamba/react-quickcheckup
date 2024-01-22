import "./button.css"
export const Button = (props) => {
	const buttonClass = `button-${props.type}`
  return (
    <button className={buttonClass} onClick={props.onClick}>
      {props.label}
    </button>
  );
};
