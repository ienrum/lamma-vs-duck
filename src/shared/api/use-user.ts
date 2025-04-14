import { useSuspenseQuery } from "@tanstack/react-query";
import { getSupabaseUser } from "@/src/app/config/get-supabase-user";

const getUser = async () => {
  const { data } = await getSupabaseUser()

  return data
};

export const useUser = () => {
  const { data, isLoading, error } = useSuspenseQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });

  return data
};
