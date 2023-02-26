import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import DarkButton from "../components/DarkButton";
import Modal from "../components/Modal";
import LoadModal from "../components/LoadModal";
import Header from "../components/Header";
import { saveData } from "../components/utils/SaveList";

const Edit = ({ onCreate, onEdit }) => {
  const curTitle = useRef(" ");
  const [forms, setForms] = useState([
    { workout_title: "", workout_weights: 0, workout_reps: 0, workout_sets: 1 },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [isLoad, setIsLoad] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const list = useLocation([]);

  useEffect(() => {
    if (list.state.length > 0) {
      setForms(list.state[0].workout_list);
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
    const filterTitle = saveData.filter((a) => a.title === title)
    console.log(filterTitle)
    setForms(filterTitle[0].save_list)
    setIsLoad(false)
  }

  const handleClick = (check) => {
    if (
      forms[forms.length - 1].workout_weights === 0 ||
      forms[forms.length - 1].workout_reps === 0 ||
      forms[forms.length - 1].workout_sets === 0
    ) {
      setModalOpen(true);
      setModalData({
        title: "경고",
        content: "작성중인 리스트가 있습니다.",
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
        title: "경고",
        content: "리스트는 작성후 삭제가능합니다.",
      });
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newForms = [...forms];
    if (e.target.name === "workout_title") {
      curTitle.current = e.target.value;
      newForms[index][name] = value;
    } else {
      newForms[index][name] = parseInt(value);
    }
    setForms(newForms);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      console.log(list.state);
      onEdit(list.state[0].id, forms);
    }
    if (forms.length > 1) {
      onCreate(forms);
      navigator("/", { replace: true });
    } else {
      setModalOpen(true);
      setModalData({
        title: "경고",
        content: "리스트를 작성해주세요.",
      });
    }
  };

  const navigator = useNavigate();
  const { id } = useParams();
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
        <DarkButton text="뒤로가기" onClick={() => navigator(-1)}></DarkButton>
        <DarkButton
          text={isEdit ? "수정완료" : "작성완료"}
          onClick={handleSubmit}
        ></DarkButton>
      </div>
      <form onSubmit={handleSubmit}>
        {forms.map((form, index) => (
          <div key={index}>
            <label>
              Title:
              <input
                type="text"
                name="workout_title"
                value={form.workout_title}
                onChange={(e) => handleChange(e, index)}
              />
            </label>
            <label>
              Weghit:
              <input
                type="number"
                name="workout_weights"
                min={0}
                max={600}
                maxLength={3}
                value={form.workout_weights}
                onChange={(e) => handleChange(e, index)}
              />
            </label>
            <label>
              Reps:
              <input
                type="number"
                name="workout_reps"
                step={1}
                min={0}
                max={30}
                value={form.workout_reps}
                onChange={(e) => handleChange(e, index)}
              />
            </label>
            <label>
              Sets:
              <input
                type="number"
                name="workout_sets"
                step={1}
                min={0}
                max={20}
                value={form.workout_sets}
                onChange={(e) => handleChange(e, index)}
              />
            </label>
          </div>
        ))}
      </form>
      <div className="formButton-control">
        <div>
          <DarkButton text="같은종목" onClick={() => handleClick(true)} />
          <DarkButton text="다른종목" onClick={() => handleClick(false)} />
        </div>
        <div>
          <DarkButton text="불러오기" onClick={handleSave} />
          <DarkButton text="삭제하기" onClick={handleRemove} />
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
  overflow-y: auto; /* 세로 스크롤바를 표시하기 위한 속성 */
  scrollbar-width: thin; /* 스크롤바 너비를 subpixel로 지정 */
  scrollbar-color: #ccc #f5f5f5; /*스크롤바 색상 지정*/
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

export default Edit;
