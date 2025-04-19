export enum BoardCell {
  Empty = '0',
  Duck = '1',
  Lamma = '2',
}

export const boardCellEmoji = {
  [BoardCell.Empty]: " ",
  [BoardCell.Duck]: "🦆",
  [BoardCell.Lamma]: "🦙",
}

export const animalCells = [
  BoardCell.Empty,
  BoardCell.Duck,
  BoardCell.Lamma,
]

export const animalEmojiCells = [
  boardCellEmoji[BoardCell.Empty],
  boardCellEmoji[BoardCell.Duck],
  boardCellEmoji[BoardCell.Lamma],
]
