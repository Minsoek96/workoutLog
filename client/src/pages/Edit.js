import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import MyButton from "../components/MyButton";

const Edit = ({ onCreate }) => {
  const curTitle = useRef(" ");
  const [forms, setForms] = useState([
    { workout_title: "", workout_weights: 0, workout_reps: 0, workout_sets: 1 },
  ]);

  const handleClick = (check) => {
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

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    console.log(e.target);
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
    onCreate(forms);
    navigator("/", { replace: true });
  };

  const navigator = useNavigate();
  const { id } = useParams();
  return (
    <EditStyle>
      <MyButton text="뒤로가기" onClick={() => navigator(-1)}></MyButton>
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
                value={form.workout_sets}
                onChange={(e) => handleChange(e, index)}
              />
            </label>
          </div>
        ))}
        <MyButton text="작성완료"></MyButton>
      </form>
        <MyButton text="같은종목" onClick={() => handleClick(true)} />
        <MyButton text="다른종목" onClick={() => handleClick(false)} />
    </EditStyle>
  );
};
const EditStyle = styled.div`
  height: 100vh;
  color: white;
  overflow-y: scroll;
`;

export default Edit;
