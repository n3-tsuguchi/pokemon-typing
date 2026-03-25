"use client";

const GAME_DURATION = 60;

interface Props {
  timeLeft: number;
}

export function TimerBar({ timeLeft }: Props) {
  const percentage = (timeLeft / GAME_DURATION) * 100;
  const isLow = timeLeft <= 10;
  const isCritical = timeLeft <= 5;

  return (
    <div className="w-full">
      <div className="mb-1.5 sm:mb-2 flex items-center justify-between">
        <div className={`flex items-center gap-1.5 sm:gap-2 ${isLow ? "animate-timer-shake" : ""}`}>
          <div className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full ${
            isCritical ? "bg-red-100" : isLow ? "bg-orange-100" : "bg-blue-100"
          }`}>
            <svg className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${
              isCritical ? "text-red-500" : isLow ? "text-orange-500" : "text-blue-500"
            }`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <span className={`text-xl sm:text-2xl font-bold tabular-nums ${
            isCritical ? "text-red-500" : isLow ? "text-orange-500" : "text-gray-700"
          }`}>
            {timeLeft}<span className="text-xs sm:text-sm font-medium text-gray-400 ml-0.5">秒</span>
          </span>
        </div>
      </div>
      <div className="h-2.5 sm:h-3 w-full overflow-hidden rounded-full bg-gray-100 shadow-inner">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-linear ${
            isCritical
              ? "bg-gradient-to-r from-red-400 to-red-500 shadow-[0_0_12px_rgba(239,68,68,0.4)]"
              : isLow
                ? "bg-gradient-to-r from-orange-400 to-orange-500"
                : "bg-gradient-to-r from-blue-400 to-blue-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
