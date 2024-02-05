import styled, { css } from "styled-components";

const commonStyles = css`
  width: auto;
  height: 50px;
  padding: 10px;
  border: none;
  font-size: 18px;
  margin-top: 15px;
  margin-bottom: 30px;
`;

const StyledButton = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  border: none;

  ${({ variant }) => {
    switch (variant) {
      case "default":
        return css`
          ${commonStyles}
          width: 100%;
          background-color: rebeccapurple;
          color: white;
        `;
      case "primary":
        return css`
          ${commonStyles}
          background-color: rebeccapurple;
          color: white;
        `;
      case "secondary":
        return css`
          ${commonStyles}
          border-radius: 10px;
          background-color: #517fef;  
          color: white;
        `;
      case "success":
        return css`
          ${commonStyles}
          background-color: #4caf50;
          color: white;
        `;
      case "danger":
        return css`
          ${commonStyles}
          background-color: #e52a51;
          color: white;
        `;
      case "secondaryOutlined":
        return css`
          ${commonStyles}
          background-color: white;
          color: #517fef;
          border: 3px solid #517fef;
        `;
      case "freeze":
        return css`
          ${commonStyles}
          background-color: #00c5c2;
          color: white;
          border-radius: 10px;
        `;
      default:
        return commonStyles;
    }
  }}
`;

export default StyledButton;
