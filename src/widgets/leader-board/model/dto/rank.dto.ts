import { Database } from '@/types/database.types';

export type RankResponseDto = {
  rankList: RankWithUsers[];
};

export type RankWithUsers = Database['public']['Views']['rank_with_users']['Row'];
