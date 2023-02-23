import React from "react";
import styled from "styled-components";
import MyButton from "./MyButton";

const WorkOutListView = () => {
    const meme = () => {
      return console.log("sdafasf")  
    }
  return (
    <WorkOutListViewStyle>
      <MyButton text = "클릭을 해주세요" onClick={meme}/>
    </WorkOutListViewStyle>
  );
};

const WorkOutListViewStyle = styled.div`
  height: 400px;
  width: 100%;
  background-color: #1e1e1e;
`;

export default WorkOutListView;
