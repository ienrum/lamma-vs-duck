import { NextResponse } from 'next/server';
import { BaseResponseDto } from '@/src/app/model/backend/base-dto';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { GameListResponseDto } from '@/src/features/game/model/dto/game-list.dto';

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  try {
    const { data, error } = await supabase.from('game').select();

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json<BaseResponseDto<GameListResponseDto>>(
      {
        message: 'Game board fetched successfully',
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json<BaseResponseDto<null>>(
      {
        message: 'Failed to fetch game board',
        data: null,
      },
      { status: 500 }
    );
  }
}
