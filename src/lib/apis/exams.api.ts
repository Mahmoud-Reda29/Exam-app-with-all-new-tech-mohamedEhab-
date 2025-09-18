import { getAccessToken } from "@/lib/utils/auth.util";
import { Exam, ExamsResponse } from "@/lib/types/exams";
import { Question, QuestionsResponse } from "@/lib/types/question";

export async function getExams(): Promise<Exam[]> {
    const token = await getAccessToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/exams`, {
        headers: {
            token: token || "",
        },
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch exams");
    }

    const data: ExamsResponse = await res.json();
    return data.exams;
}


export async function getExamById(examId: string): Promise<Exam> {
    const token = await getAccessToken();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/exams/${examId}`,
        {
            headers: {
                token: token || "",
            },
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch exam");
    }

    const data = await res.json();

    if (!data.exam) {
        throw new Error("No exam found");
    }

    return data.exam;
}



export async function getQuestionsByExamId(examId: string): Promise<Question[]> {
    const token = await getAccessToken();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/questions?exam=${examId}`,
        {
            headers: {
                token: token || "",
            },
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch questions");
    }

    const data: QuestionsResponse = await res.json();

    if (!data.questions || data.questions.length === 0) {
        throw new Error("No questions found");
    }

    return data.questions;
}
