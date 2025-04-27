import { getSupabaseUser } from '@/src/app/config/get-supabase-user';
import FenseWallScene from '@/src/widgets/fense-wall/ui/fense-wall-scene';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

const FenseWallPage = async () => {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);
  const {
    data: { user },
  } = await getSupabaseUser(supabase);

  const isAuthenticated = user !== null;
  return <FenseWallScene isAuthenticated={isAuthenticated} />;
};

export default FenseWallPage;
