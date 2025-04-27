'use server';

import { getSupabaseUser } from '@/src/app/config/get-supabase-user';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { todayString } from '@/src/shared/config/today-string';
import { redirect } from 'next/navigation';
import { getQueryClient } from '@/src/app/utils/get-query-client';

export async function endGameAction(prevState: any, formData: FormData) {
  const gameId = formData.get('gameId')?.toString();
  const score = formData.get('score')?.toString();

  if (!gameId || !score) {
    return { error: 'Invalid form data' };
  }

  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const {
    data: { user },
  } = await getSupabaseUser(supabase);

  if (!user) {
    return { error: 'User not found' };
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

  let compareScore = false;
  if (gameId === '1') {
    compareScore = Number(score) < Number(rankData?.score);
  } else if (gameId === '2') {
    compareScore = Number(score) > Number(rankData?.score);
  }

  if (rankData) {
    if (compareScore) {
      const { error } = await supabase
        .from('rank')
        .update({
          end_time: endTime,
          score,
        })
        .eq('id', rankData.id);

      if (error) {
        return { error: 'Rank update failed' };
      }
    }
  } else {
    const { error } = await supabase.from('rank').insert({
      game_id: gameId,
      user_id: user.id,
      end_time: endTime,
      score,
    });

    if (error) {
      return { error: 'Rank insert failed' };
    }
  }

  getQueryClient().invalidateQueries({ queryKey: ['deviation'] });

  redirect(`/result/${gameId}`);
}
