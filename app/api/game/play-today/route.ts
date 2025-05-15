import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { todayString } from '@/src/shared/config/today-string';
import { BaseResponseDto } from '@/src/app/model/backend/base-dto';
import { NextResponse } from 'next/server';
import { getSupabaseUser } from '@/src/app/config/get-supabase-user';

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);
  const { searchParams } = new URL(request.url);
  const gameId = searchParams.get('gameId');

  if (!gameId) {
    return NextResponse.json<BaseResponseDto<boolean>>(
      { message: 'Game ID is required', data: false },
      { status: 400 }
    );
  }

  const {
    data: { user },
  } = await getSupabaseUser(supabase);

  if (!user) {
    return NextResponse.json<BaseResponseDto<boolean>>({ message: 'User not found', data: false }, { status: 200 });
  }

  const today = todayString();

  const { data: rankData, error: rankError } = await supabase
    .from('rank')
    .select('id')
    .eq('user_id', user.id)
    .gte('end_time', `${today} 00:00:00`)
    .lte('end_time', `${today} 23:59:59`)
    .eq('game_id', gameId)
    .single();

  if (!rankData) {
    return NextResponse.json<BaseResponseDto<{ isPlayed: boolean; gameId: number }>>(
      {
        message: 'No data',
        data: { isPlayed: false, gameId: Number(gameId) },
      },
      { status: 200 }
    );
  }

  return NextResponse.json<BaseResponseDto<{ isPlayed: boolean; gameId: number }>>(
    {
      message: 'Play today',
      data: { isPlayed: true, gameId: Number(gameId) },
    },
    { status: 200 }
  );
}
