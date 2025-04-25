'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import { Game, Scene, AUTO, Types } from 'phaser';
import { FenseWall } from '../store/fense-wall';
import { width, height } from '../config/constants';
import { Button } from '@/components/ui/button';
import { useCrossPadStore } from '@/src/entities/cross-pad/model/store';
import { CrossPad } from '@/src/features/cross-pad/ui/CrossPad';
export interface IRefPhaserGame {
  game: Game | null;
  scene: Scene | null;
}

interface IProps {
  currentActiveScene?: (scene_instance: Scene) => void;
}

const FenseWallScene = forwardRef<IRefPhaserGame, IProps>(function FenseWallScene({ currentActiveScene }, ref) {
  const game = useRef<Game | null>(null);
  const [count, setCount] = useState(0);
  const { currentDirection } = useCrossPadStore();

  useEffect(() => {
    if (game.current === null) {
      const config: Types.Core.GameConfig = {
        type: AUTO,
        width: width,
        height: height,
        parent: 'fense-wall-game',
        backgroundColor: '#90EE90',
        scene: [FenseWall],
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { x: 0, y: 0 },
            debug: false,
          },
        },
      };

      game.current = new Game(config);

      if (typeof ref === 'function') {
        ref({ game: game.current, scene: null });
      } else if (ref) {
        ref.current = { game: game.current, scene: null };
      }
    }

    return () => {
      if (game.current) {
        game.current.destroy(true);
        game.current = null;
      }
    };
  }, [ref, count]);

  useEffect(() => {
    console.log(currentDirection);
    if (game.current) {
      if (currentDirection === 'left') {
        (game.current.scene.getScene('FenseWall') as FenseWall).moveLeft();
      } else if (currentDirection === 'right') {
        (game.current.scene.getScene('FenseWall') as FenseWall).moveRight();
      } else if (currentDirection === 'up') {
        (game.current.scene.getScene('FenseWall') as FenseWall).moveUp();
      } else if (currentDirection === 'down') {
        (game.current.scene.getScene('FenseWall') as FenseWall).moveDown();
      }
    }
  }, [currentDirection]);

  return (
    <>
      <Button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        reload
      </Button>
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center justify-center">
          <div
            id="fense-wall-game"
            style={{ width: width + 2, height: height + 2 }}
            className="rounded-sm border-8 border-gray-400"
          />
        </div>
        <CrossPad />
      </div>
    </>
  );
});

export default FenseWallScene;
