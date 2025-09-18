import { Exam } from "./exams";

export interface Answer {
    answer: string;
    key: string;
}

export interface Subject {
    _id: string;
    name: string;
    icon: string;
    createdAt: string;
}


export interface Question {
    _id: string;
    question: string;
    answers: Answer[];
    type: string;
    correct: string;
    subject: Subject;
    exam: Exam;
    createdAt: string;
}

export interface QuestionsResponse {
    message: string;
    questions: Question[];
}
