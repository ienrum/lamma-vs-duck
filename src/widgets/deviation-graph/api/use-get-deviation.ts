import { useQuery } from '@tanstack/react-query';
import { DeviationGraphResponseDto } from '../model/dto';
import { BASE_URL } from '@/src/app/config/baseurl';

const getDeviation = async (): Promise<DeviationGraphResponseDto> => {
  try {
    const response = await fetch(`${BASE_URL}/api/game/percentage`);

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

export const useGetDeviation = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['deviation'],
    queryFn: () => getDeviation(),
    retry: false,
  });

  return {
    data,
    isLoading,
    error,
  };
};
