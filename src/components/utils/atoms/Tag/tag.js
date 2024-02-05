import styled, { css } from "styled-components";

const commonStyles = css`
  width: 100px;
  border-radius: 50px;
  padding: 0, 5rem;
  font-weight: bold;
  width: 100px;
`;

const StyledTag = styled.div`
  cursor: pointer;

  ${({ variant }) => {
    switch (variant) {
      case "danger":
        return css`
          ${commonStyles}
          color: #f77b7b;
        `;
      case "success":
        return css`
          ${commonStyles}
          color: #5ae66e;
        `;
    }
  }}
`;

export default StyledTag;
