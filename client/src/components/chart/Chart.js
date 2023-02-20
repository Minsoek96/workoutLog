import { useEffect, useState } from "react";
import styled from "styled-components";

const Chart = ({ data }) => {
  const [volumeData, setVolumeData] = useState();
  const [curDate, setCurDate] = useState(new Date());

  useEffect(() => {
    //현시점으로 부터 이전 일요일까지 일수를 계산하고 필터링한다.
    const sundaySearch = new Date().getDay();
    const firstDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth(),
      curDate.getDate() - sundaySearch
    );
    const lastDay = new Date(
      firstDay.getFullYear(),
      firstDay.getMonth(),
      firstDay.getDate() + 6
    );
    setVolumeData(data.filter((it) => firstDay <= it.timestamp && it.timestamp <= lastDay))
  }, [curDate,data]);

  return <ChartStyle></ChartStyle>;
};

export default Chart;

const ChartStyle = styled.div`
  position: absolute;
  height: 20rem;
  width: 100%;
  background-color: #ebebeb;
`;
