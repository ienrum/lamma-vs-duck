import { Game, Scene, GameObjects, Physics } from 'phaser';

export interface IRefPhaserGame {
  game: Game | null;
  scene: Scene | null;
}

export type EnemyType = '🦆' | '🦙';

export interface EnemyPosition {
  x: number;
  y: number;
  type: EnemyType;
}

export interface GameState {
  score: number;
  highScore: number;
  health: number;
  maxHealth: number;
  gameTime: number;
}

export interface HealthChangeHandler {
  (health: number, maxHealth: number): void;
}

export interface ScoreChangeHandler {
  (score: number, highScore: number): void;
}
