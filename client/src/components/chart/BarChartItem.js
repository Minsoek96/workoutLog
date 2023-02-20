import React from "react";
import styled from "styled-components";
import { getPercent } from "../utils/ChartUtils";

const BarChartItem = ({ volume, xAxios }) => {
  const volumeInfo = () => {
    console.log(`목표수치: 100000 / 수행볼륨:${volume}`);
  };
  return (
    <>
      <rect
        onClick={volumeInfo}
        width="20"
        height={100}
        fill="#fff"
        x={xAxios}
        y="18"
      />
      <Rect
        width="20"
        height={getPercent(volume, 100000) * 100}
        fill="#202020"
        x={xAxios}
        y={100 + 18 - getPercent(volume, 100000) * 100}
      />
    </>
  );
};

const Rect = styled.rect``;

export default BarChartItem;
