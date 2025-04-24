import { CrossPad } from '@/src/features/cross-pad/ui/CrossPad';
import DuckVsLammaBoard from '@/src/widgets/duck-vs-lamma/ui/duck-vs-lamma-board';
import BackwardButton from '@/src/widgets/duck-vs-lamma/ui/backward-button';
import { getSupabaseUser } from '@/src/app/config/get-supabase-user';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

const LammaVsDuckPage = async () => {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);
  const {
    data: { user },
  } = await getSupabaseUser(supabase);

  const isAuthenticated = user !== null;

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <DuckVsLammaBoard isAuthenticated={isAuthenticated} />
      <div className="flex gap-4 py-8">
        <CrossPad />
        <BackwardButton />
      </div>
    </div>
  );
};

export default LammaVsDuckPage;
