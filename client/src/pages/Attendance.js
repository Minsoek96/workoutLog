import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import DarkButton from "../components/DarkButton";
import { useNavigate } from "react-router-dom";
import { getfilterData } from "../components/utils/ChartUtils";

const Attendance = ({ data }) => {
  const [curDate, setCurDate] = useState(new Date());
  const [startDate, setStartDate] = useState(0);
  const [monthData, setMonthData] = useState([]);
  const navigator = useNavigate();
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

    const startingPoint = firstDay.getDay();
    const index = lastDay.getDate();
    const temporaryArr = getfilterData(index, filterData, "date");
    temporaryArr.shift();
    const plus = Array(parseInt(startingPoint)).fill(0);
    setMonthData(
      startingPoint !== 0 ? [...plus, ...temporaryArr] : [...temporaryArr]
    );
  }, [curDate, data]);

  const headText = `${curDate.getFullYear()}년 ${
    curDate.getMonth() + 1
  } 월 출석부`;
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
            <div
              key={i}
              className={["date-container", a !== 0 ? "active" : ""].join(" ")}
            >
              {i < startDate ? (
                ""
              ) : (
                <div>
                  {i - startDate + 1}
                  {a !== 0 ? (
                    <p>
                      {new Date(a.timestamp).toString().slice(16, 24)}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
              )}
            </div>
          ))}
      </AttendanceCell>
      <div className="back-container">
        <DarkButton text="뒤로가기" onClick={() => navigator(-1)}></DarkButton>
      </div>
    </AttendanceStyle>
  );
};

const AttendanceStyle = styled.div`
  color: white;
  padding: 20px 10px;
  .back-container {
    display: flex;
    justify-content: flex-end;
  }
  .back-container button {
    opacity: 0.5;
  }
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
