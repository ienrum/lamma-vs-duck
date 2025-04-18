
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import ProfileButton from './ProfileButton';
import { getQueryClient } from '@/src/app/utils/get-query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getSupabaseUser } from '@/src/app/config/get-supabase-user';

export const ProfileLink = async () => {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const cookieStore = await cookies()
      const supabase = await createClient(cookieStore)
      const { data } = await getSupabaseUser(supabase)
      return data
    }
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileButton />
    </HydrationBoundary>
  )
}; 