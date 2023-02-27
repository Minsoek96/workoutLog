import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Review = ({ todayData, curDate }) => {
  const [text, setText] = useState("");
  useEffect(() => {
    setText("")
    if (todayData && todayData.length > 0) {
      setText(todayData[0].text);
    }
  }, [todayData, curDate]);
  return (
    <ReviewStyle>
      <ReviewBox>
        <ReviewTitle>오늘의 소감</ReviewTitle>
        {text.trim() === "" ? <></> : text}
      </ReviewBox>
    </ReviewStyle>
  );
};

const ReviewStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10vh;
  margin: 20px auto;
`;
const ReviewBox = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: #181818;
  color: #ffffff;
  padding: 10px 20px;
  box-shadow: 0 5px 21px rgba(0, 0, 0, 08);
`;

const ReviewTitle = styled.div`
    text-align: center;
    font-size: 20px;
    margin-bottom: 5px;
    color: #9b8f8f;
`;

export default Review;
