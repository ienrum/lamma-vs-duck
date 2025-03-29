export type Direction = "up" | "down" | "left" | "right";


export interface CrossPadState {
  currentDirection: Direction | null;
  isPressed: boolean;
}