import React from "react";
import styled from "styled-components";

const MyButton = ({ text = "안녕하세요", onClick }) => {
  return <BeautyButton onClick={onClick}>{text}</BeautyButton>;
};
const BeautyButton = styled.button`
  background: linear-gradient(to bottom, #ff8c00, #ffaf1a);
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 20px;
  text-align: center;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease-in-out;

  &:hover {
    background: linear-gradient(to bottom, #ffaf1a, #ff8c00);
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export default MyButton;
