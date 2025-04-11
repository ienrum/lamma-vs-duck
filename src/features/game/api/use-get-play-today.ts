import { useSuspenseQuery } from "@tanstack/react-query";
import { BaseResponseDto } from "@/src/app/model/backend/base-dto";

const getPlayToday = async () => {
  const response = await fetch('/api/game/play-today');
  return response.json() as Promise<BaseResponseDto<boolean>>;
};

const useGetPlayToday = () => {
  const { data, isLoading, error } = useSuspenseQuery({
    queryKey: ['playToday'],
    queryFn: () => getPlayToday(),
    select: (data) => data.data,
  });

  return { data, isLoading, error };
};

export default useGetPlayToday;
