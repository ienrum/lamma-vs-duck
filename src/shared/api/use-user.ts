import { useSuspenseQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

const getUser = async () => {
  const supabase = createClient()

  const { data } = await supabase.auth.getUser()

  return data
};

export const useUser = () => {
  const { data, isLoading, error } = useSuspenseQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });

  return data
};
