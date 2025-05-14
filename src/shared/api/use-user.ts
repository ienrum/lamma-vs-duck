import { useSuspenseQuery } from '@tanstack/react-query';
import { getSupabaseUser } from '@/src/app/config/get-supabase-user';
import { createClient } from '@/utils/supabase/client';
import { BASE_URL } from '@/src/app/config/baseurl';
import { Profile } from '@/app/api/user/route';
import { BaseResponseDto } from '@/src/app/model/backend/base-dto';

const getUser = async () => {
  const response = await fetch(`${BASE_URL}/api/user`);

  return response.json() as Promise<BaseResponseDto<Profile>>;
};

export const useUser = () => {
  const { data, isLoading, error } = useSuspenseQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
    select: (data) => data.data,
  });

  return { user: data, isLoading, error };
};
