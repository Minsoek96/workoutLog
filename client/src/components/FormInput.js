import React from "react";
import styled from "styled-components";

const FormInput = ({ handleChange, form, index }) => {
  return (
    <FormInputStyle>
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
    </FormInputStyle>
  );
};

const FormInputStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default React.memo(FormInput);
