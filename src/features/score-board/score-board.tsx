interface ScoreBoardProps {
  score: number;
  highScore: number;
}

const ScoreBoard = ({ score, highScore }: ScoreBoardProps) => {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg bg-black/50 p-4 text-white backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div className="text-2xl">💰</div>
        <div className="text-2xl font-bold">{score}</div>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <div>🏆</div>
        <div>High Score: {highScore}</div>
      </div>
    </div>
  );
};

export default ScoreBoard;
