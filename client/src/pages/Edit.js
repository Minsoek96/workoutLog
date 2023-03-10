import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import DarkButton from "../components/DarkButton";
import Modal from "../components/Modal";
import LoadModal from "../components/LoadModal";
import Header from "../components/Header";
import { saveData } from "../components/utils/SaveList";
import FormInput from "../components/FormInput";
import EmotionItem from "../components/EmotionItem";
import { emotionList } from "../components/utils/EmotionUtil";

const Edit = ({ onCreate, onEdit }) => {
  const curTitle = useRef(" ");
  const [forms, setForms] = useState([
    { workout_title: "", workout_weights: 0, workout_reps: 0, workout_sets: 1 },
  ]);
  const [text, setText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [isLoad, setIsLoad] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [curEmotion, setCurEmotion] = useState(0);
  const handleEmotion = useCallback((index) => {
    setCurEmotion(index);
  }, []);
  const list = useLocation([]);

  useEffect(() => {
    if (list.state.length > 0) {
      setText(list.state[0].text);
      setForms(list.state[0].workout_list);
      setCurEmotion(list.state[0].emotion);
      setIsEdit(true);
    }
  }, [list]);

  const closeModal = () => {
    setModalOpen(false);
    setIsLoad(false);
  };

  const handleSave = () => {
    setIsLoad(true);
  };

  const handleListCheck = (title) => {
    const filterTitle = saveData.filter((a) => a.title === title);
    setForms(filterTitle[0].save_list);
    setIsLoad(false);
  };

  const handleClick = (check) => {
    if (
      forms[forms.length - 1].workout_weights === 0 ||
      forms[forms.length - 1].workout_reps === 0 ||
      forms[forms.length - 1].workout_sets === 0
    ) {
      setModalOpen(true);
      setModalData({
        title: "??????",
        content: "???????????? ???????????? ????????????.",
      });
      return;
    }
    setForms([
      ...forms,
      {
        workout_title: check === false ? "" : curTitle.current,
        workout_weights: 0,
        workout_reps: 0,
        workout_sets: 1,
      },
    ]);
  };

  const handleRemove = () => {
    if (forms.length > 1) {
      const removeForm = [...forms];
      removeForm.pop();
      setForms(removeForm);
    } else {
      setModalOpen(true);
      setModalData({
        title: "??????",
        content: "???????????? ????????? ?????????????????????.",
      });
    }
  };

  const handleChange = useCallback((e, index) => {
    const { name, value } = e.target;
    const newForms = [...forms];
    if (e.target.name === "workout_title") {
      curTitle.current = e.target.value;
      newForms[index][name] = value;
    } else {
      newForms[index][name] = parseInt(value);
    }
    setForms(newForms);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      onEdit(list.state[0].id, forms, text);
      navigator("/", { replace: true });
      return; // ????????? return??? ?????? ?????? onCreate?????? ?????? ???????????? ????????? ?????? !! return??? ????????????
    }
    if (forms.length > 1) {
      onCreate(forms, text, curEmotion);
      navigator("/", { replace: true });
    } else {
      setModalOpen(true);
      setModalData({
        title: "??????",
        content: "???????????? ??????????????????.",
      });
    }
  };

  const navigator = useNavigate();
  return (
    <EditStyle>
      <div className="bold">
        <Header text="Record" />
      </div>
      {modalOpen ? (
        <Modal isOpen={modalOpen} onClose={closeModal} contents={modalData} />
      ) : (
        <></>
      )}
      {isLoad ? (
        <LoadModal
          isOpen={isLoad}
          onClose={closeModal}
          saveData={saveData}
          onClick={handleListCheck}
        />
      ) : (
        <></>
      )}
      <div className="container">
        <DarkButton text="????????????" onClick={() => navigator(-1)}></DarkButton>
        <DarkButton
          text={isEdit ? "????????????" : "????????????"}
          onClick={handleSubmit}
        ></DarkButton>
      </div>
      <EmotionStyle>
        <h2> ????????? ?????????</h2>
        <div className="emotionList-container">
          {emotionList.map((a, index) => (
            <EmotionItem
              key={index}
              index={index}
              isSelected={parseInt(curEmotion) === parseInt(index)}
              handleEmotion={handleEmotion}
              {...a}
            />
          ))}
        </div>
      </EmotionStyle>
      <div className="impression-Container">
        <h2>????????? ??????</h2>
        <textarea
          placeholder="????????? ????????????..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <form onSubmit={handleSubmit}>
        {forms.map((form, index) => (
          <FormInput
            key={index}
            index={index}
            handleChange={handleChange}
            form={form}
          />
        ))}
      </form>
      <div className="formButton-control">
        <div>
          <DarkButton text="????????????" onClick={() => handleClick(true)} />
          <DarkButton text="????????????" onClick={() => handleClick(false)} />
        </div>
        <div>
          <DarkButton text="????????????" onClick={handleSave} />
          <DarkButton text="????????????" onClick={handleRemove} />
        </div>
      </div>
    </EditStyle>
  );
};
const EditStyle = styled.div`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  color: white;
  overflow-y: auto; /* ?????? ??????????????? ???????????? ?????? ?????? */
  scrollbar-width: thin; /* ???????????? ????????? subpixel??? ?????? */
  scrollbar-color: #ccc #f5f5f5; /*???????????? ?????? ??????*/
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }

  .impression-Container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
  }
  .impression-Container textarea::-webkit-input-placeholder {
    text-align: center;
    color: black;
    opacity: 0.6;
  }

  .impression-Container textarea {
    display: flex;
    justify-content: center;
    align-items: center;
    resize: vertical;
    overflow: hidden;
    background-color: #8f8888;
    box-sizing: border-box;
    color: #000;
    font-weight: bold;
    width: 90%;
    line-height: 1.5;
    min-height: 80px;
    padding: 10px 15px;
    border-radius: 5px;
  }

  .bold {
    font-weight: bold;
  }

  .container {
    display: flex;
    justify-content: space-between;
    margin: 20px auto;
  }

  .formButton-control {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }

  .formButton-control button:first-child {
    margin-right: 25px;
  }

  form {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    box-sizing: border-box;
    font-size: 15px;
    color: #8f8888;
  }

  input {
    width: 65px;
    margin: 10px 20px;
    border-radius: 5px;
    color: #d8caca;
    background-color: #534e4e;
  }
`;

const EmotionStyle = styled.div`
  text-align: center;
  .emotionList-container {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }
`;

export default Edit;
