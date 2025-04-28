import { Scene, GameObjects, Physics } from 'phaser';
import { GAME_CONSTANTS } from './constants';
import { EnemyType, EnemyPosition } from './types';
import { FenseWall } from './fense-wall';

export class EnemyManager {
  private ducksOrLammas: GameObjects.Group;
  private enemySpawnIndicators: GameObjects.Group;
  private collidedEnemies: Set<GameObjects.GameObject> = new Set();
  private fixedEnemies: Set<GameObjects.GameObject> = new Set();
  private transitionEnemies: Map<GameObjects.GameObject, number> = new Map();
  private lastEnemyTime: number = 0;
  private enemyInterval: number = GAME_CONSTANTS.ENEMY_SPAWN.INITIAL_INTERVAL;
  private enemySpeed: number = GAME_CONSTANTS.ENEMY_SPEED.INITIAL;

  constructor(private scene: FenseWall) {
    this.ducksOrLammas = this.scene.add.group();
    this.enemySpawnIndicators = this.scene.add.group();
  }

  public create() {
    this.scene.physics.add.overlap(
      this.scene.getPlayer().getPlayer(),
      this.ducksOrLammas,
      this.handlePlayerEnemyCollision,
      undefined,
      this
    );
  }

  private createEnemy(position: { x: number; y: number }) {
    const enemyType = Math.random() < 0.5 ? '🦆' : '🦙';
    const enemy = this.scene.add.text(position.x, position.y, enemyType, {
      fontSize: GAME_CONSTANTS.ENEMY_EMOJI.SIZE,
    });
    enemy.setOrigin(0.5);
    enemy.setDepth(2);
    enemy.setPadding(10, 10, 10, 10);
    this.scene.physics.world.enable(enemy);
    const enemyBody = enemy.body as Physics.Arcade.Body;
    enemyBody.setImmovable(true);
    enemyBody.setCollideWorldBounds(true);
    enemyBody.setMaxVelocity(this.enemySpeed);
    this.ducksOrLammas.add(enemy);
    this.fixedEnemies.add(enemy);
  }

  private createEnemySpawnIndicator(position: { x: number; y: number }, type: EnemyType) {
    const indicator = this.scene.add.text(position.x, position.y, `${type}?`, {
      fontSize: GAME_CONSTANTS.ENEMY_EMOJI.SIZE,
    });
    indicator.setOrigin(0.5);
    indicator.setAlpha(0.5);
    indicator.setPadding(10, 10, 10, 10);
    this.enemySpawnIndicators.add(indicator);

    this.scene.time.delayedCall(GAME_CONSTANTS.TRANSITION_DURATION, () => {
      indicator.destroy();
      this.createEnemy(position);
    });
  }

  private handlePlayerEnemyCollision(player: any, enemy: any) {
    if (this.fixedEnemies.has(enemy) && !this.transitionEnemies.has(enemy)) {
      console.log('플레이어와 적 충돌!');

      this.collidedEnemies.add(enemy);
      this.fixedEnemies.delete(enemy);
      this.transitionEnemies.set(enemy, this.scene.time.now);

      const enemyBody = enemy.body as Physics.Arcade.Body;
      enemyBody.setImmovable(false);
      enemyBody.setVelocity(0, 0);

      this.scene.increaseScore(GAME_CONSTANTS.SCORE.COLLISION_POINTS);
    }
  }

  public update() {
    const elapsedTime = this.scene.time.now - this.scene.getGameStartTime();
    const difficultyLevel = Math.floor(elapsedTime / 15000);

    this.enemySpeed = Math.min(
      GAME_CONSTANTS.ENEMY_SPEED.MAX,
      GAME_CONSTANTS.ENEMY_SPEED.INITIAL + difficultyLevel * GAME_CONSTANTS.ENEMY_SPEED.INCREASE
    );
    this.enemyInterval = Math.max(
      GAME_CONSTANTS.ENEMY_SPAWN.MIN_INTERVAL,
      GAME_CONSTANTS.ENEMY_SPAWN.INITIAL_INTERVAL - difficultyLevel * GAME_CONSTANTS.ENEMY_SPAWN.INTERVAL_DECREASE
    );

    this.transitionEnemies.forEach((startTime, enemy) => {
      if (this.scene.time.now - startTime >= GAME_CONSTANTS.TRANSITION_DURATION) {
        this.transitionEnemies.delete(enemy);
      }
    });

    const collidedEnemies = [...this.collidedEnemies];
    collidedEnemies.forEach((enemy, index) => {
      const enemyText = enemy as GameObjects.Text;
      const enemyBody = enemy.body as Physics.Arcade.Body;

      if (this.fixedEnemies.has(enemy)) {
        return;
      }

      const playerPath = this.scene.getPlayer().getPlayerPath();
      const targetIndex = Math.max(0, playerPath.length - 1 - index);
      if (targetIndex >= 0) {
        const targetPosition = playerPath[targetIndex];

        let adjustedPosition = { ...targetPosition };
        for (let i = 0; i < index; i++) {
          const otherEnemy = collidedEnemies[i] as GameObjects.Text;
          const distance = Phaser.Math.Distance.Between(enemyText.x, enemyText.y, otherEnemy.x, otherEnemy.y);

          if (distance < GAME_CONSTANTS.ENEMY_FOLLOW.MIN_DISTANCE) {
            const angle = Phaser.Math.Angle.Between(otherEnemy.x, otherEnemy.y, enemyText.x, enemyText.y);
            adjustedPosition = {
              x: otherEnemy.x + Math.cos(angle) * GAME_CONSTANTS.ENEMY_FOLLOW.MIN_DISTANCE,
              y: otherEnemy.y + Math.sin(angle) * GAME_CONSTANTS.ENEMY_FOLLOW.MIN_DISTANCE,
            };
          }
        }

        const dx = adjustedPosition.x - enemyText.x;
        const dy = adjustedPosition.y - enemyText.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > GAME_CONSTANTS.ENEMY_FOLLOW.DISTANCE) {
          const normalizedDx = dx / distance;
          const normalizedDy = dy / distance;

          const targetVelocityX = normalizedDx * this.enemySpeed;
          const targetVelocityY = normalizedDy * this.enemySpeed;

          enemyBody.setVelocity(
            Phaser.Math.Linear(enemyBody.velocity.x, targetVelocityX, GAME_CONSTANTS.ENEMY_FOLLOW.SMOOTH_FACTOR),
            Phaser.Math.Linear(enemyBody.velocity.y, targetVelocityY, GAME_CONSTANTS.ENEMY_FOLLOW.SMOOTH_FACTOR)
          );
        } else {
          enemyBody.setVelocity(
            Phaser.Math.Linear(enemyBody.velocity.x, 0, GAME_CONSTANTS.ENEMY_FOLLOW.SMOOTH_FACTOR),
            Phaser.Math.Linear(enemyBody.velocity.y, 0, GAME_CONSTANTS.ENEMY_FOLLOW.SMOOTH_FACTOR)
          );
        }
      }
    });

    if (this.scene.time.now - this.lastEnemyTime > this.enemyInterval) {
      const enemyPosition = {
        x: Math.random() * this.scene.cameras.main.width,
        y: Math.random() * this.scene.cameras.main.height,
      };
      const randomType = Math.random() < 0.5 ? '🦆' : '🦙';
      this.createEnemySpawnIndicator(enemyPosition, randomType);
      this.lastEnemyTime = this.scene.time.now;
      this.enemyInterval -= 100;

      if (this.enemyInterval < 1000) {
        this.enemyInterval = 1000;
      }
    }
  }

  public getEnemyPositions(): EnemyPosition[] {
    const positions: EnemyPosition[] = [];
    this.ducksOrLammas.getChildren().forEach((enemy) => {
      const enemyText = enemy as GameObjects.Text;
      positions.push({
        x: enemyText.x,
        y: enemyText.y,
        type: enemyText.text as EnemyType,
      });
    });
    return positions;
  }

  public destroy() {
    this.ducksOrLammas.getChildren().forEach((enemy) => enemy.destroy());
    this.ducksOrLammas = this.scene.add.group();
    this.enemySpawnIndicators.getChildren().forEach((indicator) => indicator.destroy());
    this.enemySpawnIndicators = this.scene.add.group();
  }
}
