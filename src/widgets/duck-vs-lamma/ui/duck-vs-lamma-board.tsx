'use client'

import { useGame } from "../model/use-game.hook";
import { Button } from "@/src/shared/ui/button";
import { ChevronLeft } from "lucide-react";
import ReservedAnimalCells from "./reserved-animall-cells";
import GameScoreBox from "./game-score-box";
import GameBoard from "./game-board";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DuckVsLammaBoard = () => {
  const { currentEmojiBoard, backwardGame, gameInfo, reservedAnimalMaps } = useGame();
  const router = useRouter();

  useEffect(() => {
    if (gameInfo.isWon()) {
      router.push("/result");
    }
  }, [gameInfo, router]);

  return (
    <>
      <GameScoreBox gameInfo={gameInfo} />
      <ReservedAnimalCells reservedAnimalList={reservedAnimalMaps("down")} direction="down" />
      <div className="flex gap-4">
        <ReservedAnimalCells reservedAnimalList={reservedAnimalMaps("right")} direction="right" />
        <GameBoard currentEmojiBoard={currentEmojiBoard} />
        <ReservedAnimalCells reservedAnimalList={reservedAnimalMaps("left")} direction="left" />
      </div>
      <ReservedAnimalCells reservedAnimalList={reservedAnimalMaps("up")} direction="up" />
      <Button onClick={backwardGame}>
        <ChevronLeft />
      </Button>
    </>
  );
};

export default DuckVsLammaBoard;
