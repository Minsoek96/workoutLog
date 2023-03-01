import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import { useEffect, useReducer, useRef } from "react";
import Attendance from "./pages/Attendance";

//주간 막대 차트를 분리하기 위해
let seconds = 0;
const getOneMoreDay = () => {
  seconds += 86400000;
  return seconds;
};

//유저가 몇 개를 추가할지 모를 종목 개수를 임의로 생성하는 목적
const getList = (random) =>
  Array(random)
    .fill(0)
    .map((_, i) => ({
      workout_title: "bench",
      workout_weights: 40 * (i + 1) >= 120 ? 120 : 40 * (i + 1),
      workout_reps: 10,
      workout_sets: 4,
    }));
//임시 더미 데이터 생성
const dummyData = Array(30)
  .fill(0)
  .map((_, i) => ({
    id: i,
    timestamp: new Date(1674835165111).getTime() + getOneMoreDay(), //jan 24 2023기준
    text: "오늘도 해냈다.",
    workout_list: getList(Math.round(Math.random() * (15 - 5)) + 5),
    emotion: 1,
  }));
// dummyData.map((a) => console.log(new Date(a.timestamp)));

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [...state, action.data];
      break;
    }
    case "EDIT": {
      newState = state.map((a) =>
        a.id === action.data.id ? { ...action.data } : a
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

const App = () => {
  const [data, dispatch] = useReducer(reducer, []);
  console.log(data)
  const listId = useRef(dummyData.length);
  console.log("앱 렌더링")
  useEffect(() => {
    dispatch({ type: "INIT", data: dummyData });
  }, []);

  const onCreate = (list, text, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: listId.current,
        timestamp: new Date().getTime(),
        text,
        emotion,
        workout_list: list,
      },
    });
    listId.current += 1;
  };

  const onEdit = (id, list, text) => {
    const targetDate = data.filter((a) => a.id === id);
    dispatch({
      type: "EDIT",
      data: {
        id,
        timestamp: targetDate[0].timestamp,
        text,
        workout_list: list,
      },
    });
  };
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home data={data} />} />
          <Route
            path="edit"
            element={<Edit onCreate={onCreate} onEdit={onEdit} />}
          />
          <Route path="attendance" element={<Attendance data={data}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
