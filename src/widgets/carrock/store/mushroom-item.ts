import { Scene, GameObjects, Physics } from 'phaser';

interface MushroomItem {
  gameObject: GameObjects.Text;
  body: Physics.Arcade.Body;
  collected: boolean;
}

export class MushroomManager {
  private scene: Scene;
  private mushrooms: MushroomItem[] = [];
  private lastSpawnTime: number = 0;
  private spawnInterval: number = 30000; // 8초마다 버섯 생성

  constructor(scene: Scene) {
    this.scene = scene;
  }

  public create() {
    // 초기 설정
  }

  public update() {
    const now = this.scene.time.now;

    // 새로운 버섯 생성
    if (now - this.lastSpawnTime > this.spawnInterval) {
      this.spawnMushroom();
      this.lastSpawnTime = now;
    }

    // 기존 버섯들 업데이트
    this.updateMushrooms();

    // 화면 밖으로 나간 버섯들 제거
    this.cleanupMushrooms();
  }

  private spawnMushroom() {
    // 화면 오른쪽에서 랜덤한 Y 위치에 버섯 생성
    const x = 0;
    const y = Phaser.Math.Between(50, this.scene.cameras.main.height - 50);

    const mushroom = this.scene.add.text(x, y, '🍄', {
      fontSize: '20px',
    });
    mushroom.setOrigin(0.5);
    mushroom.setDepth(2);

    // 물리 엔진 적용
    this.scene.physics.world.enable(mushroom);
    const mushroomBody = mushroom.body as Physics.Arcade.Body;
    mushroomBody.setVelocityX(60); // 오른쪽으로 천천히 이동

    // 위아래로 살짝 떠다니는 효과
    this.scene.tweens.add({
      targets: mushroom,
      y: mushroom.y + 10,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // 반짝이는 효과
    this.scene.tweens.add({
      targets: mushroom,
      alpha: 0.7,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.mushrooms.push({
      gameObject: mushroom,
      body: mushroomBody,
      collected: false,
    });
  }

  private updateMushrooms() {
    // 버섯들 업데이트 (현재는 물리 엔진이 알아서 처리)
  }

  private cleanupMushrooms() {
    this.mushrooms = this.mushrooms.filter((mushroom) => {
      // 화면 왼쪽으로 완전히 사라진 버섯들 제거
      if (mushroom.gameObject.x < -50 || mushroom.collected) {
        mushroom.gameObject.destroy();
        return false;
      }
      return true;
    });
  }

  public checkCollision(car: GameObjects.Text): boolean {
    for (const mushroom of this.mushrooms) {
      if (!mushroom.collected && this.scene.physics.world.overlap(car, mushroom.gameObject)) {
        // 버섯 수집 효과
        this.collectMushroom(mushroom);
        return true;
      }
    }
    return false;
  }

  private collectMushroom(mushroomToCollect: MushroomItem) {
    mushroomToCollect.collected = true;

    // 수집 효과 애니메이션
    this.scene.tweens.add({
      targets: mushroomToCollect.gameObject,
      scaleX: 1.5,
      scaleY: 1.5,
      alpha: 0,
      duration: 300,
      ease: 'Back.easeOut',
      onComplete: () => {
        mushroomToCollect.gameObject.destroy();
      },
    });
  }

  public reset() {
    // 모든 버섯 제거
    this.mushrooms.forEach((mushroom) => {
      mushroom.gameObject.destroy();
    });
    this.mushrooms = [];
    this.lastSpawnTime = 0;
  }

  public destroy() {
    this.reset();
  }
}
