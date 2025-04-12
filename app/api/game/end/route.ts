import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { BaseResponseDto } from '@/src/app/model/backend/base-dto';
import { GameEndRequestDto, GameEndResponseDto } from '@/src/features/game/model/dto/game-end.dto';

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  try {
    const body = await request.json() as GameEndRequestDto;
    const { gameId, startId } = body;

    const startTime = await supabase.from('rank').select('start_time').eq('game_id', gameId).eq('start_id', startId).single();
    const endTime = new Date().toISOString();

    const score = new Date(endTime).getTime() - new Date(startTime.data?.start_time).getTime()

    const { data, error } = await supabase.from('rank').update({
      end_time: endTime,
      score,
    }).eq('game_id', gameId).eq('start_id', startId).select('id');

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