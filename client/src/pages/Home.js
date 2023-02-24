import React, { useState, useEffect } from "react";
import DoughnutChart from "../components/chart/DoughnutChart";
import styled from "styled-components";
import Chart from "../components/chart/Chart";
import { getPercent } from "../components/utils/ChartUtils";
import WorkOutList from "../components/WorkOutList";

//.임의의 목표볼륨을 설정
const targetVolume = 70000;

const Home = ({ data }) => {
  // console.log(data)
  const [curDate, setCurDate] = useState(new Date());
  const [todayData, setTodayData] = useState([]);

  useEffect(() => {
    //오늘 운동한 종목을 렌더링 하기 위한 필터링작업 
    const firstDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth(),
      curDate.getDate()
    );
    const lastDay = new Date(
      curDate.getFullYear(), 
      curDate.getMonth(),
      curDate.getDate(),
      23,
      59,
      59,
      59
    );
    const filterData = data.filter(
      (a) => firstDay <= a.timestamp && a.timestamp <= lastDay
    );
    setTodayData(filterData)
  }, [data, curDate]);

  //데이터에서 볼륨을 계산하고 퍼센트값을 반환
  const getvolume = todayData.map((a) =>
    a.workout_list
      .map((a) => a.workout_weights * a.workout_reps * a.workout_sets)
      .reduce((pre, cur) => pre + cur, 0)
  );

  return (
    <div className="Home">
      <Doughnut>
        <DoughnutChart
          size={"100"}
          percent={getPercent(getvolume, targetVolume)}
          text={"목표타겟"}
        />
        <DoughnutChart
          size={"100"}
          percent={getPercent(getvolume, targetVolume)}
          text={"이전강도"}
          color={"red"}
        />
        <DoughnutChart
          size={"100"}
          percent={getPercent(getvolume, targetVolume)}
          text={"감정지수"}
          color={"orange"}
        />
      </Doughnut>
      <Chart data={data} />
      <WorkOutList todayData={todayData}/>
    </div>
  );
};

const Doughnut = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  height: 200px;
  width: 100%;
  padding: 20px 2px;
`;

export default Home;
