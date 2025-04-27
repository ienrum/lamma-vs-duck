const HealthBar = ({ health, maxHealth }: { health: number; maxHealth: number }) => {
  const healthPercentage = (health / maxHealth) * 100;
  const healthColor = healthPercentage > 50 ? 'bg-green-500' : healthPercentage > 20 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full rounded-full transition-all duration-300 ${healthColor}`}
          style={{ width: `${healthPercentage}%` }}
        />
      </div>
      <span className="text-sm font-medium text-gray-700">
        {health}/{maxHealth}
      </span>
    </div>
  );
};

export default HealthBar;
