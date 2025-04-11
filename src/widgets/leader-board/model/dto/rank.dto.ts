
export type RankResponseDto = {
  myRank: number;
  rankList: Rank[];
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
    raw_user_meta_data: {
      name: string;
      avatar_url: string;
    };
  };
}