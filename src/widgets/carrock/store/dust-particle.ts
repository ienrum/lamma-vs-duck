import { Scene, GameObjects } from 'phaser';

interface DustParticle {
  particle: GameObjects.Text;
  life: number;
  maxLife: number;
  velocity: { x: number; y: number };
}

export class DustParticleSystem {
  private scene: Scene;
  private particles: DustParticle[] = [];
  private maxParticles: number = 20;
  private dustEmojis = ['💨', '☁️', '🌫️'];

  constructor(scene: Scene) {
    this.scene = scene;
  }

  public create() {
    // 초기 설정
  }

  public spawnDust(x: number, y: number, intensity: number = 1) {
    // 기존 파티클 수가 최대치를 넘으면 오래된 것부터 제거
    if (this.particles.length >= this.maxParticles) {
      const oldestParticle = this.particles.shift();
      if (oldestParticle) {
        oldestParticle.particle.destroy();
      }
    }

    // 새로운 먼지 파티클 생성
    const dustEmoji = Phaser.Utils.Array.GetRandom(this.dustEmojis);
    const particle = this.scene.add.text(x, y, dustEmoji, {
      fontSize: Phaser.Math.Between(8, 16) + 'px',
    });

    particle.setOrigin(0.5);
    particle.setDepth(1); // 차량보다 뒤에 렌더링
    particle.setAlpha(0.7);

    // 파티클 물리 속성 설정
    const angle = Phaser.Math.Between(0, 360);
    const speed = Phaser.Math.Between(10, 30) * intensity;
    const velocityX = Math.cos(Phaser.Math.DegToRad(angle)) * speed;
    const velocityY = Math.sin(Phaser.Math.DegToRad(angle)) * speed;

    const dustParticle: DustParticle = {
      particle: particle,
      life: 0,
      maxLife: Phaser.Math.Between(1000, 2000), // 1-2초 지속
      velocity: { x: velocityX, y: velocityY },
    };

    this.particles.push(dustParticle);
  }

  public update(translation?: { x: number; y: number }) {
    // 모든 파티클 업데이트
    const deltaTime = this.scene.game.loop.delta;

    this.particles = this.particles.filter((dustParticle) => {
      dustParticle.life += deltaTime;

      // 파티클 위치 업데이트
      if (translation) {
        dustParticle.particle.x += translation.x;
        dustParticle.particle.y += translation.y;
      }

      // 파티클 이동
      dustParticle.particle.x += dustParticle.velocity.x * (deltaTime / 1000);
      dustParticle.particle.y += dustParticle.velocity.y * (deltaTime / 1000);

      // 중력 효과 (아래로 살짝 떨어짐)
      dustParticle.velocity.y += 20 * (deltaTime / 1000);

      // 마찰 효과 (속도 감소)
      dustParticle.velocity.x *= 0.98;
      dustParticle.velocity.y *= 0.98;

      // 알파값 감소 (페이드 아웃)
      const lifeRatio = dustParticle.life / dustParticle.maxLife;
      const alpha = Math.max(0, 0.7 * (1 - lifeRatio));
      dustParticle.particle.setAlpha(alpha);

      // 스케일 변화 (점점 작아짐)
      const scale = Math.max(0.3, 1 - lifeRatio * 0.7);
      dustParticle.particle.setScale(scale);

      // 수명이 다한 파티클 제거
      if (dustParticle.life >= dustParticle.maxLife) {
        dustParticle.particle.destroy();
        return false;
      }

      return true;
    });
  }

  public clear() {
    // 모든 파티클 제거
    this.particles.forEach((dustParticle) => {
      dustParticle.particle.destroy();
    });
    this.particles = [];
  }

  public destroy() {
    this.clear();
  }
}
