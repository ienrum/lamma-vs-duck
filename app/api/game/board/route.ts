import { NextResponse } from 'next/server';
import { BaseResponseDto } from '@/src/app/model/backend/base-dto';
import { GameBoardResponseDto } from '@/src/features/game/model/dto/game-board.dto';
import { generateGameData } from '@/src/app/model/util/generate-game-data';
import { v4 as uuidv4 } from 'uuid';
import { todayString } from '@/src/shared/config/today-string';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  try {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get('gameId');
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


    // 오늘의 게임 데이터가 없는 경우 새로 생성
    const generatedData = generateGameData(6);
    const newGameData = {
      date: today,
      board: generatedData.board,
      reservedAnimalMaps: {
        up: generatedData.reservedAnimalMaps.up,
        down: generatedData.reservedAnimalMaps.down,
        left: generatedData.reservedAnimalMaps.left,
        right: generatedData.reservedAnimalMaps.right,
      },
    };
    const gameData = newGameData;

    return NextResponse.json<BaseResponseDto<GameBoardResponseDto>>(
      {
        message: 'Game board fetched successfully',
        data: {
          board: gameData.board,
          reservedAnimalMaps: gameData.reservedAnimalMaps,
          startId,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to fetch game board:', error);
    return NextResponse.json<BaseResponseDto<null>>(
      {
        message: 'Failed to fetch game board',
        data: null,
      },
      { status: 500 }
    );
  }
} 