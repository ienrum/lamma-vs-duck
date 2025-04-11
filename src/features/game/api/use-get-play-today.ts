import { useQuery } from "@tanstack/react-query";
import { BaseResponseDto } from "@/src/app/model/backend/base-dto";

const getPlayToday = async () => {
  const response = await fetch('/api/game/play-today');
  return response.json() as Promise<BaseResponseDto<boolean>>;
};

const useGetPlayToday = (enabled: boolean) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['playToday'],
    queryFn: () => getPlayToday(),
    select: (data) => data.data,
    enabled,
  });

  return { data, isLoading, error };
};

export default useGetPlayToday;
