export enum BoardCell {
  Empty = '0',
  Duck = '1',
  Lamma = '2',
  PositionSwitch = 'x',
  TileSwitch = 'y',
  NothingSwitch = 'z',
  Void = ' ',
}

export const boardCellEmoji = {
  [BoardCell.Empty]: " ",
  [BoardCell.Duck]: "🦆",
  [BoardCell.Lamma]: "🦙",
  [BoardCell.PositionSwitch]: "🔄",
  [BoardCell.TileSwitch]: "⚡",
  [BoardCell.NothingSwitch]: "✖️",
  [BoardCell.Void]: "-1",
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

export const switchCells = [
  BoardCell.PositionSwitch,
  BoardCell.TileSwitch,
  BoardCell.NothingSwitch,
]

export const switchEmojiCells = [
  boardCellEmoji[BoardCell.PositionSwitch],
  boardCellEmoji[BoardCell.TileSwitch],
  boardCellEmoji[BoardCell.NothingSwitch],
]

