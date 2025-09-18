import { create } from "zustand";
import { ResultData } from "@/lib/types/result";

interface ExamState {
    currentIndex: number;
    totalQuestions: number;
    quizTitle: string;
    result: ResultData | null;
    setCurrentIndex: (index: number) => void;
    settotalQuestions: (total: number) => void;
    setquizTitle: (quiz: string) => void;
    setResult: (result: ResultData | null) => void;
    nextQuestion: () => void;
    prevQuestion: () => void;
}

export const useExamStore = create<ExamState>((set) => ({
    currentIndex: 0,
    totalQuestions: 0,
    quizTitle: "",
    result: null,
    setCurrentIndex: (index) => set({ currentIndex: index }),
    settotalQuestions: (total) => set({ totalQuestions: total }),
    setquizTitle: (quiz) => set({ quizTitle: quiz }),
    setResult: (result) => set({ result }),
    nextQuestion: () =>
        set((state) => ({ currentIndex: state.currentIndex + 1 })),
    prevQuestion: () =>
        set((state) => ({ currentIndex: state.currentIndex - 1 })),
}));
