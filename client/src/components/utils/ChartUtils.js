export const getPercent = (getVolume, targetVolume) => {
  return (getVolume / targetVolume).toFixed(2);
};
