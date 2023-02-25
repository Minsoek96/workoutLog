import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import WorkOutListItem from "./WorkOutListItem";
import YellowButton from "./YellowButton";

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
          <h4>오늘은 아직 운동을 하지 않았습니다....</h4>
          <div>Go To The Fucking Gym </div>
          <YellowButton
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
  display: grid;
  margin-top: 50px;
  grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
  grid-gap: 1rem;
`;

const NoneData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20% auto;
  color: red;
  button {
    margin-top: 1.5rem;
  }
`;

export default WorkOutList;
