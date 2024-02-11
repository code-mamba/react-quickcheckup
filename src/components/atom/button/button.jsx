import StyledButton from "./button.sc";
export const Button = (props) => {
  return (
    <StyledButton variant={props.variant} onClick={props.onClick}>
      {props.label}
    </StyledButton>
  );
};
