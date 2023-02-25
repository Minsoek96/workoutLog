import React from "react";
import styled, { keyframes } from "styled-components";
import { getPercent } from "../utils/ChartUtils";

//xAxios 차트가 렌더링 될때 간격을 나타냄
const BarChartItem = ({
  index,
  volume,
  xAxios,
  Info,
  barWidth,
  barHight,
  barMargin = parseInt(15),
}) => {
  const textData = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    <>
      <TargetRect
        onClick={() => {
          Info(volume);
        }}
        width={barWidth}
        height={70}
        fill="#2c313a"
        x={xAxios}
        y={barMargin}
      />
      <Rect
        onClick={() => {
          Info(volume);
        }}
        width={barWidth}
        height={getPercent(volume, 100000) * 100}
        fill="#23ada9"
        x={xAxios}
        y={barHight + barMargin - getPercent(volume, 100000) * 100}
      />
      <Text x={xAxios + 2} y={barHight + barMargin * 1.8}>
        {textData[index]}
      </Text>
    </>
  );
};

const rectAni = ({ props }) => keyframes`
  from {
    y: 80
    }
`;

const Rect = styled.rect`
  animation: ${(props) => rectAni({ props })} 0.5s ease;
  &:hover {
    opacity: 0.5;
  }
`;

const TargetRect = styled.rect`
  &:hover {
    opacity: 0.5;
  }
`;

const Text = styled.text`
  font-size: 10px;
  fill: #c3cce0;
`;


export default BarChartItem;
