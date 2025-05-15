'use server';

import { getSupabaseUser } from '@/src/app/config/get-supabase-user';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { todayString } from '@/src/shared/config/today-string';
import { redirect } from 'next/navigation';
import { getQueryClient } from '@/src/app/utils/get-query-client';
import { BaseResponseDto } from '@/src/shared/types/base-response.dto';

export async function endGameAction(prevState: any, formData: FormData): Promise<BaseResponseDto<undefined>> {
  const gameId = formData.get('gameId')?.toString();
  const score = formData.get('score')?.toString();

  if (!gameId || !score) {
    return {
      status: 'error',
      data: null,
      error: 'Invalid form data',
    };
  }

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
  const endTime = new Date().toISOString();

  const { data: rankData } = await supabase
    .from('rank')
    .select('id, score')
    .eq('user_id', user.id)
    .gte('end_time', `${today} 00:00:00`)
    .lte('end_time', `${today} 23:59:59`)
    .eq('game_id', gameId)
    .single();

  // 당일 플레이시 return 에러
  if (rankData) {
    return {
      status: 'error',
      data: null,
      error: 'You have already played today',
    };
  }

  const { error } = await supabase.from('rank').insert({
    game_id: gameId,
    user_id: user.id,
    end_time: endTime,
    score,
  });

  if (error) {
    return {
      status: 'error',
      data: null,
      error: 'Rank insert failed',
    };
  }

  return {
    status: 'success',
    data: undefined,
    error: null,
  };
}
