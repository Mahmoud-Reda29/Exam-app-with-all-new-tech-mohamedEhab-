"use client";

import { useCountdownStore } from "@/store/useCountdownStore";
import { useEffect, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Button } from "../ui/button";
import { useForgotPassword } from "@/app/(auth)/forgot-password/_hooks/use-forgot-password";

type CountdownProgressProps = {
  totalMinutes?: number;
  email?: string;
};

const CountdownTimer = ({ totalMinutes, email }: CountdownProgressProps) => {
  const timeLeft = useCountdownStore((s) => s.timeLeft);
  const startCountdown = useCountdownStore((s) => s.startCountdown);
  const tick = useCountdownStore((s) => s.tick);
  const { mutate: forgotPassword, error, isPending } = useForgotPassword();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof totalMinutes === "number" && totalMinutes > 0) {
      startCountdown(totalMinutes * 60);
    }
  }, [totalMinutes, startCountdown]);

  useEffect(() => {
    // clear old interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // only set new interval if timeLeft > 0
    if (timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        tick();
      }, 1000);
    }

    // cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [timeLeft, tick]);

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

  return (
    <>
      {timeLeft > 0 ? (
        <p className="text-center font-mono font-medium text-[14px] text-gray-600">
          You can request another code in: {timeLeft}s
        </p>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <p>Didn’t receive the code? </p>
          <Button
            onClick={() => {
              forgotPassword(email ?? "");
              startCountdown(60);
            }}
            variant="link"
            className="underline border-none p-0 hover:bg-transparent text-primary cursor-pointer"
          >
            {isPending ? "Resending..." : "Resend"}
          </Button>
          {error && <p className="text-red-500">{error.message}</p>}
        </div>
      )}
    </>
  );
};

export default CountdownTimer;
