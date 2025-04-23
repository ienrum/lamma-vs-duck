'use server';

import { getQueryClient } from '@/src/app/utils/get-query-client';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export const signoutAction = async () => {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);
  const queryClient = getQueryClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
  }

  queryClient.clear();
  redirect('/home');
};
