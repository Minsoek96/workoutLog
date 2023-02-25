import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import { useEffect, useReducer } from "react";

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
const dummyData = Array(25)
  .fill(0)
  .map((_, i) => ({
    id: i,
    userId: "kuku",
    timestamp: new Date(1674835165111).getTime() + getOneMoreDay(), //jan 24 2023기준
    workout_list: getList(Math.round(Math.random() * (15 - 5)) + 5),
  }));
dummyData.map((a) => console.log(new Date(a.timestamp)));

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [...state,action.data]
      break
    }
    default:
      return state;
  }
  console.log(newState)
  return newState
};

const App = () => {
  useEffect(() => {
    dispatch({type:"INIT", data: dummyData})
  },[])
  const onCreate = (list) => {
    dispatch({
      type: 'CREATE',
      data: {
        timestamp: new Date().getTime(),
        workout_list: list
      }
    })
  }
  const [data, dispatch] = useReducer(reducer, []);
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home data={data} />} />
          <Route path="edit" element={<Edit onCreate={onCreate}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
