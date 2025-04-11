import { BaseResponseDto } from '@/src/app/model/backend/base-dto';
import { GameStartRequestDto } from '@/src/features/game/model/dto/game-start.dto';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { mergeToday } from '@/src/app/utils/backend/db-today-utils';

export const todayString = new Date().toISOString().split('T')[0];

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  try {
    const body = await request.json() as GameStartRequestDto;
    const { gameId } = body;

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User not found');
    }

    const { data: rankData, error: rankError } = await supabase.from('rank').select('id').eq('game_id', gameId).eq('user_id', user.id).eq('today', mergeToday(todayString, user.id));

    if (rankError) {
      throw new Error(rankError.message);
    }

    if (rankData.length > 0) {
      return NextResponse.json<BaseResponseDto<null>>(
        {
          message: 'Game already started',
          data: null,
        },
        { status: 400 }
      );
    }

    const { error } = await supabase.from('rank').upsert({
      game_id: gameId,
      user_id: user.id,
      start_time: new Date().toISOString(),
      today: mergeToday(todayString, user.id)
    }, {
      onConflict: 'today'
    });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json<BaseResponseDto<null>>(
      {
        message: 'Game result recorded successfully',
        data: null,
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