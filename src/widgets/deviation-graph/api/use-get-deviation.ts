import { useQuery } from '@tanstack/react-query';
import { DeviationGraphResponseDto } from '../model/dto';
import { BASE_URL } from '@/src/app/config/baseurl';

const getDeviation = async (gameId: string): Promise<DeviationGraphResponseDto> => {
  try {
    const response = await fetch(`${BASE_URL}/api/game/percentage?gameId=${gameId}`);

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    throw error; // 에러를 상위로 전파
  }
};

export const useGetDeviation = (gameId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['deviation', gameId],
    queryFn: () => getDeviation(gameId),
  });

  return {
    data,
    isLoading,
    error,
  };
};
