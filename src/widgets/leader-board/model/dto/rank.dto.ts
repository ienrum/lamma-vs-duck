
export type RankResponseDto = {
  myRank: number;
}

export interface Rank {
  id: number;
  game_id: number;
  user_id: string;
  score: number;
  rank: number;
  start_date: string;
  end_date: string;
  user: {
    id: string;
    name: string;
  };
}