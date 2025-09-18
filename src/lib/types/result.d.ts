export interface Question {
    QID: string;
    Question: string;
    inCorrectAnswer?: string;
    correctAnswer: string;
    answers: Record<string, string>;
}

export interface ResultData {
    message: string;
    correct: number;
    wrong: number;
    total: string;
    WrongQuestions: Question[];
    correctQuestions: Question[];
}