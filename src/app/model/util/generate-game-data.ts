const completionMessage = `
Game Goal 🎯
- Match the number of 🦙lamas and 🦆ducks on the board!

Game Rules 🎮
- Use the ↑/↓/←/→ buttons to move the entire **row and column** on the board
  - The tiles waiting at the edges will automatically enter when moving

Winning Condition 🏆
- Match the number of 🦙lamas and 🦆ducks on the board!

이런 룰을 가진 게임이 있습니다.

최대한 게임을 즐기게 하기 위해 오직 하나의 답만 존재하도록 game data를 만드려합니다. 

만들어주세요 형식은 다음과 같습니다.

export type Direction = "up" | "down" | "left" | "right";

export interface GameBoardRequestDto {
  gameId: string;
  userId: string;
}
export enum BoardCell {
  Empty = '0',
  Duck = '1',
  Lamma = '2',
}

export interface GameBoardResponseDto {
  board: string[][];
  reservedAnimalMaps: Record<Direction, BoardCell[][]>;
}`

export function generateGameData(difficulty: number) {
  return {
    board: [
      ["1", "1"],
      ["1", "1"]
    ],
    reservedAnimalMaps: {
      up: [["2", "0"]],
      down: [["0", "2"]],
      left: [["0", "2"]],
      right: [["2", "0"]]
    }
  };
}
