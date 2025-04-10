
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import ProfileButton from './ProfileButton';
import { getQueryClient } from '@/src/app/utils/get-query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export const ProfileLink = async () => {
  const queryClient = getQueryClient()

  const supabase = await createClient(await cookies())

  await queryClient.prefetchQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser()
      return data
    }
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileButton />
    </HydrationBoundary>
  )
}; 