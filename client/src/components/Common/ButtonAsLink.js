import styled from "styled-components";

const StyledSpan = styled.span`
display: flex;
margin: 0 !important;
max-width: fit-content;
flex-direction: column;
& span {
  width: 0;
  background-color: black;
  display: flex;
  height: 2px;
  transition: all 0.2s ease-in-out;
}
&:hover {
  & span {
   width: 100%;
  }
}
`;
export const ButtonAsLink = ({ text, onClick, isDisabled, type }) => {

  return <StyledSpan>
    <button type={type} disabled={isDisabled} onClick={onClick} className="link">{text}</button>
    <span></span>
  </StyledSpan>;
}