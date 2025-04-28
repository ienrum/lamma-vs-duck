'use client';

import { Scene } from 'phaser';
import { width, height } from '../config/constants';
import { Player } from './player';
import { EnemyManager } from './enemy';
import { Background } from './background';
import { GameState } from './game-state';
import { GAME_CONSTANTS } from './constants';

export class FenseWall extends Scene {
  private player!: Player;
  private enemyManager!: EnemyManager;
  private background!: Background;
  private gameState!: GameState;
  private constantSpeed: number = GAME_CONSTANTS.PLAYER_SPEED.INITIAL;
  private gameStartTime: number = 0;

  constructor() {
    super({ key: 'FenseWall' });
  }

  init() {
    this.gameState = new GameState(this);
    this.player = new Player(this);
    this.enemyManager = new EnemyManager(this);
    this.background = new Background(this);
    this.gameStartTime = this.time.now;
  }

  create() {
    this.background.create();
    this.player.create();
    this.enemyManager.create();

    this.physics.world.setBounds(0, 0, width, height);
    this.physics.world.gravity.y = 0;
  }

  update() {
    if (this.gameState.isGameOver()) return;

    const elapsedTime = this.time.now - this.gameStartTime;
    const difficultyLevel = Math.floor(elapsedTime / 15000);

    this.constantSpeed = Math.min(
      GAME_CONSTANTS.PLAYER_SPEED.MAX,
      GAME_CONSTANTS.PLAYER_SPEED.INITIAL + difficultyLevel * GAME_CONSTANTS.PLAYER_SPEED.INCREASE
    );

    this.player.update(this.constantSpeed);
    this.enemyManager.update();
  }

  public moveLeft() {
    this.player.moveLeft();
  }

  public moveRight() {
    this.player.moveRight();
  }

  public stopRotation() {
    this.player.stopRotation();
  }

  public moveUp() {
    this.player.moveUp();
  }

  public moveDown() {
    this.player.moveDown();
  }

  public stopVerticalMovement() {
    this.player.stopVerticalMovement();
  }

  public isGameOver() {
    return this.gameState.isGameOver();
  }

  public onHealthChange(cb: (health: number, maxHealth: number) => void) {
    this.gameState.onHealthChange(cb);
  }

  public onScoreChange(cb: (score: number, highScore: number) => void) {
    this.gameState.onScoreChange(cb);
  }

  public getScore() {
    return this.gameState.getScore();
  }

  public getHighScore() {
    return this.gameState.getHighScore();
  }

  public destroy() {
    this.player.destroy();
    this.enemyManager.destroy();
    this.background.destroy();
    this.gameState.reset();
  }

  public getPlayer() {
    return this.player;
  }

  public getGameState() {
    return {
      score: this.gameState.getScore(),
      highScore: this.gameState.getHighScore(),
      health: this.gameState.getHealth(),
      maxHealth: this.gameState.getMaxHealth(),
      gameTime: this.time.now - this.gameStartTime,
    };
  }

  public getGameStartTime() {
    return this.gameStartTime;
  }

  public increaseScore(points: number) {
    this.gameState.increaseScore(points);
  }
}
