'use server';

import { getSupabaseUser } from "@/src/app/config/get-supabase-user";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { mergeToday } from '@/src/app/utils/backend/db-today-utils';
import { todayString } from "@/src/shared/config/today-string";
import { redirect } from "next/navigation";

export async function endGameAction(prevState: any, formData: FormData) {
  const gameId = formData.get('gameId')?.toString();
  const startTime = formData.get('startTime')?.toString();

  if (!gameId || !startTime) {
    return { error: 'Invalid form data' };
  }

  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const { data: { user } } = await getSupabaseUser(supabase, cookieStore);

  if (!user) {
    return { error: 'User not found' };
  }

  const today = mergeToday(todayString(), user.id);
  const endTime = new Date().toISOString();

  const score = new Date(endTime).getTime() - new Date(startTime).getTime()
  const { data: rankData } = await supabase.from('rank').select('id').eq('user_id', user.id).eq('today', today).single();

  if (rankData) {
    return { error: 'Rank already exists' };
  }

  const { error } = await supabase.from('rank').insert({
    game_id: gameId,
    user_id: user.id,
    today,
    end_time: endTime,
    score,
  });

  if (error) {
    return { error: "game result record failed" };
  }

  redirect("/result");
}
