export type RankResponseDto = {
  rankList: Rank[];
};

export interface Rank {
  id: number;
  game_id: number;
  user_id: string;
  score: number;
  rank: number;
  start_date: string;
  end_date: string;
  name: string;
  avatar_url: string;
  email: string;
}
