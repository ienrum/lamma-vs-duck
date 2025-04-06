import { useSuspenseQuery } from "@tanstack/react-query";
import { DeviationGraphResponseDto } from "../model/dto";
import { timeData, totalPlayers, myTime } from "../model/mock";
const getDeviation = async () => {
  const response = await new Promise<DeviationGraphResponseDto>((resolve) => {
    setTimeout(() => {
      resolve({
        timeData: timeData,
        myTime: myTime,
        total: totalPlayers,
      });
    }, 1000);
  });

  return response;
};

export const useGetDeviation = () => {
  const { data, isLoading, error } = useSuspenseQuery({
    queryKey: ["deviation"],
    queryFn: () => getDeviation(),
  });

  return {
    data,
    isLoading,
    error,
  };
};
