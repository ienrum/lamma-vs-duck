import { BASE_URL } from '@/src/app/config/baseurl';
import { BaseResponseDto } from '@/src/app/model/backend/base-dto';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';

export const fetchPlayedToday = async (
  gameId: number
): Promise<BaseResponseDto<{ isPlayed: boolean; gameId: number }>> => {
  const response = await fetch(`${BASE_URL}/api/game/play-today?gameId=${gameId}`);
  const data = await response.json();

  if (data.status === 'error') {
    throw new Error(data.error);
  }

  return data;
};

export const usePlayedToday = (gameIds: number[]) => {
  return useSuspenseQueries({
    queries: gameIds.map((gameId) => ({
      queryKey: ['played-today', gameId],
      queryFn: () => fetchPlayedToday(gameId),
      select: (data: BaseResponseDto<{ isPlayed: boolean; gameId: number }>) => data.data,
    })),
  });
};
