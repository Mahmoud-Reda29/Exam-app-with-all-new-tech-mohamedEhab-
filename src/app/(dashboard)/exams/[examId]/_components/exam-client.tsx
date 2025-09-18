"use client";

import { Exam } from "@/lib/types/exams";
import Progressbar from "./progressbar";
import QuestionsForm from "./questions-form";
import ExamResult from "./result-component";
import { useExamStore } from "@/store/useExamStore";
import { ResultData } from "@/lib/types/result";
import { Button } from "@/components/ui/button";
import { FolderSearch, RotateCcw } from "lucide-react";

export default function ExamClient({ data }: { data: Exam }) {
  // Access exam result and updater from global store
  const { result, setResult } = useExamStore();

  return (
    <>
      {/* Progress bar for the exam */}
      <div className="p-6 pb-4">
        <Progressbar data={data} />
      </div>

      {/* If exam is finished, show result */}
      {result ? (
        <div className="p-6 flex flex-col gap-4">
          {/* Exam result component */}
          <ExamResult data={result as ResultData} />

          {/* Action buttons after exam completion */}
          <div className="flex gap-4 geist-mono-medium text-[14px] pt-6">
            {/* Restart exam */}
            <Button
              onClick={() => setResult(null)}
              className="flex-1 rounded-none bg-gray-200 text-black hover:bg-gray-300 flex gap-[10px]"
              type="button"
            >
              <RotateCcw /> Restart
            </Button>

            {/* Explore (placeholder action) */}
            <Button
              className="flex-1 rounded-none bg-primary text-white hover:bg-primary/90 flex gap-[10px]"
              type="button"
            >
              <FolderSearch /> Explore
            </Button>
          </div>
        </div>
      ) : (
        // If exam not finished, show questions form
        <QuestionsForm data={data} />
      )}
    </>
  );
}
