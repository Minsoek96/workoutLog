import React from "react";
import DoughnutChart from "../components/DoughnutChart";
import styled from "styled-components";

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
        <DoughnutChart size={"100"} percent={getPercent(getvolume,targetVolume)}/>
        <DoughnutChart size={"100"} percent={getPercent(getvolume,targetVolume)}/>
        <DoughnutChart size={"100"} percent={getPercent(getvolume,targetVolume)}/>
      </Doughnut>

      {console.log(
        data.map((a) =>
          a.workout_list
            .map((a) => a.workout_weights * a.workout_reps * a.workout_sets)
            .reduce((pre, cur) => pre + cur, 0)
        )
      )}
      {console.log((40000 / targetVolume).toFixed(2))}

    </div>
  );
};

const Doughnut = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  padding-top: 20px;
  gap: 50px;
`;

export default Home;
