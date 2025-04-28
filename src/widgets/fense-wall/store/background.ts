import { Scene, GameObjects } from 'phaser';
import { GAME_CONSTANTS } from './constants';

export class Background {
  private background!: GameObjects.Graphics;
  private grid!: GameObjects.Graphics;
  private patternSize: number = 50;

  constructor(private scene: Scene) {}

  public create() {
    this.createBackground();
    this.createGrid();
    this.createPattern();
  }

  private createBackground() {
    this.background = this.scene.add.graphics();
    this.background.fillStyle(0x90ee90, 1);
    this.background.fillRect(0, 0, this.scene.cameras.main.width, this.scene.cameras.main.height);
    this.background.setDepth(-2);
  }

  private createGrid() {
    this.grid = this.scene.add.graphics();
    this.grid.lineStyle(1, 0xffffff, 0.2);

    for (let x = 0; x <= this.scene.cameras.main.width; x += 100) {
      this.grid.moveTo(x, 0);
      this.grid.lineTo(x, this.scene.cameras.main.height);
    }

    for (let y = 0; y <= this.scene.cameras.main.height; y += 100) {
      this.grid.moveTo(0, y);
      this.grid.lineTo(this.scene.cameras.main.width, y);
    }

    this.grid.strokePath();
    this.grid.setDepth(-1);
  }

  private createPattern() {
    const patternCountX = Math.ceil(this.scene.cameras.main.width / this.patternSize);
    const patternCountY = Math.ceil(this.scene.cameras.main.height / this.patternSize);

    for (let x = 0; x < patternCountX; x++) {
      for (let y = 0; y < patternCountY; y++) {
        const pattern = this.scene.add.text(
          x * this.patternSize + this.patternSize / 2,
          y * this.patternSize + this.patternSize / 2,
          '🌿',
          {
            fontSize: GAME_CONSTANTS.BACKGROUND.PATTERN_SIZE,
            color: '#ffffff',
          }
        );
        pattern.setOrigin(0.5);
        pattern.setAlpha(0.5);
        pattern.setDepth(-1);
      }
    }
  }

  public destroy() {
    this.background.destroy();
    this.grid.destroy();
  }
}
