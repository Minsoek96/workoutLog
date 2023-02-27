import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DoughnutChart from "../components/chart/DoughnutChart";
import styled from "styled-components";
import Chart from "../components/chart/Chart";
import { getPercent } from "../components/utils/ChartUtils";
import WorkOutList from "../components/WorkOutList";
import DarkButton from "../components/DarkButton";
import Header from "../components/Header";

//.임의의 목표볼륨을 설정
const targetVolume = 70000;



const Home = ({ data }) => {
  // console.log(data)
  const [curDate, setCurDate] = useState(new Date());
  const [todayData, setTodayData] = useState([]);
  const navigator = useNavigate();

  const headText = `${curDate.getMonth() + 1} 월 ${curDate.getDate()}`;
  const decrease = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - 1)
    );
  };
  const increase = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() + 1)
    );
  };

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
    setTodayData(filterData);
  }, [data, curDate]);

  //데이터에서 볼륨을 계산하고 퍼센트값을 반환
  const getvolume = todayData.map((a) =>
    a.workout_list
      .map((a) => a.workout_weights * a.workout_reps * a.workout_sets)
      .reduce((pre, cur) => pre + cur, 0)
  );

  return (
    <HomeStyle>
      <Header
        leftChild={<DarkButton onClick={decrease} text={"<"}></DarkButton>}
        text={headText}
        rightChild={<DarkButton onClick={increase} text={">"}></DarkButton>}
      ></Header>
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
      <Chart data={data} curDate={curDate} />
      <WorkOutList todayData={todayData} curDate={curDate} />
      <div className="button-container">
        <DarkButton text={"출석부 보러가기"} onClick={()=>navigator('/attendance')}/>
      </div>
    </HomeStyle> 
  );
};

const HomeStyle = styled.div`
  .button-container button{
    width: 100%;
  }
`

const Doughnut = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  height: 200px;
  width: 100%;
  padding: 20px 2px;
`;

export default Home;
