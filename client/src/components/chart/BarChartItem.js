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
  barHeight,
  barMargin = parseInt(15),
  targetVolume,
}) => {
  const textData = ["일", "월", "화", "수", "목", "금", "토"];
  const curHeight = volume > targetVolume ? barHeight : getPercent(volume, targetVolume) * barHeight
  return (
    <>
      <TargetRect
        onClick={() => {
          Info(volume);
        }}
        width={barWidth}
        height={barHeight}
        fill="#2c313a"
        x={xAxios}
        y={barMargin}
      />
      <Rect
        onClick={() => {
          Info(volume);
        }}
        width={barWidth}
        height={curHeight}
        fill="#23ada9"
        x={xAxios}
        y={barHeight + barMargin - curHeight}
      />
      <Text x={xAxios + 2} y={barHeight + barMargin * 1.8}>
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


export default React.memo(BarChartItem);
