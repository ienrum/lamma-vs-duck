'use client'

import { useGame } from "../model/use-game.hook";
import ReservedAnimalCells from "./reserved-animall-cells";
import GameScoreBox from "./game-score-box";
import GameBoard from "./game-board";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import useGetGameBoard from "@/src/features/game/api/use-get-game-board";
import usePostCleanup from "@/src/features/game/api/use-post-game-cleanup";
import Spinner from "@/src/shared/ui/spinner";
import RecordForm from "@/src/features/record-form/record-form";
import { getQueryClient } from "@/src/app/utils/get-query-client";

const DuckVsLammaBoard = () => {
  const { currentEmojiBoard, gameInfo, reservedAnimalMaps, setBoard, clearBoard } = useGame();

  const gameId = Number(useParams().gameId);

  const { data } = useGetGameBoard(gameId);

  const isWon = gameInfo.isWon();

  useEffect(() => {
    setBoard(data.board, data.reservedAnimalMaps);

    return () => {
      clearBoard();
      getQueryClient().invalidateQueries({ queryKey: ['gameBoard', gameId] });
    }
  }, [])

  if (!currentEmojiBoard) {
    return <Spinner size="lg" className="mx-auto" />;
  }

  return (
    <>
      {isWon && <RecordForm startId={data.startId} />}
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
