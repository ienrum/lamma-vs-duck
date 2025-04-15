import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { todayString } from "@/src/shared/config/today-string";
import { BaseResponseDto } from "@/src/app/model/backend/base-dto";
import { NextResponse } from "next/server";
import { getSupabaseUser } from "@/src/app/config/get-supabase-user";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const { data: { user } } = await getSupabaseUser(supabase, cookieStore)

  if (!user) {
    throw new Error('User not found');
  }

  const today = todayString();

  const { data: rankData, error: rankError } = await supabase.from('rank').select('id').eq('user_id', user.id)
    .gte('end_time', `${today} 00:00:00`)
    .lte('end_time', `${today} 23:59:59`)
    .single();

  if (rankError) {
    console.error(rankError);
  }

  if (!rankData) {
    return NextResponse.json<BaseResponseDto<boolean>>(
      {
        message: 'No data',
        data: false,
      },
      { status: 200 }
    );
  }

  return NextResponse.json<BaseResponseDto<boolean>>(
    {
      message: 'Play today',
      data: true,
    },
    { status: 200 }
  );
}