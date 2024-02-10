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
          background-color: #5686c1;  
          color: white;
        `;
      case "success":
        return css`
          ${commonStyles}
          background-color: #5686c1;
          color: white;
        `;
      case "danger":
        return css`
          ${commonStyles}
          background-color: white;
          color: #5686c1;
          border: 1px solid #5686c1;
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
