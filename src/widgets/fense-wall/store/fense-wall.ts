'use client';

import { Game, Scene, GameObjects, Physics, Tweens, Input } from 'phaser';
import { width, height } from '../config/constants';

export interface IRefPhaserGame {
  game: Game | null;
  scene: Scene | null;
}

export class FenseWall extends Scene {
  private player!: GameObjects.Text;
  private coins: GameObjects.Group = new GameObjects.Group(this);
  private plantBombs: GameObjects.Group = new GameObjects.Group(this);
  private stones: GameObjects.Group = new GameObjects.Group(this);
  private stoneIndicators: GameObjects.Group = new GameObjects.Group(this);
  private healthBar!: GameObjects.Graphics;
  private health: number = 100;
  private maxHealth: number = 100;
  private score: number = 0;
  private highScore: number = 0;
  private healthBarWidth: number = 200;
  private healthBarHeight: number = 20;
  private healthBarX: number = 20;
  private healthBarY: number = 20;
  private constantSpeed: number = 150;
  private initialSpeed: number = 150;
  private maxSpeed: number = 170;
  private speedIncrease: number = 2;
  private lastEnemyTime: number = 0;
  private enemyInterval: number = 7000;
  private initialEnemyInterval: number = 7000;
  private minEnemyInterval: number = 3000;
  private enemyIntervalDecrease: number = 400;
  private lastHeartTime: number = 0;
  private heartInterval: number = 10000;
  private hearts: GameObjects.Group = new GameObjects.Group(this);
  private gameOver: boolean = false;
  private enemySpawnIndicators: GameObjects.Group = new GameObjects.Group(this);
  private spawnIndicatorDuration: number = 2000;
  private healthChangeHandler: ((health: number, maxHealth: number) => void) | null = null;
  private rotationSpeed: number = 4;
  private isRotatingLeft: boolean = true;
  private isRotatingRight: boolean = false;
  private playerPath: { x: number; y: number }[] = [];
  private maxPathLength: number = 15;
  private pathUpdateInterval: number = 50;
  private lastPathUpdate: number = 0;
  private enemySpeed: number = 160;
  private initialEnemySpeed: number = 160;
  private maxEnemySpeed: number = 200;
  private enemySpeedIncrease: number = 2;
  private collidedEnemies: Set<GameObjects.GameObject> = new Set();
  private enemyPositions: { x: number; y: number; type: 'coin' }[] = [];
  private fixedEnemies: Set<GameObjects.GameObject> = new Set();
  private followDistance: number = 30;
  private smoothFactor: number = 0.05;
  private minEnemyDistance: number = 30;
  private earthquakeIntensity: number = 10;
  private earthquakeDuration: number = 200;
  private lastEarthquakeTime: number = 0;
  private transitionEnemies: Map<GameObjects.GameObject, number> = new Map();
  private transitionDuration: number = 500;
  private lastCollisionTime: number = 0;
  private collisionCooldown: number = 1000;
  private tailDamage: number = 10;
  private lastStoneTime: number = 0;
  private stoneInterval: number = 3000;
  private initialStoneInterval: number = 3000;
  private minStoneInterval: number = 1000;
  private stoneIntervalDecrease: number = 200;
  private stoneSpeed: number = 100;
  private initialStoneSpeed: number = 100;
  private maxStoneSpeed: number = 200;
  private stoneSpeedIncrease: number = 2;
  private stoneDamage: number = 20;
  private stoneIndicatorDuration: number = 1000;
  private deathAnimationDuration: number = 1000;
  private gameStartTime: number = 0;
  private scoreChangeHandler: ((score: number, highScore: number) => void) | null = null;
  private backgroundTiles: GameObjects.Group = new GameObjects.Group(this);

  constructor() {
    super({ key: 'FenseWall' });
  }

  public moveLeft() {
    this.isRotatingLeft = true;
    this.isRotatingRight = false;
  }

  public moveRight() {
    this.isRotatingRight = true;
    this.isRotatingLeft = false;
  }

  public stopRotation() {
    this.isRotatingLeft = false;
    this.isRotatingRight = false;
  }

  public moveUp() {
    if (this.player.body) {
      const playerBody = this.player.body as Physics.Arcade.Body;
      playerBody.setVelocityY(-this.constantSpeed);
    }
  }

  public moveDown() {
    if (this.player.body) {
      const playerBody = this.player.body as Physics.Arcade.Body;
      playerBody.setVelocityY(this.constantSpeed);
    }
  }

  public stopVerticalMovement() {
    if (this.player.body) {
      const playerBody = this.player.body as Physics.Arcade.Body;
      playerBody.setVelocityY(0);
    }
  }

  init() {
    this.plantBombs = this.add.group();
    this.coins = this.add.group();
    this.health = this.maxHealth;
    this.score = 0;
    this.highScore = 0;
  }

  create() {
    this.gameStartTime = this.time.now;

    this.physics.world.setBounds(0, 0, width, height);
    this.physics.world.gravity.y = 0;

    // 배경 생성
    const background = this.add.graphics();
    background.fillStyle(0x90ee90, 1);
    background.fillRect(0, 0, width, height);
    background.setDepth(-2);

    // 그리드 생성
    const grid = this.add.graphics();
    grid.lineStyle(1, 0xffffff, 0.2);

    for (let x = 0; x <= width; x += 100) {
      grid.moveTo(x, 0);
      grid.lineTo(x, height);
    }

    for (let y = 0; y <= height; y += 100) {
      grid.moveTo(0, y);
      grid.lineTo(width, y);
    }

    grid.strokePath();
    grid.setDepth(-1);

    // 배경 패턴 추가
    const patternSize = 200;
    const patternCountX = Math.ceil(width / patternSize);
    const patternCountY = Math.ceil(height / patternSize);

    for (let x = 0; x < patternCountX; x++) {
      for (let y = 0; y < patternCountY; y++) {
        const pattern = this.add.text(x * patternSize + patternSize / 2, y * patternSize + patternSize / 2, '🌿', {
          fontSize: '32px',
          color: '#ffffff',
        });
        pattern.setOrigin(0.5);
        pattern.setAlpha(0.1);
        pattern.setDepth(-1);
      }
    }

    this.healthBar = this.add.graphics();
    this.enemySpawnIndicators = this.add.group();
    this.stones = this.add.group();
    this.stoneIndicators = this.add.group();

    this.player = this.add.text(width / 2, height / 2, '🐝', { fontSize: '28px' });
    this.player.setOrigin(0.5);
    this.player.setDepth(2);
    this.player.setPadding(1, 1, 1, 1);

    this.physics.world.enable(this.player);
    this.player.setFlipX(true);

    const playerBody = this.player.body as Physics.Arcade.Body;
    playerBody.setCollideWorldBounds(true);
    playerBody.setBounce(1);
    playerBody.setDrag(0.1);
    playerBody.setMaxVelocity(400);
    playerBody.setFriction(0);
    playerBody.setDamping(false);

    this.physics.add.overlap(this.player, this.coins, this.handlePlayerCoinCollision, undefined, this);
    this.physics.add.overlap(this.player, this.hearts, this.handleHeartCollision, undefined, this);
    this.physics.add.overlap(this.player, this.stones, this.handleStoneCollision, undefined, this);
    this.physics.add.overlap(this.coins, this.stones, this.handleEnemyStoneCollision, undefined, this);
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

  private createCoin(position: { x: number; y: number }) {
    const coin = this.add.text(position.x, position.y, '🪙', { fontSize: '24px' });
    coin.setOrigin(0.5);
    coin.setDepth(2);
    coin.setPadding(10, 10, 10, 10);
    this.physics.world.enable(coin);
    const coinBody = coin.body as Physics.Arcade.Body;
    coinBody.setImmovable(true);
    coinBody.setCollideWorldBounds(true);
    coinBody.setMaxVelocity(this.enemySpeed);
    this.coins.add(coin);
    this.fixedEnemies.add(coin);
  }

  private handleCollision(a: any, b: any) {
    const aVectorX = b.body.velocity.x - a.body.velocity.x;
    const aVectorY = a.body.velocity.y - b.body.velocity.y;
    const bVectorX = a.body.velocity.x - b.body.velocity.x;
    const bVectorY = a.body.velocity.y - b.body.velocity.y;

    a.body.setVelocity(aVectorX * 1000, aVectorY * 1000);
    b.body.setVelocity(bVectorX * 1000, bVectorY * 1000);
  }

  private handlePlayerCoinCollision(player: any, coin: any) {
    if (this.fixedEnemies.has(coin) && !this.transitionEnemies.has(coin)) {
      console.log('플레이어와 코인 충돌!');

      this.collidedEnemies.add(coin);
      this.fixedEnemies.delete(coin);
      this.transitionEnemies.set(coin, this.time.now);

      const coinBody = coin.body as Physics.Arcade.Body;
      coinBody.setImmovable(false);
      coinBody.setVelocity(0, 0);

      this.score += 10;
      this.updateScore();
    }
  }

  private updateScore() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
    }
    if (this.scoreChangeHandler) {
      this.scoreChangeHandler(this.score, this.highScore);
    }
  }

  private handleHeartCollision(player: any, heart: any) {
    console.log('하트와 플레이어 충돌!');
    this.health = Math.min(this.health + 10, this.maxHealth);
    if (this.healthChangeHandler) {
      this.healthChangeHandler(this.health, this.maxHealth);
    }
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

  private createEnemySpawnIndicator(position: { x: number; y: number }, type: 'coin') {
    const indicator = this.add.text(position.x, position.y, '🪙?', { fontSize: '24px' });
    indicator.setOrigin(0.5);
    indicator.setAlpha(0.5);
    indicator.setPadding(10, 10, 10, 10);
    this.enemySpawnIndicators.add(indicator);

    this.time.delayedCall(this.spawnIndicatorDuration, () => {
      indicator.destroy();
      this.createCoin(position);
    });
  }

  private createEarthquakeEffect() {
    if (this.time.now - this.lastEarthquakeTime < this.earthquakeDuration) {
      return;
    }

    this.lastEarthquakeTime = this.time.now;

    this.cameras.main.shake(this.earthquakeDuration, this.earthquakeIntensity / 100);

    [...this.collidedEnemies].forEach((enemy) => {
      const enemyBody = (enemy as GameObjects.Text).body as Physics.Arcade.Body;
      if (enemyBody) {
        const angle = Math.random() * Math.PI * 2;
        const force = this.earthquakeIntensity * 2;
        enemyBody.setVelocity(Math.cos(angle) * force, Math.sin(angle) * force);
      }
    });

    if (this.player.body) {
      const playerBody = this.player.body as Physics.Arcade.Body;
      const angle = Math.random() * Math.PI * 2;
      const force = this.earthquakeIntensity;
      playerBody.setVelocity(
        playerBody.velocity.x + Math.cos(angle) * force,
        playerBody.velocity.y + Math.sin(angle) * force
      );
    }
  }

  private createStoneIndicator(x: number, y: number, velocityX: number, velocityY: number) {
    const indicator = this.add.text(x, y, '⚠️', { fontSize: '24px' });
    indicator.setOrigin(0.5);
    indicator.setAlpha(0.5);
    this.stoneIndicators.add(indicator);

    this.tweens.add({
      targets: indicator,
      alpha: 0.2,
      duration: this.stoneIndicatorDuration,
      ease: 'Linear',
      onComplete: () => {
        indicator.destroy();
      },
    });
  }

  private createStone() {
    let x = 0,
      y = 0,
      velocityX = 0,
      velocityY = 0;
    const side = Math.floor(Math.random() * 4);

    switch (side) {
      case 0:
        x = Math.random() * width;
        y = 0;
        velocityX = (Math.random() - 0.5) * this.stoneSpeed;
        velocityY = this.stoneSpeed;
        break;
      case 1:
        x = width;
        y = Math.random() * height;
        velocityX = -this.stoneSpeed;
        velocityY = (Math.random() - 0.5) * this.stoneSpeed;
        break;
      case 2:
        x = Math.random() * width;
        y = height;
        velocityX = (Math.random() - 0.5) * this.stoneSpeed;
        velocityY = -this.stoneSpeed;
        break;
      case 3:
        x = 0;
        y = Math.random() * height;
        velocityX = this.stoneSpeed;
        velocityY = (Math.random() - 0.5) * this.stoneSpeed;
        break;
    }

    this.createStoneIndicator(x, y, velocityX, velocityY);

    this.time.delayedCall(this.stoneIndicatorDuration, () => {
      const stone = this.add.text(x, y, '🪨', { fontSize: '16px' });
      stone.setOrigin(0.5);
      this.physics.world.enable(stone);
      const stoneBody = stone.body as Physics.Arcade.Body;
      stoneBody.setVelocity(velocityX, velocityY);
      stoneBody.setCollideWorldBounds(false);
      this.stones.add(stone);
    });
  }

  private handleStoneCollision(player: any, stone: any) {
    console.log('플레이어가 돌에 맞음!');
    this.health -= this.stoneDamage;
    if (this.healthChangeHandler) {
      this.healthChangeHandler(this.health, this.maxHealth);
    }
    stone.destroy();
    this.createEarthquakeEffect();
    if (this.health <= 0) {
      this.gameOver = true;
      this.playDeathAnimation(player);
    }
  }

  private handleEnemyStoneCollision(enemy: any, stone: any) {
    console.log('적이 돌에 맞음!');
    if (this.fixedEnemies.has(enemy)) {
      this.fixedEnemies.delete(enemy);
    }
    if (this.collidedEnemies.has(enemy)) {
      this.collidedEnemies.delete(enemy);
    }
    this.playDeathAnimation(enemy);
    stone.destroy();

    this.score = Math.max(0, this.score - 10);
    this.updateScore();
  }

  private playDeathAnimation(object: any) {
    this.tweens.add({
      targets: object,
      scale: 0,
      alpha: 0,
      duration: this.deathAnimationDuration,
      ease: 'Power2',
      onComplete: () => {
        object.destroy();
      },
    });
  }

  update() {
    if (this.gameOver) return;

    const elapsedTime = this.time.now - this.gameStartTime;
    const difficultyLevel = Math.floor(elapsedTime / 15000);

    this.constantSpeed = Math.min(this.maxSpeed, this.initialSpeed + difficultyLevel * this.speedIncrease);
    this.enemySpeed = Math.min(this.maxEnemySpeed, this.initialEnemySpeed + difficultyLevel * this.enemySpeedIncrease);
    this.stoneSpeed = Math.min(this.maxStoneSpeed, this.initialStoneSpeed + difficultyLevel * this.stoneSpeedIncrease);
    this.stoneInterval = Math.max(
      this.minStoneInterval,
      this.initialStoneInterval - difficultyLevel * this.stoneIntervalDecrease
    );
    this.enemyInterval = Math.max(
      this.minEnemyInterval,
      this.initialEnemyInterval - difficultyLevel * this.enemyIntervalDecrease
    );

    if (this.time.now - this.lastStoneTime > this.stoneInterval) {
      this.createStone();
      this.lastStoneTime = this.time.now;
    }

    this.transitionEnemies.forEach((startTime, enemy) => {
      if (this.time.now - startTime >= this.transitionDuration) {
        this.transitionEnemies.delete(enemy);
      }
    });

    if (this.time.now - this.lastPathUpdate > this.pathUpdateInterval) {
      this.playerPath.push({ x: this.player.x, y: this.player.y });
      if (this.playerPath.length > this.maxPathLength) {
        this.playerPath.shift();
      }
      this.lastPathUpdate = this.time.now;
    }

    if (this.isRotatingLeft) {
      this.player.angle -= this.rotationSpeed;
    }
    if (this.isRotatingRight) {
      this.player.angle += this.rotationSpeed;
    }

    if (this.player.body) {
      const playerBody = this.player.body as Physics.Arcade.Body;
      const angleInRadians = Phaser.Math.DegToRad(this.player.angle);
      const directionX = Math.cos(angleInRadians);
      const directionY = Math.sin(angleInRadians);
      const targetVelocityX = directionX * this.constantSpeed;
      const targetVelocityY = directionY * this.constantSpeed;

      playerBody.setVelocity(
        Phaser.Math.Linear(playerBody.velocity.x, targetVelocityX, 0.1),
        Phaser.Math.Linear(playerBody.velocity.y, targetVelocityY, 0.1)
      );
    }

    this.enemyPositions = [];
    this.coins.getChildren().forEach((coin) => {
      const coinText = coin as GameObjects.Text;
      this.enemyPositions.push({ x: coinText.x, y: coinText.y, type: 'coin' });
    });

    const collidedEnemies = [...this.collidedEnemies];
    collidedEnemies.forEach((enemy, index) => {
      const enemyText = enemy as GameObjects.Text;
      const enemyBody = enemy.body as Physics.Arcade.Body;

      if (this.fixedEnemies.has(enemy)) {
        return;
      }

      const targetIndex = Math.max(0, this.playerPath.length - 1 - index);
      if (targetIndex >= 0) {
        const targetPosition = this.playerPath[targetIndex];

        let adjustedPosition = { ...targetPosition };
        for (let i = 0; i < index; i++) {
          const otherEnemy = collidedEnemies[i] as GameObjects.Text;
          const distance = Phaser.Math.Distance.Between(enemyText.x, enemyText.y, otherEnemy.x, otherEnemy.y);

          if (distance < this.minEnemyDistance) {
            const angle = Phaser.Math.Angle.Between(otherEnemy.x, otherEnemy.y, enemyText.x, enemyText.y);
            adjustedPosition = {
              x: otherEnemy.x + Math.cos(angle) * this.minEnemyDistance,
              y: otherEnemy.y + Math.sin(angle) * this.minEnemyDistance,
            };
          }
        }

        const dx = adjustedPosition.x - enemyText.x;
        const dy = adjustedPosition.y - enemyText.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > this.followDistance) {
          const normalizedDx = dx / distance;
          const normalizedDy = dy / distance;

          const targetVelocityX = normalizedDx * this.enemySpeed;
          const targetVelocityY = normalizedDy * this.enemySpeed;

          enemyBody.setVelocity(
            Phaser.Math.Linear(enemyBody.velocity.x, targetVelocityX, this.smoothFactor),
            Phaser.Math.Linear(enemyBody.velocity.y, targetVelocityY, this.smoothFactor)
          );
        } else {
          enemyBody.setVelocity(
            Phaser.Math.Linear(enemyBody.velocity.x, 0, this.smoothFactor),
            Phaser.Math.Linear(enemyBody.velocity.y, 0, this.smoothFactor)
          );
        }
      }
    });

    this.enemyPositions.forEach((enemyPos) => {
      const enemy = this.coins
        .getChildren()
        .find((e) => (e as GameObjects.Text).x === enemyPos.x && (e as GameObjects.Text).y === enemyPos.y);

      if (enemy && !this.transitionEnemies.has(enemy)) {
        const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, enemyPos.x, enemyPos.y);
        if (distance < 20) {
          if (this.time.now - this.lastCollisionTime < this.collisionCooldown) {
            return;
          }
          this.lastCollisionTime = this.time.now;

          this.health -= this.tailDamage;
          this.createEarthquakeEffect();
          if (this.healthChangeHandler) {
            this.healthChangeHandler(this.health, this.maxHealth);
          }
          if (this.health <= 0) {
            this.gameOver = true;
          }
        }
      }
    });

    if (this.time.now - this.lastEnemyTime > this.enemyInterval) {
      const coinPosition = { x: Math.random() * width, y: Math.random() * height };
      this.createEnemySpawnIndicator(coinPosition, 'coin');
      this.lastEnemyTime = this.time.now;
      this.enemyInterval -= 100;

      if (this.enemyInterval < 1000) {
        this.enemyInterval = 1000;
      }
    }

    if (this.time.now - this.lastHeartTime > this.heartInterval) {
      const heartPosition = { x: Math.random() * width, y: Math.random() * height };
      this.createHeart(heartPosition);
      this.lastHeartTime = this.time.now;
    }
  }

  public isGameOver() {
    return this.gameOver;
  }

  public onHealthChange(cb: (health: number, maxHealth: number) => void) {
    console.log('onHealthChange 콜백 설정됨');
    this.healthChangeHandler = cb;
    if (this.healthChangeHandler) {
      this.healthChangeHandler(this.health, this.maxHealth);
    }
  }

  public onScoreChange(cb: (score: number, highScore: number) => void) {
    this.scoreChangeHandler = cb;
    if (this.scoreChangeHandler) {
      this.scoreChangeHandler(this.score, this.highScore);
    }
  }

  public getScore() {
    return this.score;
  }

  public getHighScore() {
    return this.highScore;
  }

  public destroy() {
    this.tweens.killAll();
    if (this.plantBombs) {
      this.plantBombs.destroy();
    }
    this.coins.getChildren().forEach((coin) => coin.destroy());
    this.coins = this.add.group();
    this.healthBar.destroy();
    this.enemySpawnIndicators.getChildren().forEach((indicator) => indicator.destroy());
    this.enemySpawnIndicators = this.add.group();

    this.healthChangeHandler = null;
    this.health = 100;
    this.maxHealth = 100;
    this.score = 0;
  }

  public getGameState() {
    return {
      score: this.score,
      highScore: this.highScore,
      health: this.health,
      maxHealth: this.maxHealth,
      gameTime: this.time.now - this.gameStartTime,
    };
  }
}
