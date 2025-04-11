import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { todayString } from "@/src/shared/config/today-string";
import { BaseResponseDto } from "@/src/app/model/backend/base-dto";
import { mergeToday } from "@/src/app/utils/backend/db-today-utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not found');
  }

  const { data: rankData, error: rankError } = await supabase.from('rank').select('id').eq('user_id', user.id).eq('today', mergeToday(todayString(), user.id)).single();

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