"use client";

import { useEffect } from "react";

type AutoSubmitProps = {
  formRef: React.RefObject<HTMLFormElement>; // reference to the form
  isFinished: boolean; // true if exam time ended
};

export function AutoSubmit({ formRef, isFinished }: AutoSubmitProps) {
  useEffect(() => {
    if (isFinished) {
      // auto-submit the form when exam finishes
      formRef.current?.requestSubmit();
    }
  }, [isFinished]);

  return null;
}
