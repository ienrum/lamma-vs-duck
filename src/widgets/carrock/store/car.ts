import { Scene, GameObjects, Physics } from 'phaser';
import { CARROCK_CONSTANTS } from './constants';
import { TireTrail } from './tire-trail';
import { DustParticleSystem } from './dust-particle';

export class Car {
  private car!: GameObjects.Text;
  private tireTrailUp!: TireTrail;
  private tireTrailDown!: TireTrail;
  private dustSystem!: DustParticleSystem;
  private scene: Scene;
  private direction: 'up' | 'down' = 'down';
  private targetAngle: number = 0;
  private isInvincible: boolean = false;
  private invincibleTween: any = null;
  private lastDustSpawn: number = 0;
  private isPoweredUp: boolean = false;
  private powerUpEndTime: number = 0;
  private powerUpTween: any = null;

  constructor(scene: Scene) {
    this.scene = scene;
    this.tireTrailUp = new TireTrail(scene);
    this.tireTrailDown = new TireTrail(scene);
    this.dustSystem = new DustParticleSystem(scene);
    this.setupTouchEvents();
  }

  private setupTouchEvents() {
    this.scene.input.on('pointerdown', () => {
      this.direction = this.direction === 'up' ? 'down' : 'up';
      this.handleDirectionChange(this.direction);
    });
  }

  private handleDirectionChange(direction: 'up' | 'down') {
    if (direction === 'up') {
      this.targetAngle = -25; // 왼쪽으로 45도
    } else {
      this.targetAngle = 25; // 오른쪽으로 45도
    }
  }

  public create() {
    // 자동차 생성 (화면 중앙)
    this.car = this.scene.add.text(
      this.scene.cameras.main.width / 2,
      this.scene.cameras.main.height / 2,
      CARROCK_CONSTANTS.CAR_EMOJI.SYMBOL,
      {
        fontSize: CARROCK_CONSTANTS.CAR_EMOJI.SIZE,
      }
    );
    this.car.setOrigin(0.5);
    this.car.setDepth(3);
    this.car.setScale(1); // 기본 크기

    // 물리 엔진 적용
    this.scene.physics.world.enable(this.car);
    const carBody = this.car.body as Physics.Arcade.Body;
    carBody.setCollideWorldBounds(true);
    carBody.setMaxVelocity(300);

    // 타이어 자국 시스템 초기화
    this.tireTrailUp.create();
    this.tireTrailDown.create();

    // 먼지 파티클 시스템 초기화
    this.dustSystem.create();
  }

  public update() {
    if (!this.car.body) return;

    // 부드러운 회전
    const angleDiff = Phaser.Math.Angle.ShortestBetween(this.car.angle, this.targetAngle);
    if (Math.abs(angleDiff) > 1) {
      this.car.angle += Math.sign(angleDiff) * CARROCK_CONSTANTS.CAR_ROTATION_SPEED;
    }

    // 진동
    const shakeIntensity = 0.1;
    this.car.x += Phaser.Math.Between(-shakeIntensity, shakeIntensity);
    this.car.y += Phaser.Math.Between(-shakeIntensity, shakeIntensity);

    // 타이어 자국 추가 (자동차 하단에서 나오도록)
    const tireOffsetY = 0; // 자동차 중심에서 아래로 10px
    const tireOffsetX = -10; // 자동차 중심에서 오른쪽으로 10px
    this.tireTrailUp.addPoint(this.car.x + tireOffsetX, this.car.y + tireOffsetY);
    this.tireTrailUp.update();

    this.tireTrailDown.addPoint(this.car.x + tireOffsetX, this.car.y + tireOffsetY + 5);
    this.tireTrailDown.update();

    // 파워업 상태 확인 및 해제
    const now = this.scene.time.now;
    if (this.isPoweredUp && now > this.powerUpEndTime) {
      this.deactivatePowerUp();
    }

    // 먼지 효과 생성 (뒤쪽에서)
    const dustInterval = this.isPoweredUp ? 50 : 100; // 파워업 시 더 자주 생성
    const dustIntensity = this.isPoweredUp ? 1.5 : 0.8; // 파워업 시 더 강한 먼지
    
    if (now - this.lastDustSpawn > dustInterval) {
      const dustOffsetX = 10; // 차 뒤쪽
      const dustOffsetY = Phaser.Math.Between(-3, 3); // 약간의 랜덤
      this.dustSystem.spawnDust(this.car.x + dustOffsetX, this.car.y + dustOffsetY, dustIntensity);
      
      // 파워업 상태일 때 추가 먼지 파티클
      if (this.isPoweredUp) {
        this.dustSystem.spawnDust(this.car.x + dustOffsetX + 5, this.car.y + dustOffsetY + 3, dustIntensity);
      }
      
      this.lastDustSpawn = now;
    }

    // 먼지 파티클 시스템 업데이트
    this.dustSystem.update({ x: 1, y: 0 });

    // 화면 왼쪽 경계에서 나가면 게임 오버
    if (this.car.x < -50) {
      // 게임 오버 처리는 CarrockScene에서 처리
    }

    // velocity를 사용한 물리 기반 움직임
    const carBody = this.car.body as Physics.Arcade.Body;
    const radians = Phaser.Math.DegToRad(this.car.angle);

    // 각도에 따른 Y축 velocity 설정
    const maxVerticalSpeed = 150; // 최대 수직 속도
    const velocityY = -Math.sin(radians) * maxVerticalSpeed; // 각도에 따른 수직 속도

    carBody.setVelocityY(velocityY);

    // 화면 경계에서 반탄성 충돌 처리
    const margin = 20;
    if (this.car.y < margin) {
      this.car.y = margin;
      carBody.setVelocityY(Math.abs(carBody.velocity.y) * 0.3); // 약간의 반탄성
    } else if (this.car.y > this.scene.cameras.main.height - margin) {
      this.car.y = this.scene.cameras.main.height - margin;
      carBody.setVelocityY(-Math.abs(carBody.velocity.y) * 0.3); // 약간의 반탄성
    }
  }

  public getCar() {
    return this.car;
  }

  public getPosition() {
    return { x: this.car.x, y: this.car.y };
  }

  public makeInvincible(duration: number = CARROCK_CONSTANTS.COLLISION_COOLDOWN) {
    if (this.isInvincible) return;

    this.isInvincible = true;

    // 깜빡임 효과
    this.invincibleTween = this.scene.tweens.add({
      targets: this.car,
      alpha: 0.5,
      duration: 100,
      yoyo: true,
      repeat: Math.floor(duration / 200),
      onComplete: () => {
        this.car.setAlpha(1);
        this.isInvincible = false;
        this.invincibleTween = null;
      },
    });
  }

  public isCarInvincible(): boolean {
    return this.isInvincible;
  }

  public activatePowerUp(duration: number = 10000) {
    this.isPoweredUp = true;
    this.powerUpEndTime = this.scene.time.now + duration;

    // 차량 크기 증가 애니메이션
    if (this.powerUpTween) {
      this.powerUpTween.stop();
    }
    
    this.powerUpTween = this.scene.tweens.add({
      targets: this.car,
      scaleX: 1.5,
      scaleY: 1.5,
      duration: 300,
      ease: 'Back.easeOut',
    });

    // 파워업 효과 (반짝임)
    this.scene.tweens.add({
      targets: this.car,
      alpha: 1.2,
      duration: 200,
      yoyo: true,
      repeat: 2,
    });
  }

  private deactivatePowerUp() {
    this.isPoweredUp = false;

    // 차량 크기 원래대로
    if (this.powerUpTween) {
      this.powerUpTween.stop();
    }
    
    this.powerUpTween = this.scene.tweens.add({
      targets: this.car,
      scaleX: 1,
      scaleY: 1,
      duration: 300,
      ease: 'Back.easeOut',
    });
  }

  public isPoweredUpState(): boolean {
    return this.isPoweredUp;
  }

  public reset() {
    // 초기 위치로 리셋
    this.car.setPosition(this.scene.cameras.main.width / 2, this.scene.cameras.main.height / 2);
    this.car.setAngle(0);
    this.targetAngle = 0;
    this.tireTrailUp.clear();
    this.tireTrailDown.clear();
    this.dustSystem.clear();
    this.lastDustSpawn = 0;

    if (this.invincibleTween) {
      this.invincibleTween.stop();
      this.invincibleTween = null;
    }
    if (this.powerUpTween) {
      this.powerUpTween.stop();
      this.powerUpTween = null;
    }
    
    this.car.setAlpha(1);
    this.car.setScale(1);
    this.isInvincible = false;
    this.isPoweredUp = false;
    this.powerUpEndTime = 0;
  }

  public destroy() {
    if (this.invincibleTween) {
      this.invincibleTween.stop();
    }
    if (this.powerUpTween) {
      this.powerUpTween.stop();
    }
    this.tireTrailUp.destroy();
    this.tireTrailDown.destroy();
    this.dustSystem.destroy();
    this.car.destroy();
  }
}
