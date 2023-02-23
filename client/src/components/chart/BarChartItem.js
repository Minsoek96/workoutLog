import React from "react";
import styled, { keyframes } from "styled-components";
import { getPercent } from "../utils/ChartUtils";

//xAxios 차트가 렌더링 될때 간격을 나타냄
const BarChartItem = ({
  index,
  volume,
  xAxios,
  addInfo,
  heightValue = parseInt(70),
  yValue = parseInt(15),
}) => {
  const textData = ["일", "월", "화", "수", "목", "금", "토"];
  const volumeInfo = () => {
    console.log(`목표수치: 100000 / 수행볼륨:${volume}`);
  };
  return (
    <>
      <Text
        x={xAxios + 2}
        y={heightValue + yValue*1.8}
      >
        {textData[index]}
      </Text>
      <rect
        onClick={() => {
          addInfo(volume);
        }}
        width="16"
        height={70}
        fill="#fff"
        x={xAxios}
        y={yValue}
      />
      <Rect
        width="16"
        height={getPercent(volume, 100000) * 100}
        fill="#202020"
        x={xAxios}
        y={heightValue + yValue - getPercent(volume, 100000) * 100}
      />
    </>
  );
};

const rectAni = ({ props }) => keyframes`
  ${console.log(props)}
  from {
    y: 80
    }
`;

const Rect = styled.rect`
  animation: ${(props) => rectAni({ props })} 0.5s ease;
`;

const Text = styled.text`
  font-size: 10px;
`;

export default BarChartItem;
