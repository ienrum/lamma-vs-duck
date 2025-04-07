import { useSuspenseQuery } from "@tanstack/react-query";
import { mockUserResponse, UserResponse } from "../model/user";

const getUser = async () => {
  const response = await new Promise<UserResponse>((resolve) => {
    setTimeout(() => {
      resolve(mockUserResponse);
    }, 1000);
  });
  return response;
};

export const useUser = () => {
  const { data, isLoading, error } = useSuspenseQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });

  return { user: data };
};
