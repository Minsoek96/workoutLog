import React from "react";
import styled from "styled-components";

const WorkOutListItem = ({
  workout_title,
  workout_reps,
  workout_sets,
  workout_weights,
  data,
}) => {
  return (
    <WorkOutListItemStyle>
      <div className="align">{workout_title}</div>
      <div>{workout_weights}</div>
      <div>{workout_reps}</div>
      <div>{workout_sets}</div>
    </WorkOutListItemStyle>
  );
};

const WorkOutListItemStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 20px;
  border: 1px solid #575252;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.3);
  color: #dddddd;
  .align {
    width: 150px;
    text-align: center;
  }
`;

export default WorkOutListItem;
