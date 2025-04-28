import { Scene, GameObjects, Physics, Input, Tweens } from 'phaser';
import { GAME_CONSTANTS } from './constants';

export class Player {
  private player!: GameObjects.Text;
  private isRotatingLeft: boolean = false;
  private isRotatingRight: boolean = false;
  private playerPath: { x: number; y: number }[] = [];
  private lastPathUpdate: number = 0;
  private touchPointer: Input.Pointer | null = null;
  private isInvincible: boolean = false;
  private invincibleTween: Tweens.Tween | null = null;
  private onInvincibleEnd: (() => void) | null = null;

  constructor(private scene: Scene) {
    this.setupTouchEvents();
  }

  private setupTouchEvents() {
    this.scene.input.on('pointerdown', (pointer: Input.Pointer) => {
      this.touchPointer = pointer;
    });

    this.scene.input.on('pointerup', () => {
      this.touchPointer = null;
      this.stopRotation();
    });

    this.scene.input.on('pointermove', (pointer: Input.Pointer) => {
      if (this.touchPointer) {
        const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, pointer.x, pointer.y);
        const targetAngle = Phaser.Math.RadToDeg(angle);
        const currentAngle = this.player.angle;
        const angleDiff = Phaser.Math.Angle.ShortestBetween(currentAngle, targetAngle);

        if (angleDiff > 0) {
          this.moveRight();
        } else if (angleDiff < 0) {
          this.moveLeft();
        }
      }
    });
  }

  public create() {
    this.player = this.scene.add.text(this.scene.cameras.main.width / 2, this.scene.cameras.main.height / 2, '🐝', {
      fontSize: GAME_CONSTANTS.PLAYER_EMOJI.SIZE,
    });
    this.player.setOrigin(0.5);
    this.player.setDepth(2);
    this.player.setPadding(1, 1, 1, 1);

    this.scene.physics.world.enable(this.player);
    this.player.setFlipX(true);

    const playerBody = this.player.body as Physics.Arcade.Body;
    playerBody.setCollideWorldBounds(true);
    playerBody.setBounce(1);
    playerBody.setDrag(0.1);
    playerBody.setMaxVelocity(400);
    playerBody.setFriction(0);
    playerBody.setDamping(false);
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
      playerBody.setVelocityY(-GAME_CONSTANTS.PLAYER_SPEED.INITIAL);
    }
  }

  public moveDown() {
    if (this.player.body) {
      const playerBody = this.player.body as Physics.Arcade.Body;
      playerBody.setVelocityY(GAME_CONSTANTS.PLAYER_SPEED.INITIAL);
    }
  }

  public stopVerticalMovement() {
    if (this.player.body) {
      const playerBody = this.player.body as Physics.Arcade.Body;
      playerBody.setVelocityY(0);
    }
  }

  public update(constantSpeed: number) {
    if (this.isRotatingLeft) {
      this.player.angle -= GAME_CONSTANTS.PLAYER_ROTATION_SPEED;
    }
    if (this.isRotatingRight) {
      this.player.angle += GAME_CONSTANTS.PLAYER_ROTATION_SPEED;
    }

    if (this.player.body) {
      const playerBody = this.player.body as Physics.Arcade.Body;
      const angleInRadians = Phaser.Math.DegToRad(this.player.angle);
      const directionX = Math.cos(angleInRadians);
      const directionY = Math.sin(angleInRadians);
      const targetVelocityX = directionX * constantSpeed;
      const targetVelocityY = directionY * constantSpeed;

      playerBody.setVelocity(
        Phaser.Math.Linear(playerBody.velocity.x, targetVelocityX, 0.1),
        Phaser.Math.Linear(playerBody.velocity.y, targetVelocityY, 0.1)
      );
    }

    if (this.scene.time.now - this.lastPathUpdate > GAME_CONSTANTS.PATH.UPDATE_INTERVAL) {
      this.playerPath.push({ x: this.player.x, y: this.player.y });
      if (this.playerPath.length > GAME_CONSTANTS.PATH.MAX_LENGTH) {
        this.playerPath.shift();
      }
      this.lastPathUpdate = this.scene.time.now;
    }
  }

  public getPlayerPath() {
    return this.playerPath;
  }

  public getPlayer() {
    return this.player;
  }

  public makeInvincible(onEnd: () => void) {
    if (this.isInvincible) return;

    this.isInvincible = true;
    this.onInvincibleEnd = onEnd;

    // 깜빡임 효과
    this.invincibleTween = this.scene.tweens.add({
      targets: this.player,
      alpha: 0.5,
      duration: 100,
      yoyo: true,
      repeat: 5,
      onComplete: () => {
        this.player.setAlpha(1);
        this.isInvincible = false;
        if (this.onInvincibleEnd) {
          this.onInvincibleEnd();
          this.onInvincibleEnd = null;
        }
        this.invincibleTween = null;
      },
    });
  }

  public isPlayerInvincible(): boolean {
    return this.isInvincible;
  }

  public destroy() {
    if (this.invincibleTween) {
      this.invincibleTween.stop();
    }
    this.player.destroy();
  }
}
