import { NextResponse } from 'next/server';
import { BaseResponseDto } from '@/src/app/model/backend/base-dto';
import { GameBoardResponseDto } from '@/src/features/game/model/dto/game-board.dto';
import { generateGameData } from '@/src/app/model/util/generate-game-data';
import { getDailyGameData, setDailyGameData } from '@/src/app/model/game/game-data.model';
import { todayString } from '@/src/shared/config/today-string';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get('gameId');
    const today = todayString();

    // 오늘의 게임 데이터를 가져옴
    let gameData = getDailyGameData();

    // 오늘의 게임 데이터가 없는 경우 새로 생성
    if (!gameData) {
      const generatedData = generateGameData(5);
      const newGameData = {
        date: today,
        board: generatedData.board,
        reservedAnimalMaps: {
          up: generatedData.reservedAnimalMaps.up,
          down: generatedData.reservedAnimalMaps.down,
          left: generatedData.reservedAnimalMaps.left,
          right: generatedData.reservedAnimalMaps.right,
        },
        whoIsWin: generatedData.whoIsWin,
      };
      setDailyGameData(newGameData);
      gameData = newGameData;
    }

    return NextResponse.json<BaseResponseDto<GameBoardResponseDto>>(
      {
        message: 'Game board fetched successfully',
        data: {
          board: gameData.board,
          reservedAnimalMaps: gameData.reservedAnimalMaps,
          whoIsWin: gameData.whoIsWin,
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