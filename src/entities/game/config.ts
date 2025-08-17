import formatTime from '@/src/shared/util/format-time';

export interface GameConfig {
  title: string;
  scoreFormatter: (score: number) => string;
  order: 'asc' | 'desc';
}

export const getGameConfig = (gameId: string): GameConfig => {
  switch (gameId) {
    case '1':
      return {
        title: 'Lamma vs Duck',
        scoreFormatter: formatTime,
        order: 'asc',
      };
    case '2':
      return {
        title: 'Greedy Bee',
        scoreFormatter: (score: number) => score.toString(),
        order: 'desc',
      };
    case '3':
      return {
        title: 'Carrock',
        scoreFormatter: (score: number) => score.toString(),
        order: 'desc',
      };
    default:
      return {
        title: 'Unknown Game',
        scoreFormatter: (score: number) => score.toString(),
        order: 'desc',
      };
  }
};