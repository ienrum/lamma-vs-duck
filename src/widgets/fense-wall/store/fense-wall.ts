'use client';

import { Game, Scene, GameObjects, Physics, Tweens, Input } from 'phaser';
import { width, height } from '../config/constants';

export interface IRefPhaserGame {
  game: Game | null;
  scene: Scene | null;
}

export class FenseWall extends Scene {
  private player!: GameObjects.Text;
  private ducks: GameObjects.Group = new GameObjects.Group(this);
  private lammas: GameObjects.Group = new GameObjects.Group(this);
  private plantBombs: GameObjects.Group = new GameObjects.Group(this);
  private healthBar!: GameObjects.Graphics;
  private health: number = 100;
  private maxHealth: number = 100;
  private healthBarWidth: number = 200;
  private healthBarHeight: number = 20;
  private healthBarX: number = 20;
  private healthBarY: number = 20;
  private lastMoveTime: number = 0;
  private moveInterval: number = 200;
  private direction: { x: number; y: number } = { x: 1, y: 0 };
  private constantSpeed: number = 300; // 속도 증가
  private isMoving: boolean = false;
  private bounceForce: number = 1000;
  private dustCount: number = 6;
  private bounceTween!: Tweens.Tween;
  private lastEnemyTime: number = 0;
  private enemyInterval: number = 3000;
  private collisionForce: number = 1000;
  private lastHeartTime: number = 0;
  private heartInterval: number = 5000;
  private hearts: GameObjects.Group = new GameObjects.Group(this);
  private gameOver: boolean = false;
  private enemySpawnIndicators: GameObjects.Group = new GameObjects.Group(this);
  private nextEnemySpawns: { position: { x: number; y: number }; type: 'duck' | 'lamma'; time: number }[] = [];
  private spawnIndicatorDuration: number = 2000; // 2초 동안 표시

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
    this.plantBombs = this.add.group();
    this.isMoving = false;
    this.direction = { x: 1, y: 0 };
    this.ducks = this.add.group();
    this.lammas = this.add.group();
    this.health = this.maxHealth;
  }

  create() {
    // 물리 엔진 설정
    this.physics.world.setBounds(0, 0, width, height);
    this.physics.world.gravity.y = 0; // 중력 제거

    // 체력바 생성
    this.healthBar = this.add.graphics();
    this.updateHealthBar();

    // 적 스폰 인디케이터 그룹 생성
    this.enemySpawnIndicators = this.add.group();

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

    // 충돌 그룹 생성
    this.physics.add.collider(this.player, this.ducks, this.handlePlayerDuckCollision, undefined, this);
    this.physics.add.collider(this.player, this.lammas, this.handlePlayerLammaCollision, undefined, this);
    this.physics.add.collider(this.ducks, this.lammas, this.handleDuckLammaCollision, undefined, this);
    this.physics.add.collider(this.lammas, this.lammas, this.handleLammaLammaCollision, undefined, this);
    this.physics.add.collider(this.ducks, this.ducks, this.handleDuckDuckCollision, undefined, this);

    this.physics.add.collider(this.plantBombs, this.ducks, this.handlePlantBombCollision, undefined, this);
    this.physics.add.collider(this.plantBombs, this.lammas, this.handlePlantBombCollision, undefined, this);

    this.physics.add.collider(this.player, this.hearts, this.handleHeartCollision, undefined, this);

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
      this.input.keyboard.on('keydown-X', () => {
        if (this.plantBombs.getChildren().length > 0) {
          return;
        }
        const plantBomb = this.add.text(this.player.x, this.player.y, '🌱', { fontSize: '24px' });
        this.plantBombs.add(plantBomb);
        this.physics.world.enable(plantBomb);
        const plantBombBody = plantBomb.body as Physics.Arcade.Body;
        plantBombBody.setVelocity(0, 0);
        plantBombBody.setCollideWorldBounds(true);
        plantBombBody.setBounce(1);
        plantBombBody.setDrag(0.1);
      });
    }
  }

  private createHeart(position: { x: number; y: number }) {
    if (this.hearts.getChildren().length > 2) {
      return;
    }
    const heart = this.add.text(position.x, position.y, '💖', { fontSize: '24px' });
    heart.setOrigin(0.5);
    heart.setDepth(2);
    this.physics.world.enable(heart);
    const heartBody = heart.body as Physics.Arcade.Body;
    heartBody.setVelocity(0, 0);
    heartBody.setCollideWorldBounds(true);
    heartBody.setBounce(1);
    heartBody.setDrag(0.1);

    this.hearts.add(heart);
  }

  private createDuck(position: { x: number; y: number }) {
    const duck = this.add.text(position.x, position.y, '🦆', { fontSize: '32px' });
    duck.setOrigin(0);
    duck.setDepth(2);

    this.physics.world.enable(duck);
    const duckBody = duck.body as Physics.Arcade.Body;
    duckBody.setVelocity(this.constantSpeed, 0);
    duckBody.setCollideWorldBounds(true);
    duckBody.setBounce(1);
    duckBody.setDrag(0.1);
    duckBody.setMaxVelocity(400);
    duckBody.setFriction(0);
    duckBody.setDamping(false);

    this.ducks.add(duck);
  }

  private createLamma(position: { x: number; y: number }) {
    const lamma = this.add.text(position.x, position.y, '🦙', { fontSize: '32px' });
    lamma.setOrigin(0.5);
    lamma.setDepth(2);
    this.physics.world.enable(lamma);
    const lammaBody = lamma.body as Physics.Arcade.Body;
    lammaBody.setVelocity(this.constantSpeed, 0);
    lammaBody.setCollideWorldBounds(true);
    lammaBody.setBounce(1);
    lammaBody.setDrag(0.1);
    lammaBody.setMaxVelocity(400);
    lammaBody.setFriction(0);
    lammaBody.setDamping(false);

    this.lammas.add(lamma);
  }

  private handleCollision(a: any, b: any) {
    const aVectorX = b.body.velocity.x - a.body.velocity.x;
    const aVectorY = a.body.velocity.y - b.body.velocity.y;
    const bVectorX = a.body.velocity.x - b.body.velocity.x;
    const bVectorY = a.body.velocity.y - b.body.velocity.y;

    a.body.setVelocity(aVectorX * this.collisionForce, aVectorY * this.collisionForce);
    b.body.setVelocity(bVectorX * this.collisionForce, bVectorY * this.collisionForce);
  }

  private updateHealthBar() {
    this.healthBar.clear();

    // 배경 (빨간색)
    this.healthBar.fillStyle(0xff0000);
    this.healthBar.fillRect(this.healthBarX, this.healthBarY, this.healthBarWidth, this.healthBarHeight);

    // 체력 (초록색)
    this.healthBar.fillStyle(0x00ff00);
    this.healthBar.fillRect(
      this.healthBarX,
      this.healthBarY,
      (this.health / this.maxHealth) * this.healthBarWidth,
      this.healthBarHeight
    );
  }

  private handlePlayerDuckCollision(player: any, duck: any) {
    // 플레이어와 오리 충돌 처리
    console.log('플레이어와 오리 충돌!');
    this.health -= 10;
    this.updateHealthBar();
    this.handleCollision(player, duck);

    if (this.health <= 0) {
      console.log('게임 오버!');
      // 게임 오버 처리 추가
    }
  }

  private handlePlayerLammaCollision(player: any, lamma: any) {
    // 플레이어와 라마 충돌 처리
    console.log('플레이어와 라마 충돌!');
    this.health -= 10;
    this.updateHealthBar();
    this.handleCollision(player, lamma);

    if (this.health <= 0) {
      this.gameOver = true;
    }
  }

  private handleDuckLammaCollision(duck: any, lamma: any) {
    // 오리와 라마 충돌 처리
    console.log('오리와 라마 충돌!');
    // 여기에 충돌 시 처리할 로직 추가
    this.handleCollision(duck, lamma);
  }

  private handleLammaLammaCollision(lamma1: any, lamma2: any) {
    // 라마와 라마 충돌 처리
    console.log('라마와 라마 충돌!');
    // 여기에 충돌 시 처리할 로직 추가
    this.handleCollision(lamma1, lamma2);
  }

  private handleDuckDuckCollision(duck1: any, duck2: any) {
    // 오리와 오리 충돌 처리
    console.log('오리와 오리 충돌!');
    // 여기에 충돌 시 처리할 로직 추가
    this.handleCollision(duck1, duck2);
  }

  private handlePlantBombCollision(plantBomb: any, animal: any) {
    // 플랜트 폭탄과 오리 충돌 처리
    console.log('플랜트 폭탄과 오리 충돌!');
    this.handleCollision(plantBomb, animal);
    animal.destroy();
    plantBomb.destroy();

    // 체력 회복
    this.health = Math.min(this.health + 5, this.maxHealth);
    this.updateHealthBar();
  }

  private handleHeartCollision(player: any, heart: any) {
    // 하트와 플레이어 충돌 처리
    console.log('하트와 플레이어 충돌!');
    this.health = Math.min(this.health + 10, this.maxHealth);
    this.updateHealthBar();
    heart.destroy();
  }

  private getShortestGameObject(gameObject: GameObjects.GameObject, targetPositions: { x: number; y: number }[]) {
    return targetPositions.reduce(
      (shortest, targetPosition) => {
        const distance = Phaser.Math.Distance.Between(
          (gameObject.body as Physics.Arcade.Body).position.x,
          (gameObject.body as Physics.Arcade.Body).position.y,
          targetPosition.x,
          targetPosition.y
        );
        return distance < shortest.distance
          ? {
              position: targetPosition,
              distance,
            }
          : shortest;
      },
      { position: { x: 0, y: 0 }, distance: Infinity }
    ).position;
  }

  private createEnemySpawnIndicator(position: { x: number; y: number }, type: 'duck' | 'lamma') {
    const indicator = this.add.text(position.x, position.y, type === 'duck' ? '🦆?' : '🦙?', { fontSize: '32px' });
    indicator.setOrigin(0.5);
    indicator.setAlpha(0.5); // 반투명하게 표시
    this.enemySpawnIndicators.add(indicator);

    // 일정 시간 후 적 생성
    this.time.delayedCall(this.spawnIndicatorDuration, () => {
      indicator.destroy();
      if (type === 'duck') {
        this.createDuck(position);
      } else {
        this.createLamma(position);
      }
    });
  }

  update() {
    if (this.gameOver) return;

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

    // 오리 방향 설정
    this.ducks.getChildren().forEach((duck) => {
      let targetPosition = { x: 0, y: 0 };

      if (this.plantBombs.getChildren().length > 0) {
        const plantBombPosition = (this.plantBombs.getChildren()[0].body as Physics.Arcade.Body).position;
        const playerPosition = this.player.getCenter();

        targetPosition = this.getShortestGameObject(duck, [plantBombPosition, playerPosition]);
      } else {
        targetPosition = this.player.getCenter();
      }

      const duckPosition = (duck.body as Physics.Arcade.Body).position;
      const direction = {
        x: targetPosition.x - duckPosition.x,
        y: targetPosition.y - duckPosition.y,
      };

      (duck.body as Physics.Arcade.Body).setVelocity(direction.x, direction.y);
    });

    // lamma 방향 설정
    this.lammas.getChildren().forEach((lamma) => {
      let targetPosition = { x: 0, y: 0 };

      if (this.plantBombs.getChildren().length > 0) {
        const plantBombPosition = (this.plantBombs.getChildren()[0].body as Physics.Arcade.Body).position;
        const playerPosition = this.player.getCenter();

        targetPosition = this.getShortestGameObject(lamma, [plantBombPosition, playerPosition]);
      } else {
        targetPosition = this.player.getCenter();
      }

      const lammaPosition = (lamma.body as Physics.Arcade.Body).position;
      const direction = {
        x: targetPosition.x - lammaPosition.x,
        y: targetPosition.y - lammaPosition.y,
      };

      (lamma.body as Physics.Arcade.Body).setVelocity(direction.x, direction.y);
    });

    // 적 생성 타이밍 체크
    if (this.time.now - this.lastEnemyTime > this.enemyInterval) {
      const duckPosition = { x: Math.random() * width, y: Math.random() * height };
      const lammaPosition = { x: Math.random() * width, y: Math.random() * height };

      if (Math.random() > 0.5) {
        this.createEnemySpawnIndicator(duckPosition, 'duck');
      } else {
        this.createEnemySpawnIndicator(lammaPosition, 'lamma');
      }

      this.lastEnemyTime = this.time.now;
      this.enemyInterval -= 100;

      if (this.enemyInterval < 1000) {
        this.enemyInterval = 1000;
      }
    }

    // 하트 생성
    if (this.time.now - this.lastHeartTime > this.heartInterval) {
      const heartPosition = { x: Math.random() * width, y: Math.random() * height };
      this.createHeart(heartPosition);
      this.lastHeartTime = this.time.now;
    }
  }

  public isGameOver() {
    return this.gameOver;
  }

  public getHealth() {
    return {
      health: this.health,
      maxHealth: this.maxHealth,
    };
  }

  // 씬이 파괴될 때 정리 작업
  destroy() {
    // 모든 이벤트 리스너 제거
    if (this.input.keyboard) {
      this.input.keyboard.removeAllKeys();
    }
    // 모든 트윈 제거
    this.tweens.killAll();
    if (this.plantBombs) {
      this.plantBombs.destroy();
    }
    // 모든 객체 제거
    this.ducks.getChildren().forEach((duck) => duck.destroy());
    this.ducks = this.add.group();
    this.lammas.getChildren().forEach((lamma) => lamma.destroy());
    this.lammas = this.add.group();
    // 체력바 제거
    this.healthBar.destroy();
    // 스폰 인디케이터 제거
    this.enemySpawnIndicators.getChildren().forEach((indicator) => indicator.destroy());
    this.enemySpawnIndicators = this.add.group();
  }
}
