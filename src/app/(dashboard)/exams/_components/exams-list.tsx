import React from "react";
import { Timer } from "lucide-react";
import Link from "next/link";
import { getExams } from "@/lib/apis/exams.api";

export default async function ExamList() {
  const exams = await getExams();

  return (
    <>
      <ul className="flex flex-col gap-4 p-6 ">
        {exams.map((exam) => (
          <Link key={exam._id} href={`/exams/${exam._id}`} className="group">
            <li className="h-20 bg-[#EFF6FF] p-4 flex justify-between items-center shadow-sm">
              <div className="flex flex-col gap-2">
                <h2 className="geist-mono-semibold text-primary">
                  {exam.title}
                </h2>
                <p className="geist-mono-regular text-[14px] text-gray-500">
                  {exam.numberOfQuestions} Questions
                </p>
              </div>
              <p className="geist-mono-regular text-[14px] flex gap-2 justify-center items-center text-[#1F2937]">
                <Timer className="text-[#9ca3af]" />
                Duration: {exam.duration} mins
              </p>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
}
