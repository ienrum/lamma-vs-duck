'use client';

import { Game, Scene, GameObjects, Physics, Tweens, Input } from 'phaser';
import { width, height } from '../config/constants';

export interface IRefPhaserGame {
  game: Game | null;
  scene: Scene | null;
}

export class FenseWall extends Scene {
  private player!: GameObjects.Text;
  private trail: GameObjects.Text[] = [];
  private lastMoveTime: number = 0;
  private moveInterval: number = 200;
  private direction: { x: number; y: number } = { x: 1, y: 0 };
  private constantSpeed: number = 300; // 속도 증가
  private trailPositions: { x: number; y: number }[] = [];
  private isMoving: boolean = false;
  private bounceForce: number = 1000;
  private dustCount: number = 6;
  private bounceTween!: Tweens.Tween;

  constructor() {
    super({ key: 'FenseWall' });
  }

  public moveLeft() {
    this.direction = { x: -1, y: 0 };
    this.isMoving = true;
  }

  public moveRight() {
    this.direction = { x: 1, y: 0 };
    this.isMoving = true;
  }

  public moveUp() {
    this.direction = { x: 0, y: -1 };
    this.isMoving = true;
  }

  public moveDown() {
    this.direction = { x: 0, y: 1 };
    this.isMoving = true;
  }

  init() {
    // 씬 초기화 시 모든 상태 초기화
    this.trail = [];
    this.trailPositions = [];
    this.isMoving = false;
    this.direction = { x: 1, y: 0 };
  }

  create() {
    // 물리 엔진 설정
    this.physics.world.setBounds(0, 0, width, height);
    this.physics.world.gravity.y = 0; // 중력 제거

    // 플레이어 생성
    this.player = this.add.text(width / 2, height / 2, '🦔', { fontSize: '32px' });
    this.player.setOrigin(0.5);
    this.player.setDepth(2);
    this.physics.world.enable(this.player);
    const playerBody = this.player.body as Physics.Arcade.Body;
    playerBody.setCollideWorldBounds(true);
    playerBody.setBounce(1);
    playerBody.setDrag(0.1); // 약간의 드래그 추가
    playerBody.setMaxVelocity(400);
    playerBody.setFriction(0);
    playerBody.setDamping(false); // 감쇠 효과 비활성화

    // 키보드 입력 처리
    if (this.input.keyboard) {
      this.input.keyboard.on('keydown-LEFT', () => {
        this.direction = { x: -1, y: 0 };
        this.isMoving = true;
      });
      this.input.keyboard.on('keydown-RIGHT', () => {
        this.direction = { x: 1, y: 0 };
        this.isMoving = true;
      });
      this.input.keyboard.on('keydown-UP', () => {
        this.direction = { x: 0, y: -1 };
        this.isMoving = true;
      });
      this.input.keyboard.on('keydown-DOWN', () => {
        this.direction = { x: 0, y: 1 };
        this.isMoving = true;
      });
    }
  }

  update() {
    // 플레이어를 현재 방향으로 일정한 속도로 이동
    if (this.player.body) {
      const playerBody = this.player.body as Physics.Arcade.Body;
      const currentVelocity = playerBody.velocity.clone();

      // 방향에 따른 속도 설정
      const targetVelocityX = this.direction.x * this.constantSpeed;
      const targetVelocityY = this.direction.y * this.constantSpeed;

      // 현재 속도에서 목표 속도로 부드럽게 전환
      playerBody.setVelocity(
        Phaser.Math.Linear(currentVelocity.x, targetVelocityX, 0.1),
        Phaser.Math.Linear(currentVelocity.y, targetVelocityY, 0.1)
      );
    }

    // 플레이어의 위치를 기록
    this.trailPositions.unshift({ x: this.player.x, y: this.player.y });

    // 꼬리 추가
    if (this.time.now - this.lastMoveTime > this.moveInterval) {
      const trail = this.add.text(this.player.x, this.player.y, '🌱', { fontSize: '24px' });
      trail.setOrigin(0.5);
      trail.setDepth(0);
      this.trail.push(trail);

      // 1초 후 꼬리 제거
      this.time.delayedCall(1000, () => {
        if (this.trail.length > 0) {
          const oldestTrail = this.trail.shift();
          if (oldestTrail) {
            oldestTrail.destroy();
          }
          this.trailPositions.pop();
        }
      });

      this.lastMoveTime = this.time.now;
    }
  }

  // 씬이 파괴될 때 정리 작업
  destroy() {
    // 모든 이벤트 리스너 제거
    if (this.input.keyboard) {
      this.input.keyboard.removeAllKeys();
    }
    // 모든 트윈 제거
    this.tweens.killAll();
    // 모든 객체 제거
    this.trail.forEach((trail) => trail.destroy());
    this.trail = [];
    this.trailPositions = [];
  }
}
