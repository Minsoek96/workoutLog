import { useEffect, useState } from "react";
import styled from "styled-components";
import BarChart from "./BarChart";

const Chart = ({ data }) => {
  const [volumeData, setVolumeData] = useState();
  const [curDate, setCurDate] = useState(new Date());

  useEffect(() => {
    //현시점으로 부터 이전 일요일까지 일수를 계산하고 필터링한다.
    //주간 데이터를 분리하기 위한
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
    const filterData = data.filter(
      (it) => firstDay <= it.timestamp && it.timestamp <= lastDay
    );

    //SVG를 렌더링 하기위해 남은 일주일 데이터를 채워주는 작업
    //사전 작업시에는 데이터시간을 오늘을 기준으로 하루씩 차감 하여 50개의 데이터를 생성하여 day를 역순으로 생각하고 코드를짬..
    const daySearch = filterData.map(a => new Date(a.timestamp).getDay())

    const oneWeekData = [];
    for (let i = 0; i <= 6; i++) {
      oneWeekData[daySearch[i]] = filterData[i];
      if (!oneWeekData[i]) {
        oneWeekData[i] = parseInt(0);
      }
    }

    setVolumeData(
      oneWeekData.map((a) =>
        a === 0
          ? a
          : a.workout_list
              .map((a) => a.workout_weights * a.workout_reps * a.workout_sets)
              .reduce((pre, cur) => pre + cur, 0)
      )
    );
  }, [curDate, data]);

  return (
    <ChartStyle>
      <BarChart oneWeekData={volumeData}></BarChart>
    </ChartStyle>
  );
};

export default Chart;

const ChartStyle = styled.div`
  height: 400px;
  width: 100%;
  background-color: #ebebeb;
`;

