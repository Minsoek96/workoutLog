import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";

//유저가 몇 개를 추가할지 모를 종목 개수를 임의로 생성하는 목적
const getList = (random) => Array(random)
  .fill(0)
  .map((_, i) => ({
    workout_title: "bench",
    workout_weights: 30 * i,
    workout_reps: i,
    workout_sets: i,
  }));
//임시 더미 데이터 생성
  const dummyData = Array(50)
  .fill(0)
  .map((_, i) => ({
    id: i,
    userId: "kuku",
    timestamp: 1234567890123 + (50 - i) * 1000 * 60,
    text: `${50 - i} text`,
    workout_list: getList(Math.round(Math.random() * 8)),
  }));
  

const App = () => {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="edit/:id" element={<Edit/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
