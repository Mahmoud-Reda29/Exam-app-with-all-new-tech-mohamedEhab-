"use client";

import { Button } from "@/components/ui/button";

// ButtonNavigator: Renders "Next" or "Submit" depending on whether it's the last question
export function ButtonNavigator({
  hasAnswer, // true if the current question has an answer
  isLast, // true if this is the last question
  isLoading, // true if the form is submitting
  onNext, // function to go to the next question
}: {
  hasAnswer: boolean;
  isLast: boolean;
  isLoading: boolean;
  onNext: () => void;
}) {
  // Show "Next" button if not the last question
  if (!isLast) {
    return (
      <Button
        className="h-12 bg-primary hover:bg-primary/90 text-white font-medium text-[14px] flex-1"
        type="button"
        disabled={!hasAnswer} // disabled if no answer selected
        onClick={onNext}
      >
        Next
      </Button>
    );
  }

  // Show "Submit" button if it's the last question
  return (
    <Button
      disabled={!hasAnswer || isLoading} // disabled if no answer or loading
      className="h-12 bg-primary hover:bg-primary/90 text-white font-medium text-[14px] flex-1"
      type="submit"
    >
      {isLoading ? "Loading..." : "Submit"}
    </Button>
  );
}
