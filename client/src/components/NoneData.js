import React, { useEffect } from "react";
import styled from "styled-components";
import YellowButton from "./YellowButton";

const NoneData = ({handleList}) => {
  return (
    <NoneDataStyle>
      <h4>오늘은 아직 운동을 하지 않았습니다....</h4>
      <div>Go To The Fucking Gym </div>
      <YellowButton text="작성하러가기" onClick={handleList} />
    </NoneDataStyle>
  );
};

const NoneDataStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20% auto;
  color: red;
  button {
    margin-top: 1.5rem;
  }
`;

export default NoneData
