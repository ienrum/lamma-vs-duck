'use client'

import { Button } from "@/src/shared/ui/button";
import { ChevronLeft } from "lucide-react";
import { useGame } from "../model/use-game.hook";

const BackwardButton = () => {
  const { backwardGame } = useGame();

  return (<Button variant="outline" onClick={backwardGame}>
    <ChevronLeft />
  </Button>)
}

export default BackwardButton;