"use client";

import { useCountdownStore } from "@/store/useCountdownStore";
import { useEffect, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type CountdownProgressProps = {
  totalMinutes?: number;
};

/**
 * CountdownTimer Component
 * -------------------------
 * Displays a countdown timer with a circular progress bar.
 * - If `totalMinutes` is provided, shows a circular countdown with minutes and seconds.
 * - If `totalMinutes` is not provided, shows a simple text countdown in seconds.
 * - Uses a global Zustand store (`useCountdownStore`) for managing timeLeft, tick, and startCountdown.
 * - Automatically starts countdown and updates every second.
 * - Clears the interval when unmounted or countdown reaches zero.
 */
const CountdownTimer = ({ totalMinutes }: CountdownProgressProps) => {
  const timeLeft = useCountdownStore((s) => s.timeLeft);
  const startCountdown = useCountdownStore((s) => s.startCountdown);
  const tick = useCountdownStore((s) => s.tick);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start countdown if totalMinutes is defined
    if (typeof totalMinutes === "number" && totalMinutes > 0) {
      startCountdown(totalMinutes * 60);
    }

    // Set interval to update time every second
    intervalRef.current = setInterval(() => {
      const currentTime = useCountdownStore.getState().timeLeft;
      if (currentTime <= 0) {
        // Stop interval if countdown reaches zero
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } else {
        tick(); // Decrease timeLeft by one
      }
    }, 1000);

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  // Render circular progress if totalMinutes is provided
  if (typeof totalMinutes === "number" && totalMinutes > 0) {
    const totalSeconds = totalMinutes * 60;
    const percentage = Math.max(
      0,
      Math.min(100, (timeLeft / totalSeconds) * 100)
    );

    return (
      <div className="w-15 h-15">
        <CircularProgressbar
          value={percentage}
          text={`${Math.floor(timeLeft / 60)}:${(timeLeft % 60)
            .toString()
            .padStart(2, "0")}`}
          strokeWidth={15}
          styles={buildStyles({
            pathColor: "#155DFC",
            textColor: "#111",
            trailColor: "#DBEAFE",
            pathTransitionDuration: 0.5,
            strokeLinecap: "butt",
          })}
          className="[&_.CircularProgressbar-path]:stroke-[15px] [&_.CircularProgressbar-trail]:stroke-[15px]"
        />
      </div>
    );
  }

  // Render simple text countdown if totalMinutes is not provided
  return (
    <p className="text-center font-mono font-medium text-[14px] text-gray-600">
      You can request another code in: {timeLeft}s
    </p>
  );
};

export default CountdownTimer;
