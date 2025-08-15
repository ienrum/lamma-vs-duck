import { Scene, GameObjects } from 'phaser';
import { CARROCK_CONSTANTS } from './constants';

export class Background {
  private scene: Scene;
  private background!: GameObjects.Graphics;
  private grid!: GameObjects.Graphics;

  constructor(scene: Scene) {
    this.scene = scene;
  }

  public create() {
    this.createBackground();
    this.createGrid();
  }

  private createBackground() {
    this.background = this.scene.add.graphics();
    this.background.fillStyle(CARROCK_CONSTANTS.BACKGROUND.COLOR, 1);
    this.background.fillRect(0, 0, this.scene.cameras.main.width, this.scene.cameras.main.height);
    this.background.setDepth(-2);
  }

  private createGrid() {
    this.grid = this.scene.add.graphics();
    this.grid.lineStyle(1, CARROCK_CONSTANTS.BACKGROUND.GRID_COLOR, CARROCK_CONSTANTS.BACKGROUND.GRID_ALPHA);

    this.grid.strokePath();
    this.grid.setDepth(-1);
  }

  public destroy() {
    this.background.destroy();
    this.grid.destroy();
  }
}
