import { BaseResponseDto } from "@/src/app/model/backend/base-dto";
import { useMutation } from "@tanstack/react-query";

const postCleanup = async (): Promise<BaseResponseDto<null>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/game/cleanup`, {
    method: "POST",
    cache: 'no-store',
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