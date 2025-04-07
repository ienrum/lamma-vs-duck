
const formatTime = (time: number) => {
  const baseTime = time / 1000;
  const seconds = Math.floor(baseTime) % 60;
  const minutes = Math.floor(baseTime / 60);
  return `${minutes}:${seconds}`;
}

export default formatTime;