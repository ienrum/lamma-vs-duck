'use client';

import { Scene } from 'phaser';
import { width, height } from '../config/constants';
import { Car } from './car';
import { MotorcycleManager } from './motorcycle-manager';
import { Background } from './background';
import { GameState } from './game-state';
import { MushroomManager } from './mushroom-item';
import { CARROCK_CONSTANTS } from './constants';

export class CarrockScene extends Scene {
  private car!: Car;
  private motorcycleManager!: MotorcycleManager;
  private background!: Background;
  private gameState!: GameState;
  private mushroomManager!: MushroomManager;
  private gameSpeed: number = CARROCK_CONSTANTS.CAR_SPEED.INITIAL;
  private gameStartTime: number = 0;
  private lastCollisionTime: number = 0;

  constructor() {
    super({ key: 'CarrockScene' });
  }

  init() {
    this.gameState = new GameState(this);
    this.car = new Car(this);
    this.motorcycleManager = new MotorcycleManager(this);
    this.mushroomManager = new MushroomManager(this);
    this.background = new Background(this);
    this.gameStartTime = this.time.now;
    this.lastCollisionTime = 0;
  }

  create() {
    this.background.create();
    this.car.create();
    this.motorcycleManager.create();
    this.mushroomManager.create();

    this.physics.world.setBounds(0, 0, width, height);
    this.physics.world.gravity.y = 0;
  }

  update() {
    if (this.gameState.isGameOver()) return;

    const gameTime = this.time.now - this.gameStartTime;

    // 게임 속도 조정
    this.updateGameSpeed(gameTime);

    // 게임 오브젝트들 업데이트
    this.car.update();
    this.motorcycleManager.update(gameTime);
    this.mushroomManager.update();
    this.gameState.update();

    // 충돌 검사
    this.checkCollisions();

    // 경계 검사 (게임 오버 조건)
    this.checkBoundaries();
  }

  private updateGameSpeed(gameTime: number) {
    const difficultyLevel = Math.floor(gameTime / CARROCK_CONSTANTS.DIFFICULTY_INCREASE_INTERVAL);

    this.gameSpeed = Math.min(
      CARROCK_CONSTANTS.CAR_SPEED.MAX,
      CARROCK_CONSTANTS.CAR_SPEED.INITIAL + difficultyLevel * CARROCK_CONSTANTS.CAR_SPEED.INCREASE
    );
  }

  private checkCollisions() {
    const now = this.time.now;

    // 버섯 수집 검사
    if (this.mushroomManager.checkCollision(this.car.getCar())) {
      this.car.activatePowerUp(10000); // 10초간 파워업
    }

    // 충돌 쿨다운 체크
    if (this.car.isCarInvincible() || now - this.lastCollisionTime < CARROCK_CONSTANTS.COLLISION_COOLDOWN) {
      return;
    }

    // 오토바이와의 충돌 검사
    const collisionResult = this.motorcycleManager.checkCollision(this.car.getCar(), this.car.isPoweredUpState());
    if (collisionResult.collided && collisionResult.shouldDamage) {
      this.handleCollision();
    }
  }

  private handleCollision() {
    this.lastCollisionTime = this.time.now;

    // 체력 감소
    this.gameState.decreaseHealth(CARROCK_CONSTANTS.HEALTH.COLLISION_DAMAGE);

    // 자동차를 무적 상태로 만들기
    this.car.makeInvincible();

    // 진동 효과 (선택적)
    this.cameras.main.shake(200, 0.02);
  }

  private checkBoundaries() {
    const carPosition = this.car.getPosition();

    // 화면 왼쪽 경계를 넘으면 게임 오버
    if (carPosition.x < -30) {
      this.gameState.decreaseHealth(this.gameState.getHealth()); // 즉시 게임 오버
    }
  }

  public isGameOver(): boolean {
    return this.gameState.isGameOver();
  }

  public onHealthChange(cb: (health: number, maxHealth: number) => void) {
    this.gameState.onHealthChange(cb);
  }

  public onScoreChange(cb: (score: number, highScore: number) => void) {
    this.gameState.onScoreChange(cb);
  }

  public getScore(): number {
    return this.gameState.getScore();
  }

  public getHighScore(): number {
    return this.gameState.getHighScore();
  }

  public getGameState() {
    return {
      score: this.gameState.getScore(),
      highScore: this.gameState.getHighScore(),
      health: this.gameState.getHealth(),
      maxHealth: this.gameState.getMaxHealth(),
      gameTime: this.gameState.getGameTime(),
      distance: this.gameState.getDistance(),
    };
  }

  public resetGame() {
    this.gameState.reset();
    this.car.reset();
    this.motorcycleManager.reset();
    this.mushroomManager.reset();
    this.gameSpeed = CARROCK_CONSTANTS.CAR_SPEED.INITIAL;
    this.gameStartTime = this.time.now;
    this.lastCollisionTime = 0;
  }

  public destroy() {
    this.car.destroy();
    this.motorcycleManager.destroy();
    this.mushroomManager.destroy();
    this.background.destroy();
    this.gameState.reset();
  }

  public getCar() {
    return this.car;
  }

  public getMotorcycleManager() {
    return this.motorcycleManager;
  }

  public increaseScore(points: number) {
    this.gameState.increaseScore(points);
  }

  public decreaseHealth(amount: number) {
    this.gameState.decreaseHealth(amount);
  }

  public getGameStartTime() {
    return this.gameStartTime;
  }
}
