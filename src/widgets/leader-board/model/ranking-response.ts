export interface RankingResponse {
  data: {
    id: string;
    name: string;
    score: number;
  }[];
}

const mockScore = () => {
  return new Date().getTime() - new Date().getTime() + Math.floor(Math.random() * 100000);
}

export const mockRankingResponse = ((): RankingResponse => {

  const mockScores = Array.from({ length: 10 }, () => mockScore());
  const sortedScores = mockScores.sort((a, b) => a - b);

  const mockRankingResponse: RankingResponse = {
    data: sortedScores.map((score, index) => ({
      id: index.toString(),
      name: `Player ${index + 1}`,
      score: score,
    })),
  };

  return mockRankingResponse;
})()
