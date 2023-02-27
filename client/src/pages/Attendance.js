import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import DarkButton from "../components/DarkButton";

const Attendance = ({ data }) => {
  const [curDate, setCurDate] = useState(new Date());
  const [startDate, setStartDate] = useState(0);
  const [monthData, setMonthData] = useState([]);
  useEffect(() => {
    const firstDay = new Date(curDate.getFullYear(), curDate.getMonth(), 1);
    const lastDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth() + 1,
      0,
      23,
      59,
      59
    );
    const filterData = data.filter(
      (a) => firstDay <= a.timestamp && a.timestamp <= lastDay
    );
    setStartDate(firstDay.getDay());
    const flfl = firstDay.getDay();

    const index = lastDay.getDate();
    const dateSearch = filterData.map((a) => new Date(a.timestamp).getDate());
    const newArr = [];
    for (let i = 0; i <= index; i++) {
      newArr[dateSearch[i]] = filterData[i];
      if (!newArr[i]) {
        newArr[i] = parseInt(0);
      }
    }
    newArr.shift();
    const plus = Array(flfl === 0 ? 0 : parseInt(flfl)).fill(0);
    setMonthData(flfl !== 0 ? [...plus, ...newArr] : [...newArr]);
  }, [curDate, data]);

  const headText = `${curDate.getMonth() + 1} 월 출석부`;
  const decrease = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1));
  };
  const increase = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1));
  };

  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "FRI", "Sat"];

  return (
    <AttendanceStyle>
      <Header
        leftChild={<DarkButton text={"<"} onClick={decrease}></DarkButton>}
        text={headText}
        rightChild={<DarkButton text={">"} onClick={increase}></DarkButton>}
      ></Header>
      <AttendanceDay>
        {day.map((a, i) => (
          <div key={i}>{a}</div>
        ))}
      </AttendanceDay>
      <AttendanceCell>
        {monthData &&
          monthData.map((a, i) => (
            <div key={i} className={["date-container",a !== 0 ? "active" : ""].join(" ")}>
              {i < startDate ? "" : <div>{i - startDate + 1}{a !== 0 ?<p> 👍</p>:<></>}</div>}
            </div>
          ))}
      </AttendanceCell>
    </AttendanceStyle>
  );
};

const AttendanceStyle = styled.div`
  color: white;
  padding: 20px 10px;
`;

const AttendanceDay = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin: 15px;
`;

const AttendanceCell = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin: 15px;
  .date-container {
    margin: 13px auto;
  }
  .active {
    color: #d14444;
  }
`;

export default Attendance;
