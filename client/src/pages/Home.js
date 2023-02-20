import React from "react";
import DoughnutChart from "../components/DoughnutChart";
import styled from "styled-components";
import Chart from '../components/chart/Chart'


//.임의의 목표볼륨을 설정
const targetVolume = 70000;

const Home = ({ data }) => {
  //데이터에서 볼륨을 계산하고 퍼센트값을 반환
  const getvolume = data.map((a) =>
    a.workout_list
      .map((a) => a.workout_weights * a.workout_reps * a.workout_sets)
      .reduce((pre, cur) => pre + cur, 0)
  )[data.length - 1];

  const getPercent = (getVolume, targetVolume) => {
    return (getVolume / targetVolume).toFixed(2);
  };


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
      <Chart data={data}/>
    </div>
  );
};

const Doughnut = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 10px 10px 10px;
  gap: 40px;
`;

export default Home;
