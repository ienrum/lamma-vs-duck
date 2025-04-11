import { NextResponse } from 'next/server';
import { BaseResponseDto } from '@/src/app/model/backend/base-dto';
import { GameBoardResponseDto } from '@/src/features/game/model/dto/game-board.dto';

const todayDuckBoard = {
  board: [
    ["1", "0", "1"],
    ["2", "1", "1"],
    ["1", "1", "1"]],
  reservedAnimalMaps: {
    up: [["1", "1", "0"], ["1", "2", "2"], ["1", "1", "0"]],
    down: [["1", "1", "0"], ["1", "2", "2"], ["1", "1", "0"]],
    left: [["1", "1", "0"], ["1", "2", "2"], ["1", "1", "0"]],
    right: [["2", "1", "0"], ["1", "2", "2"], ["1", "1", "0"]],
  }
};

export async function GET(request: Request) {

  try {
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get('gameId');

    return NextResponse.json<BaseResponseDto<GameBoardResponseDto>>(
      {
        message: 'Game board fetched successfully',
        data: {
          board: todayDuckBoard.board,
          reservedAnimalMaps: todayDuckBoard.reservedAnimalMaps,
        },
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