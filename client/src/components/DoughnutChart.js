import styled, { keyframes } from "styled-components";

import React from "react";

const DoughnutChart = ({ size = "100", percent = 0.30 }) => {
  return (
    <div>
      {percent}
      <DoughnutSVG width="300" height="300">
        <circle
          cx="150"
          cy="150"
          r={size}
          stroke="gray"
          stroke-width="20"
          fill="none"
        />
        <circle
          cx="150"
          cy="150"
          r={size}
          stroke="blue"
          stroke-width="20"
          fill="none"
          strokeDasharray={[`${2 * Math.PI * size * percent}`,`${2 * Math.PI * size * (1-percent)}`]}
        />
      </DoughnutSVG>
    </div>
  );
};

export default DoughnutChart;

const DoughnutSVG = styled.svg`
  background-color: #ebebeb;
`;
