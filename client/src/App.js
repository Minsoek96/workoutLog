import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";

//주간 막대 차트를 분리하기 위해 
let second = 86400000
const getOneMoreDay = () => {
  second += 86400000
  return second
}
 
//유저가 몇 개를 추가할지 모를 종목 개수를 임의로 생성하는 목적
const getList = (random) => Array(random)
  .fill(0)
  .map((_, i) => ({
    workout_title: "bench",
    workout_weights: (40  * (i+1)) >= 120? 120:(40  * (i+1)),
    workout_reps: 10,
    workout_sets: 4,
  }));
//임시 더미 데이터 생성
  const dummyData = Array(30)
  .fill(0)
  .map((_, i) => ({
    id: i,
    userId: "kuku",
    timestamp: new Date().getTime() + getOneMoreDay(),
    workout_list: getList((Math.round(Math.random()*(15-5))+5)),
  }));
  

const App = () => {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home  data={dummyData}/>}/>
        <Route path="edit/:id" element={<Edit/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
