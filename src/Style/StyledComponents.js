import styled from "styled-components";

export const StyledInput = styled.input`
  background: #ffffff;
  border: 1px solid;
  box-sizing: border-box;
  border-radius: 8px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  border-color: ${(props) => (props.errorColor ? "#FF0000" : "#000000")};
  color: ${(props) => (props.errorColor ? "rgba(255, 0, 0, 0.5)" : "#888888")};
  text-align: center;
  outline: none;
  width: 55vw;
  height: 6vh;
`;

export const StyledSubInput = styled.input`
  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 8px;
  width: 40vw;
  height: 6vh;
  margin-left: 3vw;
  padding-left: 1vw;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  color: #484848;
  outline: none;
  border-color: ${(props) => (props.errorColor ? "#FF0000" : "#000000")};
  color: ${(props) => (props.errorColor ? "rgba(255, 0, 0, 0.5)" : "#888888")};
`;
