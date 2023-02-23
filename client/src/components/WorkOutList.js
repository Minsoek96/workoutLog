import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import WorkOutListItem from "./WorkOutListItem";
import MyButton from "./MyButton";

const WorkOutList = ({ data }) => {
  const navigator = useNavigate();
  const [curDate, setCurDate] = useState(new Date());
  const [filterList, setFilterList] = useState([]);
  const buttonHandler = () => {
    return console.log("sdafasf");
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
    setFilterList(filterData[0] ? filterData[0].workout_list : []);
  }, [data, curDate]);
  return (
    <WorkOutListStyle>
      {filterList.length > 0 ? (
        filterList.map((a, i) => <WorkOutListItem key={i} {...a} data={filterList}/>)
      ) : (
        <NoneData>
          오늘은 아직 운동을 하지 않았습니다....
          <div>Go To The Fucking Gym </div>
          <MyButton
            text="작성하러가기"
            onClick={()=>{navigator('/Edit')}}
          />
        </NoneData>
      )}
    </WorkOutListStyle>
  );
};

const WorkOutListStyle = styled.div`
  position: absolute;
  align-items: center;
  justify-content: center;
  padding: 5rem 0.5rem;
  height: 30%;
  width: 100%;
  background-color: #1e1e1e;
  color: black;
`;

const NoneData = styled.div`
  margin: 20% auto;
  color: red;
  button {
    margin-top: 1.5rem;
  }
`;

export default WorkOutList;
