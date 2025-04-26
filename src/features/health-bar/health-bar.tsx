const HealthBar = ({ health, maxHealth }: { health: number; maxHealth: number }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="h-4 w-[200px] rounded-full bg-red-500">
        <div className="h-4 rounded-full bg-green-500" style={{ width: `${(health / maxHealth) * 100}%` }}></div>
      </div>
    </div>
  );
};

export default HealthBar;
