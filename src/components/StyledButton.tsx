import styled from "styled-components";

const StyledButton = styled.button<{ variant?: "danger" | "default" }>`
  background: ${(props) =>
    props.variant === "danger" ? "#dc3545" : "#007bff"};
  &:hover {
    background: ${(props) =>
      props.variant === "danger" ? "#a71d2a" : "#0056b3"};
  }
`;
export default StyledButton;
