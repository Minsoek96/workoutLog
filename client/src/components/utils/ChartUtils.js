export const getPercent = (getVolume, targetVolume) => {
  return (getVolume / targetVolume).toFixed(2);
};

/** day, date를 판단해 지정일 일수별로 데이터가 있는지 없는지 판단하고 남은일수를 채워준다.**/
export const getfilterData = (index, filterData = [], type = "day") => {
  let newArr = [];
  const daySearch = filterData.map((a) =>
    type === "day"
      ? new Date(a.timestamp).getDay()
      : new Date(a.timestamp).getDate()
  );
  for (let i = 0; i <= index; i++) {
    newArr[daySearch[i]] = filterData[i];
    if (!newArr[i]) {
      newArr[i] = parseInt(0);
    }
  }
  return newArr;
};
