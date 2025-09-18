"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { getQuestionsByExamId } from "@/lib/apis/exams.api";
import { Exam } from "@/lib/types/exams";
import { Question } from "@/lib/types/question";
import { useExamStore } from "@/store/useExamStore";
import CountdownTimer from "@/components/shared/countdownTimer";
import { useCountdownStore } from "@/store/useCountdownStore";
import { useCheckAnswers } from "../_hooks/use-check-answers";
import { ButtonNavigator } from "./ButtonNavigator";
import { AutoSubmit } from "./AutoSubmit";
import { QuestionOptions } from "./question-options";
import { AnswerWatcher } from "./answer-watcher";
import toast from "react-hot-toast";

type FormValues = {
  answers: {
    [questionId: string]: string;
  };
};

/**
 * QuestionsForm Component
 * -----------------------
 * This component renders the exam questions form:
 * - Fetches questions by exam ID.
 * - Manages navigation between questions (next/previous).
 * - Handles countdown timer and auto-submit when time finishes.
 * - Submits answers to API and stores the result in exam store.
 */
export default function QuestionsForm({ data }: { data?: Exam }) {
  // Mutation hook to check answers (API call)
  const checkAnswersMutation = useCheckAnswers();

  // State to hold fetched questions
  const [questions, setQuestions] = useState<Question[]>([]);

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { answers: {} },
  });

  // Exam store: manages current index, navigation, and total questions
  const {
    currentIndex,
    nextQuestion,
    prevQuestion,
    setCurrentIndex,
    settotalQuestions,
  } = useExamStore();

  // Countdown store: reset and check if finished
  const resetCountdown = useCountdownStore.getState().resetCountdown;
  const isFinished = useCountdownStore((state) => state.isFinished);

  // Reference for the form (used by AutoSubmit)
  const formRef = useRef<HTMLFormElement | null>(null);

  /**
   * Fetch questions when exam ID changes
   */
  useEffect(() => {
    if (!data?._id) return;

    getQuestionsByExamId(data._id)
      .then((res) => {
        setQuestions(res);
        setCurrentIndex(0);
        settotalQuestions(res.length);
      })
      .catch((err) => toast.error(err.message));
  }, [data?._id, setCurrentIndex, settotalQuestions]);

  /**
   * Reset countdown when component unmounts
   */
  useEffect(() => {
    return () => {
      resetCountdown();
    };
  }, [resetCountdown]);

  if (!data?._id) return <p>No exam selected</p>;
  if (!questions.length) return <p>Loading questions...</p>;

  const currentQuestion = questions[currentIndex];

  /**
   * Handle form submission (send answers + time left)
   */
  const onSubmit = (values: FormValues) => {
    // Format answers into API-compatible shape
    const formattedAnswers = Object.entries(values.answers).map(
      ([questionId, correct]) => ({
        questionId,
        correct,
      })
    );

    // Get remaining time
    const timeLeft = useCountdownStore.getState().timeLeft;

    const payload = {
      answers: formattedAnswers,
      time: timeLeft,
    };

    const setResult = useExamStore.getState().setResult;

    // API call to check answers
    checkAnswersMutation.mutate(payload, {
      onSuccess: (data) => {
        setResult(data);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="p-6">
      {/* Render current question text */}
      <h2 className="geist-mono-semibold text-primary mb-4">
        {currentQuestion.question}
      </h2>

      {/* Render current question options */}
      <QuestionOptions control={control} question={currentQuestion} />

      {/* Navigation buttons + Timer */}
      <div className="mt-6 flex justify-between gap-4">
        {/* Previous Question Button */}
        <Button
          className="h-12 font-medium text-[14px] flex-1"
          type="button"
          variant="outline"
          disabled={currentIndex === 0}
          onClick={prevQuestion}
        >
          Previous
        </Button>

        {/* Countdown Timer */}
        <CountdownTimer totalMinutes={data.duration} />

        {/* Next / Submit Button controlled by AnswerWatcher */}
        <AnswerWatcher control={control} questionId={currentQuestion._id}>
          {(selectedAnswer) => (
            <ButtonNavigator
              hasAnswer={!!selectedAnswer}
              isLast={currentIndex === questions.length - 1}
              isLoading={checkAnswersMutation.isPending || isSubmitting}
              onNext={() => {
                if (!selectedAnswer) return;
                nextQuestion();
              }}
            />
          )}
        </AnswerWatcher>
      </div>

      {/* Auto Submit when time finishes */}
      <AutoSubmit formRef={formRef} isFinished={isFinished} />
    </form>
  );
}
