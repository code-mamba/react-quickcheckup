import StyledButton from "./button";
export const Button = (props) => {
  return (
    <StyledButton variant={props.variant} onClick={props.onClick}>
      {props.label}
    </StyledButton>
  );
};
