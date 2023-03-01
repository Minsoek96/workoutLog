import React from "react";
import styled from "styled-components";

const EmotionItem = ({
  emotion_style,
  emotion_title,
  index,
  isSelected,
  handleEmotion,
}) => {
    console.log(isSelected)
  return (
    <EmotionItemStyle>
      <div
        className={isSelected? "activeEmotion" : ""}
        onClick={() => handleEmotion(index)}
      >
        {emotion_style}
      </div>
      <h3 className={isSelected? "activeEmotion" : ""}>
        {emotion_title}
      </h3>
    </EmotionItemStyle>
  );
};

const EmotionItemStyle = styled.div`
  svg {
    font-size: 120px;
    color: #776a6a;
  }
  .activeEmotion svg {
    color: #a81f1f;
  }
  .activeEmotion {
    color: #a81f1f;
  }
`;
export default React.memo(EmotionItem);
