import React from "react";
import styled from "styled-components";

const DarkButton = ({onClick,text}) => {
  return <BeautyButton onClick={onClick}>{text}</BeautyButton>;
};
const BeautyButton = styled.button`
  background-color: #1b1a1a;
  color: #fff;
  border: none;
  padding: 13px 20px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 16px;
  box-shadow: 0 3px 2px rgba(0, 0, 0, 09);
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #777;
  }

  &:active {
    background-color: red;
  }
`;
export default DarkButton;
