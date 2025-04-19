import { useQuery } from "@tanstack/react-query";
import { BaseResponseDto } from "@/src/app/model/backend/base-dto";
import { BASE_URL } from "@/src/app/config/baseurl";
import { customFetchJson } from "@/src/shared/util/fetch-utils";

const getPlayToday = async () => {
  return await customFetchJson<BaseResponseDto<boolean>>(`${BASE_URL}/api/game/play-today`);
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
