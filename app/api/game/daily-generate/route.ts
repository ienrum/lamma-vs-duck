import { NextResponse } from 'next/server';
import { BaseResponseDto } from '@/src/app/model/backend/base-dto';
import { generateGameData } from '@/src/app/model/util/generate-game-data';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { date, gameId = 1, difficulty = 5 } = await request.json();

    if (!date) {
      return NextResponse.json<BaseResponseDto<null>>(
        {
          message: 'Date parameter is required',
          data: null,
        },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);

    // 해당 날짜의 게임 데이터가 이미 있는지 확인
    const { data: existingGame } = await supabase
      .from('daily_games')
      .select('*')
      .eq('game_date', date)
      .eq('game_id', gameId)
      .single();

    if (existingGame) {
      return NextResponse.json<BaseResponseDto<any>>(
        {
          message: 'Game data for this date already exists',
          data: existingGame,
        },
        { status: 200 }
      );
    }

    // 새로운 게임 데이터 생성
    const gameData = generateGameData(difficulty);

    // 데이터베이스에 저장
    const { data, error } = await supabase
      .from('daily_games')
      .insert({
        game_date: date,
        game_id: gameId,
        difficulty: difficulty,
        board_data: gameData.board,
        reserved_animal_maps: gameData.reservedAnimalMaps,
        who_is_win: gameData.whoIsWin,
      })
      .select()
      .single();

    if (error) {
      console.error('Failed to save daily game data:', error);
      return NextResponse.json<BaseResponseDto<null>>(
        {
          message: 'Failed to save daily game data',
          data: null,
        },
        { status: 500 }
      );
    }

    return NextResponse.json<BaseResponseDto<any>>(
      {
        message: 'Daily game data generated and saved successfully',
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error generating daily game data:', error);
    return NextResponse.json<BaseResponseDto<null>>(
      {
        message: 'Internal server error',
        data: null,
      },
      { status: 500 }
    );
  }
}

// 관리용 API - 특정 날짜의 게임 데이터를 미리 생성하고 싶을 때 사용
export async function generateDailyGameForDate(date: string, gameId: number = 1, difficulty: number = 5) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  // 해당 날짜의 게임 데이터가 이미 있는지 확인
  const { data: existingGame } = await supabase
    .from('daily_games')
    .select('*')
    .eq('game_date', date)
    .eq('game_id', gameId)
    .single();

  if (existingGame) {
    return existingGame;
  }

  // 새로운 게임 데이터 생성
  const gameData = generateGameData(difficulty);

  // 데이터베이스에 저장
  const { data, error } = await supabase
    .from('daily_games')
    .insert({
      game_date: date,
      game_id: gameId,
      difficulty: difficulty,
      board_data: gameData.board,
      reserved_animal_maps: gameData.reservedAnimalMaps,
      who_is_win: gameData.whoIsWin,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to save daily game data: ${error.message}`);
  }

  return data;
}
