import styled, { keyframes } from "styled-components";

import React from "react";

const DoughnutChart = ({
  size = "100",
  percent = 0.3,
  text = "목표타겟",
  color = "blue",
}) => {
  return (
    <Doughnut>
      <DoughnutSVG viewBox="0 0 300 300">
        <circle
          size={size}
          cx="150"
          cy="150"
          r={size}
          stroke="#d6d6d6"
          strokeWidth={"20"}
          fill="none"
        />
        <Circle
          size={size}
          cx="150"
          cy="150"
          r={size}
          stroke={color}
          strokeWidth={"20"}
          fill="none"
          strokeDasharray={[
            `${2 * Math.PI * size * percent}`,
            `${2 * Math.PI * size * (1 - percent)}`,
          ]}
          strokeDashoffset={`${2 * Math.PI * size * 0.75}`}
        />
      </DoughnutSVG>
      <DoughuntINFO>
        <div>{percent}%</div>
        <div>{text}</div>
      </DoughuntINFO>
    </Doughnut>
  );
};

export default DoughnutChart;

const Doughnut = styled.div`
  height: 250px;
  width: 250px;
  background: #181818;
  color: white;
  border-radius: 25px;
  box-shadow: 0 5px 21px rgba(0,0,0,08);
  font-family: var(--font--Roboto);
`;

const DoughnutSVG = styled.svg``;

const circleAni = (size) => keyframes`
${console.log(size)}
  0%{
    stroke-dasharray: 0 ${2 * Math.PI * size};
  }
`;

const Circle = styled.circle`
  animation: ${(props) => circleAni(props.size)} 3s ease;
`;

const DoughuntINFO = styled.div`
  position: relative;
  top: -50%;
  font-size: 20px;
`;
