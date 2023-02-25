import React from "react";
import styled from "styled-components";

const Header = ({ leftChild, text, rightChild }) => {
  return (
    <HeaderStyle>
      <div>{leftChild}</div>
      <div className="header-text">{text}</div>
      <div>{rightChild}</div>
    </HeaderStyle>
  );
};

const HeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  height: 55px;
  border-bottom: 1px solid #5b5c58;
  padding: 0px 10px;
  .header-text {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 35px;
    color: #aaaca5;
  }
`;

export default Header;
