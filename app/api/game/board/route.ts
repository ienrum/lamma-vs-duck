import { NextResponse } from 'next/server';
import { BaseResponseDto } from '@/src/app/model/backend/base-dto';
import { GameBoardResponseDto } from '@/src/features/game/model/dto/game-board.dto';
import { generateGameData } from '@/src/app/model/util/generate-game-data';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

// 오늘 날짜를 YYYY-MM-DD 형식으로 반환
function getTodayDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const gameId = parseInt(searchParams.get('gameId') || '1');
    const today = getTodayDate();

    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);

    // 오늘 날짜의 게임 데이터를 DB에서 조회
    const { data: dailyGame, error } = await supabase
      .from('daily_games')
      .select('*')
      .eq('game_date', today)
      .eq('game_id', gameId)
      .single();

    let gameData: GameBoardResponseDto;

    if (error || !dailyGame) {
      // DB에 오늘 날짜의 게임 데이터가 없으면 새로 생성하고 저장
      console.log('No daily game data found for today, generating new data...');
      const generatedData = generateGameData(5);

      // 새로 생성한 데이터를 DB에 저장
      const { error: insertError } = await supabase.from('daily_games').insert({
        game_date: today,
        game_id: gameId,
        difficulty: 5,
        board_data: generatedData.board,
        reserved_animal_maps: generatedData.reservedAnimalMaps,
        who_is_win: generatedData.whoIsWin,
      });

      if (insertError) {
        console.error('Failed to save generated game data:', insertError);
      }

      gameData = {
        board: generatedData.board,
        reservedAnimalMaps: generatedData.reservedAnimalMaps,
        whoIsWin: generatedData.whoIsWin,
      };
    } else {
      // DB에서 가져온 데이터 사용
      gameData = {
        board: dailyGame.board_data as string[][],
        reservedAnimalMaps: dailyGame.reserved_animal_maps as any,
        whoIsWin: dailyGame.who_is_win as 'duck' | 'lamma',
      };
    }

    return NextResponse.json<BaseResponseDto<GameBoardResponseDto>>(
      {
        message: 'Game board fetched successfully',
        data: gameData,
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
