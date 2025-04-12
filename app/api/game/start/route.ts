import { BaseResponseDto } from '@/src/app/model/backend/base-dto';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { todayString } from '@/src/shared/config/today-string';
import { v4 as uuidv4 } from 'uuid';
import { GameStartResponseDto } from '@/src/features/game/model/dto/game-start.dto';

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  try {

    const startId = uuidv4();
    const today = todayString();

    // rank 테이블에 데이터 삽입
    const { data, error } = await supabase
      .from('rank')
      .insert({
        game_id: 1,
        start_time: new Date().toISOString(),
        today: today,
        start_id: startId,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message);
    }

    console.log('Inserted data:', data);

    return NextResponse.json<BaseResponseDto<GameStartResponseDto>>(
      {
        message: 'Game started successfully',
        data: {
          startId,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in API:', error);
    return NextResponse.json<BaseResponseDto<null>>(
      {
        message: 'Failed to start game',
        data: null,
      },
      { status: 500 }
    );
  }
} 