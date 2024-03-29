import React from "react";
import styled from "styled-components";
import { emotionList } from "./utils/EmotionUtil";
const Emotion = ({ selectedEmotion = 44 }) => {
  console.log(selectedEmotion);
  return (
    <EmotionStyle>
      {selectedEmotion !== 44
        ? emotionList[selectedEmotion].emotion_style
        : "GTTFG"}
    </EmotionStyle>
  );
};
const EmotionStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #181818;
  color: white;
  border-radius: 25px;
  box-shadow: 0 5px 21px rgba(0, 0, 0, 08);
  font-size: 50px;
  color: red;
  svg {
    font-size: 150px;
    color: #b40f0f;
  }
`;
export default React.memo(Emotion);
