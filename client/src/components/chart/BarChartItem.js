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
      <Text x={xAxios + 2} y={barHight + barMargin * 1.8}>
        {textData[index]}
      </Text>
      <rect
        onClick={() => {
          Info(volume);
        }}
        width={barWidth}
        height={70}
        fill="#fff"
        x={xAxios}
        y={barMargin}
      />
      <Rect
        onClick={() => {
          Info(volume);
        }}
        width={barWidth}
        height={getPercent(volume, 100000) * 100}
        fill="#202020"
        x={xAxios}
        y={barHight + barMargin - getPercent(volume, 100000) * 100}
      />
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
`;

const Text = styled.text`
  font-size: 10px;
`;

export default BarChartItem;
