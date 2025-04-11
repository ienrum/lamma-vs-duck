import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { BaseResponseDto } from '@/src/app/model/backend/base-dto';
import { todayString } from '@/src/shared/config/today-string';
import { GameEndRequestDto, GameEndResponseDto } from '@/src/features/game/model/dto/game-end.dto';
import { mergeToday } from '@/src/app/utils/backend/db-today-utils';

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  try {
    const body = await request.json() as GameEndRequestDto;
    const { gameId } = body;
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;

    if (!userId) {
      throw new Error('User not found');
    }

    const today = mergeToday(todayString, userId);

    const startTime = await supabase.from('rank').select('start_time').eq('game_id', gameId).eq('user_id', userId).eq('today', today).single();
    const endTime = new Date().toISOString();

    const score = new Date(endTime).getTime() - new Date(startTime.data?.start_time).getTime()

    const { data, error } = await supabase.from('rank').update({
      end_time: endTime,
      score,
    }).eq('game_id', gameId).eq('user_id', userId).eq('today', today).select('id');

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error('No data found');
    }

    return NextResponse.json<BaseResponseDto<GameEndResponseDto>>(
      {
        message: 'Game result recorded successfully',
        data: {
          resultId: data[0].id,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in API:', error);
    return NextResponse.json<BaseResponseDto<null>>(
      {
        message: 'Failed to record game result',
        data: null,
      },
      { status: 500 }
    );
  }
} 