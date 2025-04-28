import { Scene } from 'phaser';
import { GAME_CONSTANTS } from './constants';
import { HealthChangeHandler, ScoreChangeHandler } from './types';

export class GameState {
  private health: number = GAME_CONSTANTS.HEALTH.INITIAL;
  private maxHealth: number = GAME_CONSTANTS.HEALTH.MAX;
  private score: number = GAME_CONSTANTS.SCORE.INITIAL;
  private highScore: number = GAME_CONSTANTS.SCORE.INITIAL;
  private gameOver: boolean = false;
  private healthChangeHandler: HealthChangeHandler | null = null;
  private scoreChangeHandler: ScoreChangeHandler | null = null;

  constructor(private scene: Scene) {}

  public increaseScore(points: number) {
    this.score += points;
    if (this.score > this.highScore) {
      this.highScore = this.score;
    }
    if (this.scoreChangeHandler) {
      this.scoreChangeHandler(this.score, this.highScore);
    }
  }

  public decreaseHealth(amount: number) {
    this.health = Math.max(0, this.health - amount);
    if (this.healthChangeHandler) {
      this.healthChangeHandler(this.health, this.maxHealth);
    }
    if (this.health <= 0) {
      this.gameOver = true;
    }
  }

  public increaseHealth(amount: number) {
    this.health = Math.min(this.maxHealth, this.health + amount);
    if (this.healthChangeHandler) {
      this.healthChangeHandler(this.health, this.maxHealth);
    }
  }

  public onHealthChange(handler: HealthChangeHandler) {
    this.healthChangeHandler = handler;
    if (this.healthChangeHandler) {
      this.healthChangeHandler(this.health, this.maxHealth);
    }
  }

  public onScoreChange(handler: ScoreChangeHandler) {
    this.scoreChangeHandler = handler;
    if (this.scoreChangeHandler) {
      this.scoreChangeHandler(this.score, this.highScore);
    }
  }

  public isGameOver() {
    return this.gameOver;
  }

  public getScore() {
    return this.score;
  }

  public getHighScore() {
    return this.highScore;
  }

  public getHealth() {
    return this.health;
  }

  public getMaxHealth() {
    return this.maxHealth;
  }

  public reset() {
    this.health = GAME_CONSTANTS.HEALTH.INITIAL;
    this.maxHealth = GAME_CONSTANTS.HEALTH.MAX;
    this.score = GAME_CONSTANTS.SCORE.INITIAL;
    this.gameOver = false;
  }
}
