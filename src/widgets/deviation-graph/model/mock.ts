

export const timeData = [
  { time: 1, value: 1 },
  { time: 2, value: 2 },
  { time: 3, value: 33 },
  { time: 4, value: 4 },
  { time: 5, value: 70 },
  { time: 6, value: 60 },
  { time: 7, value: 7 },
  { time: 8, value: 8 },
  { time: 9, value: 90 },
  { time: 10, value: 10 },
];

export const myTime = 3;

export const totalPlayers = timeData.reduce((acc, curr) => acc + curr.value, 0);