import React,{useState} from "react";
import styled from "styled-components";
import BarChartItem from "./BarChartItem";

const BarChart = ({ oneWeekData }) => {
  const [curVolume, setCurVolume] = useState("")
  const handlerInfo = (text) => {
    setCurVolume(text)
  };
  const height = 220;
  const width = 100;
  const barWidth = 16;
  const barMargin = 13.5;
  const barHight = 70;
  return (
    <BarChartStyle>
      {/* viewBox에 대한 상대적인값 스타일링을 할 예정 */}
      {curVolume ?<div>출력 : 운동을 {curVolume} 볼륨을 진행하였습니다..</div> : <div> 출력 : 운동을 하지 않았네요 ..</div> }
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

export default BarChart;
