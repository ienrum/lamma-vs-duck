import { Scene, GameObjects, Physics } from 'phaser';
import { CARROCK_CONSTANTS } from './constants';
import { TireTrail } from './tire-trail';
import { DustParticleSystem } from './dust-particle';

interface Motorcycle {
  gameObject: GameObjects.Text;
  body: Physics.Arcade.Body;
  tireTrail: TireTrail;
  dustSystem: DustParticleSystem;
  lastDustSpawn: number;
  isBouncingAway: boolean;
}

export class MotorcycleManager {
  private scene: Scene;
  private motorcycles: Motorcycle[] = [];
  private lastSpawnTime: number = 0;
  private spawnInterval: number = CARROCK_CONSTANTS.MOTORCYCLE_SPAWN.INITIAL_INTERVAL;
  private motorcycleSpeed: number = CARROCK_CONSTANTS.MOTORCYCLE_SPEED.INITIAL;

  constructor(scene: Scene) {
    this.scene = scene;
  }

  public create() {
    // 초기 설정만 수행
  }

  public update(gameTime: number) {
    const now = this.scene.time.now;

    // 새로운 오토바이 생성
    if (now - this.lastSpawnTime > this.spawnInterval) {
      this.spawnMotorcycle();
      this.spawnMotorcycle();
      this.lastSpawnTime = now;
      this.spawnInterval *= 0.95; // 5% 감소
      // clamp spawn interval
      this.spawnInterval <= 100 ? (this.spawnInterval = 100) : this.spawnInterval;
    }

    // 기존 오토바이들 업데이트
    this.updateMotorcycles();

    // 화면 밖으로 나간 오토바이들 제거
    this.cleanupMotorcycles();

    // 난이도 조정
    this.updateDifficulty(gameTime);
  }

  private spawnMotorcycle() {
    // 화면 오른쪽에서 랜덤한 Y 위치에 오토바이 생성
    const x = this.scene.cameras.main.width + 30;
    const y = Phaser.Math.Between(30, this.scene.cameras.main.height - 30);

    // 랜덤한 모터사이클 text
    const motorcycleEmoji = Phaser.Utils.Array.GetRandom([
      CARROCK_CONSTANTS.MOTORCYCLE_EMOJI.SYMBOL1,
      CARROCK_CONSTANTS.MOTORCYCLE_EMOJI.SYMBOL2,
      CARROCK_CONSTANTS.MOTORCYCLE_EMOJI.SYMBOL3,
      CARROCK_CONSTANTS.MOTORCYCLE_EMOJI.SYMBOL4,
    ]);
    const motorcycle = this.scene.add.text(x, y, motorcycleEmoji, {
      fontSize: CARROCK_CONSTANTS.MOTORCYCLE_EMOJI.SIZE,
    });
    motorcycle.setOrigin(0.5);
    motorcycle.setDepth(2);

    // 물리 엔진 적용
    this.scene.physics.world.enable(motorcycle);
    const motorcycleBody = motorcycle.body as Physics.Arcade.Body;
    motorcycleBody.setVelocityX(-this.motorcycleSpeed); // 왼쪽으로 이동

    // 약간의 랜덤 수직 이동 추가
    const randomY = Phaser.Math.Between(-20, 20);
    motorcycleBody.setVelocityY(randomY);

    // 오토바이용 타이어 자국 생성
    const tireTrail = new TireTrail(this.scene);
    tireTrail.create();

    // 오토바이용 먼지 파티클 시스템 생성
    const dustSystem = new DustParticleSystem(this.scene);
    dustSystem.create();

    this.motorcycles.push({
      gameObject: motorcycle,
      body: motorcycleBody,
      tireTrail: tireTrail,
      dustSystem: dustSystem,
      lastDustSpawn: 0,
      isBouncingAway: false,
    });
  }

  private updateMotorcycles() {
    // 오토바이들과 타이어 자국 업데이트
    this.motorcycles.forEach((motorcycle) => {
      // 오토바이 타이어 자국 추가 (오토바이 뒤쪽에서)
      const tireOffsetX = -5; // 오토바이 뒤쪽
      const tireOffsetY = 6; // 약간 아래쪽
      motorcycle.tireTrail.addPoint(motorcycle.gameObject.x + tireOffsetX, motorcycle.gameObject.y + tireOffsetY);
      motorcycle.tireTrail.update();

      // 먼지 효과 생성 (오토바이 뒤쪽에서)
      const now = this.scene.time.now;
      if (now - motorcycle.lastDustSpawn > 100) {
        // 80ms마다 먼지 생성
        const dustOffsetX = 10; // 오토바이 뒤쪽
        const dustOffsetY = Phaser.Math.Between(-3, 3); // 약간의 랜덤
        motorcycle.dustSystem.spawnDust(
          motorcycle.gameObject.x + dustOffsetX,
          motorcycle.gameObject.y + dustOffsetY,
          0.8
        );
        motorcycle.lastDustSpawn = now;
      }

      // 먼지 파티클 시스템 업데이트
      motorcycle.dustSystem.update();

      // 진동
      const shakeIntensity = 0.1;
      motorcycle.gameObject.x += Phaser.Math.Between(-shakeIntensity, shakeIntensity);
      motorcycle.gameObject.y += Phaser.Math.Between(-shakeIntensity, shakeIntensity);
    });
  }

  private cleanupMotorcycles() {
    this.motorcycles = this.motorcycles.filter((motorcycle) => {
      // 화면 왼쪽으로 완전히 사라진 오토바이들 제거
      if (motorcycle.gameObject.x < -50) {
        motorcycle.gameObject.destroy();
        motorcycle.tireTrail.destroy();
        motorcycle.dustSystem.destroy();
        return false;
      }
      return true;
    });
  }

  private updateDifficulty(gameTime: number) {
    // 게임 시간에 따라 난이도 증가
    const difficultyLevel = Math.floor(gameTime / CARROCK_CONSTANTS.DIFFICULTY_INCREASE_INTERVAL);

    // 오토바이 속도 증가
    this.motorcycleSpeed = Math.min(
      CARROCK_CONSTANTS.MOTORCYCLE_SPEED.MAX,
      CARROCK_CONSTANTS.MOTORCYCLE_SPEED.INITIAL + difficultyLevel * CARROCK_CONSTANTS.MOTORCYCLE_SPEED.INCREASE
    );

    // 생성 간격 감소 (더 자주 생성)
    this.spawnInterval = Math.max(
      CARROCK_CONSTANTS.MOTORCYCLE_SPAWN.MIN_INTERVAL,
      CARROCK_CONSTANTS.MOTORCYCLE_SPAWN.INITIAL_INTERVAL -
        difficultyLevel * CARROCK_CONSTANTS.MOTORCYCLE_SPAWN.INTERVAL_DECREASE
    );
  }

  public getMotorcycles(): GameObjects.Text[] {
    return this.motorcycles.map((motorcycle) => motorcycle.gameObject);
  }

  public checkCollision(car: GameObjects.Text, carIsPoweredUp: boolean): { collided: boolean; shouldDamage: boolean } {
    for (const motorcycle of this.motorcycles) {
      if (!motorcycle.isBouncingAway && this.scene.physics.world.overlap(car, motorcycle.gameObject)) {
        if (carIsPoweredUp) {
          // 파워업 상태일 때 오토바이를 튕겨냄
          this.bounceAwayMotorcycle(motorcycle);
          return { collided: true, shouldDamage: false };
        } else {
          // 일반 상태일 때 오토바이 제거하고 데미지
          this.removeMotorcycle(motorcycle);
          return { collided: true, shouldDamage: true };
        }
      }
    }
    return { collided: false, shouldDamage: false };
  }

  private bounceAwayMotorcycle(motorcycle: Motorcycle) {
    motorcycle.isBouncingAway = true;
    
    // 랜덤한 방향으로 튕겨냄
    const bounceAngle = Phaser.Math.Between(-45, 45); // -45도에서 45도 사이
    const bounceSpeed = Phaser.Math.Between(200, 400);
    const bounceVelocityX = Math.cos(Phaser.Math.DegToRad(bounceAngle)) * bounceSpeed;
    const bounceVelocityY = Math.sin(Phaser.Math.DegToRad(bounceAngle)) * bounceSpeed;
    
    motorcycle.body.setVelocity(bounceVelocityX, bounceVelocityY);
    
    // 회전 효과
    this.scene.tweens.add({
      targets: motorcycle.gameObject,
      angle: motorcycle.gameObject.angle + Phaser.Math.Between(360, 720), // 1-2바퀴 회전
      duration: 1000,
      ease: 'Power2.easeOut'
    });
    
    // 크기 변화 효과 (작아짐)
    this.scene.tweens.add({
      targets: motorcycle.gameObject,
      scaleX: 0.5,
      scaleY: 0.5,
      duration: 1000,
      ease: 'Power2.easeOut'
    });
    
    // 투명도 변화
    this.scene.tweens.add({
      targets: motorcycle.gameObject,
      alpha: 0.3,
      duration: 1000,
      ease: 'Power2.easeOut'
    });
    
    // 1초 후에 제거
    this.scene.time.delayedCall(1000, () => {
      this.removeMotorcycle(motorcycle);
    });
  }

  private removeMotorcycle(motorcycleToRemove: Motorcycle) {
    const index = this.motorcycles.indexOf(motorcycleToRemove);
    if (index > -1) {
      motorcycleToRemove.gameObject.destroy();
      motorcycleToRemove.tireTrail.destroy();
      motorcycleToRemove.dustSystem.destroy();
      this.motorcycles.splice(index, 1);
    }
  }

  public reset() {
    // 모든 오토바이 제거
    this.motorcycles.forEach((motorcycle) => {
      motorcycle.gameObject.destroy();
      motorcycle.tireTrail.destroy();
      motorcycle.dustSystem.destroy();
    });
    this.motorcycles = [];

    // 난이도 초기화
    this.spawnInterval = CARROCK_CONSTANTS.MOTORCYCLE_SPAWN.INITIAL_INTERVAL;
    this.motorcycleSpeed = CARROCK_CONSTANTS.MOTORCYCLE_SPEED.INITIAL;
    this.lastSpawnTime = 0;
  }

  public destroy() {
    this.reset();
  }
}
