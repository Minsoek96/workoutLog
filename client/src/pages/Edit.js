import React, { useState,useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import MyButton from "../components/MyButton";

const Edit = () => {
  const curTitle = useRef(" ")
  const [forms, setForms] = useState([
    { title: "", weghit: "", reps: "", sets: 1 },
  ]);

  const handleClick = (check) => {
    console.log(check)
    setForms([...forms, {title: check===false ? "":curTitle.current ,weghit: "", reps: "", sets: 1 }]);
    console.log(forms)
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    console.log(e.target)
    const newForms = [...forms];
    newForms[index][name] = value;
    if(e.target.name === 'title'){
      curTitle.current = e.target.value
    }
    setForms(newForms);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(forms);
  };

  const navigator = useNavigate();
  const { id } = useParams();
  return (
    <EditStyle>
      <MyButton text="뒤로가기" onClick={() => navigator(-1)}></MyButton>
      <MyButton text="같은종목" onClick={()=>handleClick(true)} />
      <MyButton text="다른종목" onClick={()=>handleClick(false)} />
      <form onSubmit={handleSubmit}>
        {forms.map((form, index) => (
          <div key={index}>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={(e) => handleChange(e, index)}
              />
            </label>
            <label>
              Weghit:
              <input
                type="number"
                name="weghit"
                step={10}
                min={0}
                value={form.weghit}
                onChange={(e) => handleChange(e, index)}
              />
            </label>
            <label>
              Reps:
              <input
                type="number"
                name="reps"
                step={1}
                min={0}
                value={form.reps}
                onChange={(e) => handleChange(e, index)}
              />
            </label>
            <label>
              Sets:
              <input
                type="number"
                name="sets"
                step={1}
                min={0}
                value={form.sets}
                onChange={(e) => handleChange(e, index)}
              />
            </label>
          </div>
        ))}
        <MyButton text="작성완료"></MyButton>
      </form>
    </EditStyle>
  );
};
const EditStyle = styled.div`
  height: 500px;
  color: white;
  overflow-y: scroll;
`;

export default Edit;
