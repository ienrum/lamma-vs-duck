export type Direction = "up" | "down" | "left" | "right";

export interface DirectionSnapshot {
  prevDirection: Direction | null
  currentDirection: Direction | null
}

export interface CrossPadState {
  currentDirection: Direction | null;
  isPressed: boolean;
}

export interface CrossPadEvents {
  onPress: (direction: Direction) => void;
} 