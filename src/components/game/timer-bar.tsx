"use client";

const GAME_DURATION = 60;

interface Props {
  timeLeft: number;
}

export function TimerBar({ timeLeft }: Props) {
  const percentage = (timeLeft / GAME_DURATION) * 100;
  const isLow = timeLeft <= 10;

  return (
    <div className="w-full max-w-md">
      <div className="mb-1 flex justify-between text-sm font-medium">
        <span className={isLow ? "text-red-600" : "text-gray-600"}>
          残り {timeLeft}秒
        </span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-linear ${
            isLow ? "bg-red-500" : "bg-blue-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
