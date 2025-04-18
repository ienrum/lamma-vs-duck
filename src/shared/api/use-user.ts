import { useSuspenseQuery } from "@tanstack/react-query";
import { getSupabaseUser } from "@/src/app/config/get-supabase-user";
import { createClient } from "@/utils/supabase/client";

const getUser = async () => {
  const supabase = createClient()
  const { data } = await getSupabaseUser(supabase)

  return data
};

export const useUser = () => {
  const { data, isLoading, error } = useSuspenseQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });

  return data
};
