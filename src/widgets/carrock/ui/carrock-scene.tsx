'use client';

import { forwardRef, useActionState, useEffect, useRef, useState } from 'react';
import { Game, Scene, AUTO, Types } from 'phaser';
import { CarrockScene } from '../store/carrock';
import { width, height } from '../config/constants';
import HealthBar from '@/src/features/health-bar/health-bar';
import ScoreBoard from '@/src/features/score-board/score-board';
import { cn } from '@/lib/utils';
import { endGameAction } from '@/src/widgets/duck-vs-lamma/api/end-game-action';
import { useParams, useRouter } from 'next/navigation';
import { GameSubmissionForm } from '../../duck-vs-lamma/ui/GameSubmissionForm';
import ScoreResult from '../../score-result/score-result';
import Spinner from '@/components/ui/spinner';
import { posthog } from 'posthog-js';
import { useQueryClient } from '@tanstack/react-query';

export interface IRefPhaserGame {
  game: Game | null;
  scene: Scene | null;
}

interface IProps {
  currentActiveScene?: (scene_instance: Scene) => void;
  isAuthenticated: boolean;
}

const CarrockSceneComponent = forwardRef<IRefPhaserGame, IProps>(function CarrockSceneComponent(
  { currentActiveScene, isAuthenticated },
  ref
) {
  const { gameId } = useParams();

  const game = useRef<Game | null>(null);
  const queryClient = useQueryClient();
  const [health, setHealth] = useState({ health: 100, maxHealth: 100 });
  const [score, setScore] = useState({ score: 0, highScore: 0 });
  const [isGameReady, setIsGameReady] = useState(false);
  const [state, formAction, isPending] = useActionState(endGameAction, null);
  const error = state?.error || null;
  const success = state?.status === 'success';

  const gameEndRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (game.current === null) {
      const config: Types.Core.GameConfig = {
        type: AUTO,
        width: width,
        height: height,
        parent: 'carrock-game',
        backgroundColor: '#9e951cff',
        scene: [CarrockScene],
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
        const scene = game.current?.scene.getScene('CarrockScene') as CarrockScene;
        if (scene) {
          console.log('Carrock 게임 씬 초기화 완료');
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
  }, [ref, formAction]);

  useEffect(() => {
    if (game.current && isGameReady) {
      const scene = game.current?.scene.getScene('CarrockScene') as CarrockScene;
      if (scene && scene.isGameOver()) {
        if (!isAuthenticated) {
          router.push(`/result/${gameId}`);
          return;
        }
        posthog.capture(`game_end_${gameId}`);
        gameEndRef.current?.requestSubmit();
      }
    }
  }, [score.highScore, health.health, isGameReady, isAuthenticated, gameId, router]);

  useEffect(() => {
    if (success) {
      queryClient.invalidateQueries({ queryKey: ['deviation'] });
      queryClient.invalidateQueries({ queryKey: ['ranking', gameId] });
      router.push(`/result/${gameId}`);
    }
  }, [success, queryClient, gameId, router]);

  if (error) {
    throw new Error(error);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {!isGameReady && <Spinner />}
      <div
        className={cn('flex flex-col items-center justify-center gap-8', {
          'opacity-50': !isGameReady,
          'pointer-events-none': !isGameReady,
          hidden: !isGameReady,
        })}
      >
        <div className="flex flex-col gap-4">
          <ScoreBoard score={score.score} highScore={score.highScore} />
          <HealthBar health={health.health} maxHealth={health.maxHealth} />
        </div>

        <div className={cn('flex flex-col items-center justify-center')}>
          <div
            id="carrock-game"
            style={{ width: width + 2, height: height + 2 }}
            className="rounded-sm border-8 border-gray-400"
          />
        </div>

        <GameSubmissionForm
          gameEndRef={gameEndRef}
          formAction={formAction}
          gameId={Number(gameId)}
          getGameScore={() => score.highScore.toString()}
        />
      </div>

      <ScoreResult isAuthenticated={isAuthenticated} open={health.health <= 0 && !isAuthenticated} />
    </div>
  );
});

export default CarrockSceneComponent;
