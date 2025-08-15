import { Scene, GameObjects } from 'phaser';
import { CARROCK_CONSTANTS } from './constants';

interface TrailPoint {
  x: number;
  y: number;
  timestamp: number;
}

export class TireTrail {
  private scene: Scene;
  private trailPoints: TrailPoint[] = [];
  private trailGraphics!: GameObjects.Graphics;
  private lastUpdateTime: number = 0;

  constructor(scene: Scene) {
    this.scene = scene;
  }

  public create() {
    this.trailGraphics = this.scene.add.graphics();
    this.trailGraphics.setDepth(1);
  }

  public addPoint(x: number, y: number) {
    const now = this.scene.time.now;

    if (now - this.lastUpdateTime > CARROCK_CONSTANTS.TIRE_TRAIL.UPDATE_INTERVAL) {
      this.trailPoints.push({ x, y, timestamp: now });

      // 최대 길이 제한
      if (this.trailPoints.length > CARROCK_CONSTANTS.TIRE_TRAIL.MAX_LENGTH) {
        this.trailPoints.shift();
      }

      this.lastUpdateTime = now;
    }
  }

  public update() {
    const now = this.scene.time.now;

    // 오래된 점들 제거
    this.trailPoints = this.trailPoints.filter(
      (point) => now - point.timestamp < CARROCK_CONSTANTS.TIRE_TRAIL.FADE_DURATION
    );

    this.moveRight();
    this.render();
  }

  // 오른쪽으로 이동시키는 메서드
  private moveRight() {
    this.trailPoints.forEach((point) => {
      point.x += 2; // 모든 점을 오른쪽으로 이동
    });
  }

  private render() {
    this.trailGraphics.clear();

    if (this.trailPoints.length < 2) return;

    const now = this.scene.time.now;

    for (let i = 1; i < this.trailPoints.length; i++) {
      const prevPoint = this.trailPoints[i - 1];
      const currentPoint = this.trailPoints[i];

      // 페이드 아웃 효과 계산
      const age = now - currentPoint.timestamp;
      const alpha = Math.max(0, 1 - age / CARROCK_CONSTANTS.TIRE_TRAIL.FADE_DURATION);

      // 선 그리기
      this.trailGraphics.lineStyle(CARROCK_CONSTANTS.TIRE_TRAIL.WIDTH, CARROCK_CONSTANTS.TIRE_TRAIL.COLOR, alpha);
      this.trailGraphics.lineBetween(prevPoint.x, prevPoint.y, currentPoint.x, currentPoint.y);
    }
  }

  public clear() {
    this.trailPoints = [];
    this.trailGraphics.clear();
  }

  public destroy() {
    this.trailGraphics.destroy();
  }
}
