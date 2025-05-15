'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { getSupabaseUser } from '@/src/app/config/get-supabase-user';
import { BaseResponseDto } from '@/src/shared/types/base-response.dto';
import { todayString } from '@/src/shared/config/today-string';

export const playedToday = async (gameId: number): Promise<BaseResponseDto<boolean>> => {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);
  const {
    data: { user },
  } = await getSupabaseUser(supabase);

  if (!user) {
    return {
      status: 'error',
      data: null,
      error: 'User not found',
    };
  }

  const today = todayString();

  const { data, error } = await supabase
    .from('rank')
    .select('*')
    .eq('game_id', gameId)
    .eq('user_id', user.id)
    .gte('end_time', `${today} 00:00:00`)
    .lte('end_time', `${today} 23:59:59`)
    .single();

  console.log(data, error);

  return {
    status: 'success',
    data: !!data,
    error: null,
  };
};
