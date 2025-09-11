"use client";

import { useWatch } from "react-hook-form";

type AnswerWatcherProps = {
  control: any; // react-hook-form control
  questionId: string; // ID of the current question
  children: (value: string | undefined) => React.ReactNode; // render prop
};

export function AnswerWatcher({
  control,
  questionId,
  children,
}: AnswerWatcherProps) {
  // watch the selected answer for the given question
  const value = useWatch({
    control,
    name: `answers.${questionId}`,
  });

  // pass the current answer value to children
  return <>{children(value)}</>;
}
