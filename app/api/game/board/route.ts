import { NextResponse } from 'next/server';
import { BaseResponseDto } from '@/src/app/model/backend/base-dto';
import { GameBoardResponseDto } from '@/src/features/game/model/dto/game-board.dto';
import { generateGameData } from '@/src/app/model/util/generate-game-data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get('gameId');

    const gameData = generateGameData(6);

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
