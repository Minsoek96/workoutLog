import React from "react";
import styled from "styled-components";
import BarChartItem from "./BarChartItem";

const BarChart = ({ oneWeekData }) => {
  return (
    <BarChartStyle>
      {/* viewBox에 대한 상대적인값 스타일링을 할 예정  */}
      <svg viewBox="0 0 400 300">
        {oneWeekData && oneWeekData.map((a,i) => <BarChartItem key = {i} volume={a} xAxios={60+i*40}/>)}
      </svg>
    </BarChartStyle>
  );
};

const BarChartStyle = styled.div``;

export default BarChart;
