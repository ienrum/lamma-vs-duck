'use client'

import { useGame } from "../model/use-game.hook";
import ReservedAnimalCells from "./reserved-animall-cells";
import GameScoreBox from "./game-score-box";
import GameBoard from "./game-board";
import { useParams } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import useGetGameBoard from "@/src/features/game/api/use-get-game-board";
import Spinner from "@/src/shared/ui/spinner";
import { endGameAction } from "../api/end-game-action";
import { BoardState } from "@/src/entities/duck-vs-lamma/model/types";
import { Direction } from "@/src/entities/cross-pad/model/types";

let timer: NodeJS.Timeout;

interface GameState {
  score: number;
  boardState: BoardState;
  reservedAnimalMaps: Record<Direction, string[][]>;
}

const getLocalStorage = <T,>(key: string): T | null => {
  const jsonData = localStorage.getItem(key);
  const data = jsonData ? JSON.parse(jsonData) as T : null;
  return data;
}

const setLocalStorage = <T,>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
}

const DuckVsLammaBoard = () => {
  const { currentEmojiBoard, gameInfo, reservedAnimalMaps, setBoard, endGame } = useGame();
  const gameId = Number(useParams().gameId);
  const { data } = useGetGameBoard(gameId);
  const isWon = gameInfo.isWon();
  const gameEndRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(endGameAction, null);

  useEffect(() => {
    const gameState = getLocalStorage<GameState>('gameState');
    if (gameState && data.board && data.reservedAnimalMaps) {
      setBoard(data.board, data.reservedAnimalMaps, Number(gameState.score), gameState.boardState);
    } else {
      setBoard(data.board, data.reservedAnimalMaps);
    }
  }, [])

  useEffect(() => {
    timer = setInterval(() => {
      const playTime = gameInfo.playTime();
      setLocalStorage('gameState', {
        score: playTime,
        boardState: gameInfo.boardState(),
        reservedAnimalMaps: reservedAnimalMaps
      });
    }, 1000);

    return () => {
      clearInterval(timer)
    };
  }, []);

  useEffect(() => {
    if (isWon) {
      gameEndRef.current?.requestSubmit();
      clearInterval(timer);
      endGame(new Date());
      localStorage.removeItem('gameState');
    }
  }, [isWon]);

  if (!currentEmojiBoard) {
    return <Spinner size="lg" className="mx-auto" />;
  }

  if (state?.error) {
    return <div>{state.error}</div>;
  }

  return (
    <>
      <form action={formAction} hidden ref={gameEndRef}>
        <input type="hidden" name="gameId" value={gameId} />
        <input type="hidden" name="score" value={getLocalStorage<GameState>('gameState')?.score || '0'} />
      </form>
      {isPending && <Spinner size="lg" className="mx-auto" />}
      <GameScoreBox gameInfo={gameInfo} />
      <span className="w-full h-[1px] bg-gray-300 my-4" />
      <ReservedAnimalCells reservedAnimalList={reservedAnimalMaps("down")} direction="down" />
      <div className="flex gap-2">
        <ReservedAnimalCells reservedAnimalList={reservedAnimalMaps("right")} direction="right" />
        <GameBoard currentEmojiBoard={currentEmojiBoard} />
        <ReservedAnimalCells reservedAnimalList={reservedAnimalMaps("left")} direction="left" />
      </div>
      <ReservedAnimalCells reservedAnimalList={reservedAnimalMaps("up")} direction="up" />
    </>
  );
};

export default DuckVsLammaBoard;
