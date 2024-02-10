import styled from "styled-components";

const StyledToast = styled.div`
  position: fixed;
  right: 20px;
  top: 20px;
  transform: translateX(-50%);
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;

  ${({ variant }) => {
    switch (variant) {
      case "success":
        return `
          background-color: #4caf50; /* Green background color */
        `;
      case "decline":
        return `
          background-color: #f44336; /* Red background color */
        `;
      default:
        return `
          background-color: #333; /* Default background color */
        `;
    }
  }}

  button {
    margin-left:1rem;
    background-color: withe;
    border: none;
    color: black;
    cursor: pointer;
  }
`;

export default StyledToast;
