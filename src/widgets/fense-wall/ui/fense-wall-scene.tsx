'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import { Game, Scene, AUTO, Types } from 'phaser';
import { FenseWall } from '../store/fense-wall';
import { width, height } from '../config/constants';
import { Button } from '@/components/ui/button';
import { useCrossPadStore } from '@/src/entities/cross-pad/model/store';
import { CrossPad } from '@/src/features/cross-pad/ui/CrossPad';
import HealthBar from '@/src/features/health-bar/health-bar';
import ScoreBoard from '@/src/features/score-board/score-board';
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
  const [score, setScore] = useState({ score: 0, highScore: 0 });
  const [isGameReady, setIsGameReady] = useState(false);

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

      game.current.events.once('ready', () => {
        const scene = game.current?.scene.getScene('FenseWall') as FenseWall;
        if (scene) {
          console.log('게임 씬 초기화 완료');
          scene.onHealthChange((health, maxHealth) => {
            console.log('체력 변경 감지:', { health, maxHealth });
            setHealth({ health, maxHealth });
          });
          scene.onScoreChange((score, highScore) => {
            console.log('점수 변경 감지:', { score, highScore });
            setScore({ score, highScore });
          });
          setIsGameReady(true);
        }
      });

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
    if (game.current && isGameReady) {
      const scene = game.current.scene.getScene('FenseWall') as FenseWall;
      if (currentDirection === 'left') {
        scene.moveLeft();
      } else if (currentDirection === 'right') {
        scene.moveRight();
      } else if (currentDirection === 'up') {
        scene.moveUp();
      } else if (currentDirection === 'down') {
        scene.moveDown();
      }
    }
  }, [currentDirection, isGameReady]);

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
        <div className="flex flex-col gap-4">
          <ScoreBoard score={score.score} highScore={score.highScore} />
          <HealthBar health={health.health} maxHealth={health.maxHealth} />
        </div>
        {/**블러 처리 게임 오버시 */}
        <div className={cn('flex flex-col items-center justify-center')}>
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
