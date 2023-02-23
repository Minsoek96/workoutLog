import React from "react";
import styled from "styled-components";

const WorkOutListItem = ({
  workout_title,
  workout_reps,
  workout_sets,
  workout_weights,
  data,
}) => {
    console.log(data)
  return (
    <WorkOutListItemStyle>
      <div>{workout_title}</div>
      <div>{workout_weights}</div>
      <div>{workout_reps}</div>
      <div>{workout_sets}</div>
    </WorkOutListItemStyle>
  );
};

const WorkOutListItemStyle = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0.5rem auto;
`;

export default WorkOutListItem;
