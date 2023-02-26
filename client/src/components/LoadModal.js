import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DarkButton from "./DarkButton";

const LoadModal = ({ isOpen, onClose, saveData = [], onClick }) => {
  const [curList, setList] = useState({});
  console.log(curList);
  return (
    <LoadModalStyle isOpen={isOpen}>
      <LoadModalBox>
        <div className="loadModal-Contents">
          <h2>저장리스트</h2>
          <ul>
            {saveData.map((a, i) => (
              <li
                className={curList.index === i ? "active":""}
                key={i}
                onClick={() => setList({ title: a.title, index: i })}
              >
                {a.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="loadModal-Container">
          <div className="loadModal-Buttons">
            <DarkButton onClick={() => onClick(curList.title)} text={"불러오기"} />
            <DarkButton onClick={onClose} text={"닫기"} />
          </div>
        </div>
      </LoadModalBox>
    </LoadModalStyle>
  );
};

const LoadModalStyle = styled.div`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(36, 31, 31, 0.5);
`;
const LoadModalBox = styled.div`
  z-index: 100;
  position: relative;
  height: 250px;
  width: 500px;
  padding: 10px;
  border-radius: 15px;
  background-color: #0a0a0aee;
  .loadModal-Contents {
    display: flex;
    flex-direction: column;
  }

  .loadModal-Contents h2 {
    margin-left: 15px;
    color: #fff;
  }
  .loadModal-Contents ul {
    width: 400px;
    color: #e6dfdf;
  }
  .loadModal-Contents li {
    list-style: none;
    margin: 8px auto;
    &:hover {
      background-color: #a35e5e;
      border-radius: 5px;
    }
    &.active {
      background-color: #523f3f;
      border-radius: 5px;
    }
  }
  .loadModal-Container li .active {
    background-color: red;
  }

  .loadModal-Container {
    width: 500px;
    margin: 15px 10px;
    position: absolute;
    bottom: 0;
  }
  .loadModal-Buttons {
    display: flex;
    justify-content: space-between;
    margin-right: 15px;
  }
`;

export default LoadModal;
