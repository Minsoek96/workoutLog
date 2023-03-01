import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { getfilterData } from "../utils/ChartUtils";
import BarChartItem from "./BarChartItem";

const Chart = ({ data, curDate, targetVolume }) => {
  const [oneWeekVolume, setOneWeekVolume] = useState();
  const [curVolume, setCurVolume] = useState("");

  const handlerInfo = useCallback((text) => {
    setCurVolume(text);
  }, []);

  useEffect(() => {
    const isWork = curDate.getDay();
    if (oneWeekVolume && oneWeekVolume[isWork] !== 0) {
      setCurVolume(oneWeekVolume[isWork]);
      
    } else  {
      setCurVolume(false)
    }
  }, [oneWeekVolume,curDate]);

  useEffect(() => {
    //현시점으로 부터 이전 일요일까지 일수를 계산하고 필터링한다.
    //주간 데이터를 분리하기 위한
    const sundaySearch = new Date(curDate).getDay();
    const firstDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth(),
      curDate.getDate() - sundaySearch
    );
    const lastDay = new Date(
      firstDay.getFullYear(),
      firstDay.getMonth(),
      firstDay.getDate() + 7
    );
    const filterData = data.filter(
      (a) => firstDay <= a.timestamp && a.timestamp <= lastDay
    );
    //SVG를 렌더링 하기위해 남은 일주일 데이터를 채워주는 작업
    //사전 작업시에는 데이터시간을 오늘을 기준으로 하루씩 차감 하여 50개의 데이터를 생성하여 day를 역순으로 생각하고 코드를짬..
    const oneWeekData = getfilterData(6, filterData);
    setOneWeekVolume(
      oneWeekData.map((a) =>
        a === 0
          ? a
          : a.workout_list
              .map((a) => a.workout_weights * a.workout_reps * a.workout_sets)
              .reduce((pre, cur) => pre + cur, 0)
      )
    );
  }, [curDate, data]);

  //바차트 옵션 관련
  const height = 220;
  const width = 100;
  const barWidth = 16;
  const barMargin = 13.5;
  const barHeight = 70;

  return (
    <ChartStyle>
      {curVolume ? (
        <SmallMessage>
          출력 : 고생하셨습니다. {curVolume} 볼륨을 진행하였습니다..
        </SmallMessage>
      ) : (
        <SmallMessage> 출력 : 운동을 하지 않았네요 ..</SmallMessage>
      )}
      <BarChartStyle>
        {/* viewBox에 대한 상대적인값 스타일링을 할 예정 */}
        <svg viewBox={`0 0 ${height} ${width}`}>
          {oneWeekVolume &&
            oneWeekVolume.map((a, i) => (
              <BarChartItem
                key={i}
                volume={a}
                xAxios={barMargin + i * (barMargin + barWidth)}
                barWidth={barWidth}
                barHeight={barHeight}
                barMargin={barMargin}
                targetVolume={targetVolume}
                handlerInfo={handlerInfo}
                index={i}
              />
            ))}
        </svg>
      </BarChartStyle>
    </ChartStyle>
  );
};

const ChartStyle = styled.div`
  margin: 12px auto;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  background-color: #181818;
  box-shadow: 0 5px 21px rgba(0, 0, 0, 08);
`;

const SmallMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  border: 1px solid #575353;
  border-radius: 5px;
  font-size: 16px;
  color: #dddddd;
`;

const BarChartStyle = styled.div`
  width: 100%;
  height: 300px;
  svg {
    position: relative;
    bottom: 15px;
  }
`;

export default Chart;
