import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import ProfileButton from './ProfileButton';
import { getQueryClient } from '@/src/app/utils/get-query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getSupabaseUser } from '@/src/app/config/get-supabase-user';

export const ProfileLink = async () => {
  const queryClient = getQueryClient();
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);
  const {
    data: { user },
  } = await getSupabaseUser(supabase);

  const { data } = await supabase.from('members').select('*').eq('id', user!.id).single();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileButton />
    </HydrationBoundary>
  );
};
