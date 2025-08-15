import { Scene } from 'phaser';
import { CARROCK_CONSTANTS } from './constants';

export class GameState {
  private scene: Scene;
  private health: number = CARROCK_CONSTANTS.HEALTH.INITIAL;
  private maxHealth: number = CARROCK_CONSTANTS.HEALTH.MAX;
  private score: number = CARROCK_CONSTANTS.SCORE.INITIAL;
  private highScore: number = 0;
  private gameOver: boolean = false;
  private gameStartTime: number = 0;
  private distance: number = 0;
  private lastScoreTime: number = 0;

  private healthChangeCallback?: (health: number, maxHealth: number) => void;
  private scoreChangeCallback?: (score: number, highScore: number) => void;

  constructor(scene: Scene) {
    this.scene = scene;
    this.gameStartTime = scene.time.now;
    this.lastScoreTime = scene.time.now;
  }

  public update() {
    if (this.gameOver) return;

    const now = this.scene.time.now;
    
    // 시간 기반 점수 증가 (1초마다)
    if (now - this.lastScoreTime >= 1000) {
      this.increaseScore(CARROCK_CONSTANTS.SCORE.TIME_POINTS);
      this.lastScoreTime = now;
    }
  }

  public increaseScore(points: number) {
    if (this.gameOver) return;
    
    this.score += points;
    
    if (this.score > this.highScore) {
      this.highScore = this.score;
    }
    
    this.scoreChangeCallback?.(this.score, this.highScore);
  }

  public decreaseHealth(amount: number) {
    if (this.gameOver) return;
    
    this.health = Math.max(0, this.health - amount);
    this.healthChangeCallback?.(this.health, this.maxHealth);
    
    if (this.health <= 0) {
      this.gameOver = true;
    }
  }

  public increaseHealth(amount: number) {
    if (this.gameOver) return;
    
    this.health = Math.min(this.maxHealth, this.health + amount);
    this.healthChangeCallback?.(this.health, this.maxHealth);
  }

  public addDistance(amount: number) {
    this.distance += amount;
    // 거리 기반 점수 추가 (선택적)
    if (this.distance % 100 === 0) { // 100 거리마다 보너스 점수
      this.increaseScore(CARROCK_CONSTANTS.SCORE.DISTANCE_POINTS);
    }
  }

  public isGameOver(): boolean {
    return this.gameOver;
  }

  public getHealth(): number {
    return this.health;
  }

  public getMaxHealth(): number {
    return this.maxHealth;
  }

  public getScore(): number {
    return this.score;
  }

  public getHighScore(): number {
    return this.highScore;
  }

  public getGameTime(): number {
    return this.scene.time.now - this.gameStartTime;
  }

  public getDistance(): number {
    return this.distance;
  }

  public onHealthChange(callback: (health: number, maxHealth: number) => void) {
    this.healthChangeCallback = callback;
  }

  public onScoreChange(callback: (score: number, highScore: number) => void) {
    this.scoreChangeCallback = callback;
  }

  public reset() {
    this.health = CARROCK_CONSTANTS.HEALTH.INITIAL;
    this.score = CARROCK_CONSTANTS.SCORE.INITIAL;
    this.gameOver = false;
    this.distance = 0;
    this.gameStartTime = this.scene.time.now;
    this.lastScoreTime = this.scene.time.now;
    
    // 콜백 호출
    this.healthChangeCallback?.(this.health, this.maxHealth);
    this.scoreChangeCallback?.(this.score, this.highScore);
  }
}