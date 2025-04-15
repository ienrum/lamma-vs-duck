'use client'

import { useGame } from "../model/use-game.hook";
import ReservedAnimalCells from "./reserved-animall-cells";
import GameScoreBox from "./game-score-box";
import GameBoard from "./game-board";
import { useParams } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";
import useGetGameBoard from "@/src/features/game/api/use-get-game-board";
import Spinner from "@/src/shared/ui/spinner";
import { endGameAction } from "../api/end-game-action";

const DuckVsLammaBoard = () => {
  const { currentEmojiBoard, gameInfo, reservedAnimalMaps, setBoard } = useGame();

  const gameId = Number(useParams().gameId);
  const { data } = useGetGameBoard(gameId);
  const isWon = gameInfo.isWon();
  const gameEndRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(endGameAction, null);

  useEffect(() => {
    setBoard(data.board, data.reservedAnimalMaps);
  }, [])

  useEffect(() => {
    if (isWon) {
      gameEndRef.current?.requestSubmit();
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
        <input type="hidden" name="startTime" value={new Date().toISOString()} />
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
