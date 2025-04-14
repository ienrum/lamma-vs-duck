import { todayString } from "@/src/shared/config/today-string";
import { mergeToday } from "@/src/app/utils/backend/db-today-utils";
import LammaVsDuckTopbar from "@/src/page/game/lamma-vs-duck/lamma-vs-duck.topbar";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSupabaseUser } from "@/src/app/config/get-supabase-user";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const { data: { user } } = await getSupabaseUser(supabase, cookieStore)

  if (!user) {
    throw new Error('User not found');
  }

  const { data: rankData } = await supabase.from('rank').select('id').eq('user_id', user.id).eq('today', mergeToday(todayString(), user.id)).single();

  if (rankData) {
    redirect('/result');
  }

  return (
    <div>
      <LammaVsDuckTopbar />
      <div className="py-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;