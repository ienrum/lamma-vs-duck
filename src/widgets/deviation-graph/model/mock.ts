export const sortedScoreData = [
  1000, 1300, 1699, 2000, 2300, 2699, 3000, 3300, 3699, 4000, 4300, 4699, 5000, 5300, 5699, 6000, 6300,
];

export const myTime = 2000;
const totalPlayers = sortedScoreData.length;
const lowerScorePlayersThenMe = sortedScoreData.filter((score) => score > myTime).length;
const sameScorePlayers = sortedScoreData.filter((score) => score === myTime).length;
export const myPercentage = ((lowerScorePlayersThenMe + 0.5 * sameScorePlayers) / totalPlayers) * 100;
