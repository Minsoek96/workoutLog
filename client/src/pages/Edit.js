import React from "react";
import { useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  return (
    <div>
      <h5>Edit:{id}</h5>
    </div>
  );
};

export default Edit;
