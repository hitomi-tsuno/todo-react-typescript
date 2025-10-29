import styled from "styled-components";

const StyledText = styled.span<{ checked: boolean }>`
  color: ${(props) => (props.checked ? "gray" : "black")};
  text-decoration: ${(props) => (props.checked ? "line-through" : "none")};
`;

export default StyledText;
