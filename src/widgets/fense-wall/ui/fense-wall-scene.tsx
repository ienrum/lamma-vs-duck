'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import { Game, Scene, AUTO, Types } from 'phaser';
import { FenseWall } from '../store/fense-wall';
import { width, height } from '../config/constants';
import { Button } from '@/components/ui/button';
import { useCrossPadStore } from '@/src/entities/cross-pad/model/store';
import { CrossPad } from '@/src/features/cross-pad/ui/CrossPad';
import HealthBar from '@/src/features/health-bar/health-bar';
import { cn } from '@/lib/utils';

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
  const [health, setHealth] = useState({ health: 100, maxHealth: 100 });
  const fenseWallScene = game.current?.scene.getScene('FenseWall') as FenseWall;

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
  }, [ref, count, fenseWallScene]);

  useEffect(() => {
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

  useEffect(() => {
    console.log(fenseWallScene);
    if (fenseWallScene) {
      fenseWallScene.onHealthChange((health, maxHealth) => {
        setHealth({ health, maxHealth });
      });
    }
  }, [fenseWallScene]);

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
        <HealthBar health={health.health} maxHealth={health.maxHealth} />
        {/**블러 처리 게임 오버시 */}
        <div
          className={cn('flex flex-col items-center justify-center', {
            blur: fenseWallScene?.isGameOver(), // 게임 오버 상태일 때 블러 처리
          })}
        >
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
