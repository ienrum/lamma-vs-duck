import { BaseResponseDto } from "@/src/app/model/backend/base-dto";
import { useMutation } from "@tanstack/react-query";

const postCleanup = async (): Promise<BaseResponseDto<null>> => {
  const response = await fetch("/api/game/cleanup", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

const usePostCleanup = () => {
  return useMutation({
    mutationFn: () => postCleanup(),
  });
};

export default usePostCleanup;