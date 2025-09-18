"use client";
import { Progress } from "@/components/ui/progress";
import { useExamStore } from "@/store/useExamStore";
import { Exam } from "@/lib/types/exams";
import React, { useEffect } from "react";

export default function Progressbar({ data }: { data?: Exam }) {
  // Get current question index, total questions, and setter for quiz title
  const { currentIndex, totalQuestions, setquizTitle } = useExamStore();

  // Update quiz title in global store when exam data changes
  useEffect(() => {
    if (data?.title) {
      setquizTitle(data.title);
    }
  }, [data?.title, setquizTitle]);

  return (
    <div className="gap-[6px] flex flex-col">
      {/* Exam title and current question tracker */}
      <div className="flex justify-between">
        <p className="geist-mono-regular text-[14px] text-gray-500">
          {data?.title}
        </p>
        <span className="geist-mono-regular text-[14px] text-gray-500">
          Question <span className="text-primary">{currentIndex + 1}</span> of{" "}
          {totalQuestions}
        </span>
      </div>

      {/* Progress bar showing percentage of completed questions */}
      <Progress
        value={((currentIndex + 1) / totalQuestions) * 100}
        className="h-4 rounded-none bg-[#EFF6FF]"
      />
    </div>
  );
}
