'use client'

import { useGame } from "../model/use-game.hook";
import ReservedAnimalCells from "./reserved-animall-cells";
import GameScoreBox from "./game-score-box";
import GameBoard from "./game-board";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import usePostEnd from "@/src/features/game/api/use-post-game-end";
import useGetGameBoard from "@/src/features/game/api/use-get-game-board";
import Spinner from "@/src/shared/ui/spinner";


const DuckVsLammaBoard = () => {
  const { currentEmojiBoard, gameInfo, reservedAnimalMaps, setBoard } = useGame();
  const router = useRouter();

  const gameId = Number(useParams().gameId);

  const { mutate: postEnd } = usePostEnd();
  const { data } = useGetGameBoard(gameId);
  const isWon = gameInfo.isWon();

  useEffect(() => {
    setBoard(data.board, data.reservedAnimalMaps);
  }, [])

  useEffect(() => {
    if (isWon) {
      postEnd({ gameId }, {
        onSuccess: () => {
          router.push("/result");
        }
      });
    }
  }, [isWon]);

  if (!currentEmojiBoard) {
    return <Spinner size="lg" className="mx-auto" />;
  }

  return (
    <>
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
