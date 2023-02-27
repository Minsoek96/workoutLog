import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import WorkOutListItem from "./WorkOutListItem";
import Review from "./Review";
import YellowButton from "./YellowButton";
import DarkButton from "./DarkButton";
import Modal from "./Modal";


const WorkOutList = ({ todayData, curDate }) => {
  const navigator = useNavigate();
  const [filterList, setFilterList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleList = () => {
    const target = parseInt(new Date().getDate());
    const curday = parseInt(new Date(curDate).getDate());
    if (target > curday) {
      setModalOpen(true);
      return;
    }
    navigator("/Edit", { state: todayData });
  };

  useEffect(() => {
    console.log("렌더링");
    setFilterList(todayData[0] ? todayData[0].workout_list : []);
  }, [todayData]);

  return (
    <WorkOutListStyle>
      {modalOpen ? (
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          contents={{
            title: "TIP.",
            content: "지나간 시간은 돌아오지 않습니다.!",
          }}
        />
      ) : (
        <></>
      )}
      <Review todayData={todayData} curDate={curDate}></Review>
      {filterList.length > 0 ? (
        <>
          {filterList.map((a, i) => (
            <WorkOutListItem key={i} {...a} data={filterList} />
          ))}
          <DarkButton text={"수정하기"} onClick={handleList} />
        </>
      ) : (
        <NoneData>
          <h4>오늘은 아직 운동을 하지 않았습니다....</h4>
          <div>Go To The Fucking Gym </div>
          <YellowButton text="작성하러가기" onClick={handleList} />
        </NoneData>
      )}
    </WorkOutListStyle>
  );
};

const WorkOutListStyle = styled.div`
  display: grid;
  margin-top: 20px;
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
