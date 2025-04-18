'use server';

import { getSupabaseUser } from "@/src/app/config/get-supabase-user";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { todayString } from "@/src/shared/config/today-string";
import { redirect } from "next/navigation";

export async function endGameAction(prevState: any, formData: FormData) {
  const gameId = formData.get('gameId')?.toString();
  const score = formData.get('score')?.toString();

  if (!gameId || !score) {
    return { error: 'Invalid form data' };
  }

  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const { data: { user } } = await getSupabaseUser(supabase);

  if (!user) {
    return { error: 'User not found' };
  }

  const today = todayString();
  const endTime = new Date().toISOString();

  const { data: rankData } = await supabase.from('rank').select('id').eq('user_id', user.id)
    .gte('end_time', `${today} 00:00:00`)
    .lte('end_time', `${today} 23:59:59`)
    .single();

  if (rankData) {
    return { error: 'Rank already exists' };
  }

  const { error } = await supabase.from('rank').insert({
    game_id: gameId,
    user_id: user.id,
    end_time: endTime,
    score,
  });

  if (error) {
    return { error: "game result record failed" };
  }

  redirect("/result");
}
