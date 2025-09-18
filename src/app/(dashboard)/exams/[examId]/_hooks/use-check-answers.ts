/**
 * useCheckAnswers Hook
 * ---------------------
 * A custom hook to handle checking exam answers with React Query:
 * - Wraps the `checkAnswersAction` server action in a mutation.
 * - Accepts an `AnswerPayload` and sends it to the API.
 * - Provides mutation states (loading, error, success) for UI handling.
 */

import { AnswerPayload } from "@/lib/types/exams";
import { useMutation } from "@tanstack/react-query";
import { checkAnswersAction } from "../_action/exam.action";

export const useCheckAnswers = () => {
  return useMutation({
    mutationFn: async (data: AnswerPayload) => {
      return await checkAnswersAction(data);
    },
  });
};
