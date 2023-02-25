import React, { useState } from "react";
import styled from "styled-components";
import BarChartItem from "./BarChartItem";

const BarChart = ({ oneWeekData }) => {
  const [curVolume, setCurVolume] = useState("");
  const handlerInfo = (text) => {
    setCurVolume(text);
  };
  const height = 220;
  const width = 100;
  const barWidth = 16;
  const barMargin = 13.5;
  const barHight = 70;
  return (
    <BarChartStyle>
      {/* viewBox에 대한 상대적인값 스타일링을 할 예정 */}
      {curVolume ? (
        <SmallMessage>출력 : 운동을 {curVolume} 볼륨을 진행하였습니다..</SmallMessage>
      ) : (
        <SmallMessage> 출력 : 운동을 하지 않았네요 ..</SmallMessage>
      )}
      <svg viewBox={`0 0 ${height} ${width}`}>
        {oneWeekData &&
          oneWeekData.map((a, i) => (
            <BarChartItem
              key={i}
              volume={a}
              xAxios={barMargin + i * (barMargin + barWidth)}
              barWidth={barWidth}
              barHight={barHight}
              barMargin={barMargin}
              Info={handlerInfo}
              index={i}
            />
          ))}
      </svg>
    </BarChartStyle>
  );
};

const BarChartStyle = styled.div`
  width: 100%;
  height: 300px;
`;

const SmallMessage = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #575353;
  border-radius: 5px;
  font-size: 16px;
  color: #dddddd;
`;

export default BarChart;
