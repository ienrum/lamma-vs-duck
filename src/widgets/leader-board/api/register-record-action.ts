'use server';

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import { cookies } from "next/headers";
import { z } from "zod";
import { getQueryClient } from "@/src/app/utils/get-query-client";


const recordFormSchema = z.object({
  name: z.string().min(1).max(10),
  startId: z.string(),
  gameId: z.string(),
});

export async function registerRecordAction(prevState: any, formData: FormData) {
  const name = formData?.get('name');
  const startId = formData?.get('startId');
  const gameId = formData?.get('gameId');

  const validatedFields = recordFormSchema.safeParse({
    name,
    startId,
    gameId,
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.formErrors.fieldErrors.name };
  }

  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const { data: userData, error: userError } = await supabase.from('user').insert({
    name,
  }).select('id').single();

  if (userError) {
    return { error: "User name already exists" };
  }

  const { data, error } = await supabase.from('rank').update({
    user_id: userData?.id,
  }).eq('game_id', gameId).eq('start_id', startId).select('id');

  if (error) {
    return { error: "Rank creation failed" };
  }

  await new Promise(resolve => setTimeout(resolve, 1000));
  const queryClient = getQueryClient();
  queryClient.invalidateQueries({ queryKey: ["ranking", gameId] });

  redirect('/result');
}