import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import WorkOutListItem from "./WorkOutListItem";
import MyButton from "./MyButton";

const WorkOutList = ({ todayData }) => {
  const navigator = useNavigate();
  const [filterList, setFilterList] = useState([]);

  useEffect(() => {
    console.log('렌더링')
    setFilterList(todayData[0] ? todayData[0].workout_list : []);
  },[todayData]);

  return (
    <WorkOutListStyle>
      {filterList.length > 0 ? (
        filterList.map((a, i) => (
          <WorkOutListItem key={i} {...a} data={filterList} />
        ))
      ) : (
        <NoneData>
          오늘은 아직 운동을 하지 않았습니다....
          <div>Go To The Fucking Gym </div>
          <MyButton
            text="작성하러가기"
            onClick={() => {
              navigator("/Edit");
            }}
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
