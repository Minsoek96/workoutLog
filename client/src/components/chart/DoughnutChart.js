import styled, { keyframes } from "styled-components";

import React from "react";

const DoughnutChart = ({
  size = "100",
  percent = 0.3,
  text = "목표타겟",
  color = "blue",
}) => {
  return (
    <DoughnutStyle>
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
        <div>
          {parseInt(percent * 100)}
          %
        </div>
        <div>{text}</div>
      </DoughuntINFO>
    </DoughnutStyle>
  );
};

const DoughnutStyle = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background: #181818;
  color: white;
  border-radius: 25px;
  box-shadow: 0 5px 21px rgba(0, 0, 0, 08);
`;

const DoughuntINFO = styled.div`
  position: absolute;
  font-size: 20px;
`;

const DoughnutSVG = styled.svg``;

const circleAni = (size) => keyframes`
  0%{
    stroke-dasharray: 0 ${2 * Math.PI * size};
  }
`;

const Circle = styled.circle`
  animation: ${(props) => circleAni(props.size)} 3s ease;
`;

export default React.memo(DoughnutChart);
