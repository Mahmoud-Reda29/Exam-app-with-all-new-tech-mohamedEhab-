"use client";

import { useEffect } from "react";
import { ResultData, Question } from "@/types/result";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useExamStore } from "@/store/useExamStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function ExamResult({ data }: { data: ResultData }) {
  const totalQuestions = data.correct + data.wrong;
  const percentage = Math.round((data.correct / totalQuestions) * 100);

  const setResult = useExamStore((state) => state.setResult);

  // Sync result in store, clear when unmount
  useEffect(() => {
    setResult(data);
    return () => {
      setResult(null);
    };
  }, [data, setResult]);

  // Merge correct and wrong questions, marking wrong ones
  const allQuestions: (Question & { isWrong: boolean })[] = [
    ...data.WrongQuestions.map((q) => ({ ...q, isWrong: true })),
    ...data.correctQuestions.map((q) => ({ ...q, isWrong: false })),
  ];

  return (
    <section className="flex flex-col overflow-hidden">
      <h2 className="text-xl font-semibold mb-4 text-primary">Results:</h2>

      <div className="flex gap-9 overflow-hidden p-[6px] items-center">
        {/* Circular progress + stats */}
        <Card className="flex flex-col items-center gap-6 border-none bg-transparent shadow-none">
          <CardContent className="flex flex-col items-center gap-6">
            {/* Progress circle */}
            <div className="w-[203px] h-[203px]">
              <CircularProgressbar
                strokeWidth={16}
                value={percentage}
                styles={buildStyles({
                  textColor: "#333",
                  pathColor: "#00BC7D",
                  trailColor: "#EF4444",
                  textSize: "16px",
                  strokeLinecap: "butt",
                })}
              />
            </div>

            {/* Correct & Wrong stats */}
            <div className="p-[10px] geist-mono-medium text-[14px] flex flex-col gap-[10px]">
              <p className="flex items-center gap-2">
                <span className="w-4 h-4 bg-green-600"></span>
                Correct: {data.correct}
              </p>
              <p className="flex items-center gap-2">
                <span className="w-4 h-4 bg-red-600"></span>
                Incorrect: {data.wrong}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Questions review */}
        <div className="flex-1 overflow-y-auto pr-4 h-[514px] mt-2 p-[6px] border border-gray-100">
          {allQuestions.map((q) => (
            <Card
              key={q.QID}
              className="mb-4 p-[10px] rounded-md border-none bg-transparent shadow-none"
            >
              <CardHeader className="p-0 mb-3">
                <CardTitle className="text-[20px] font-mono font-semibold leading-[100%] text-primary">
                  {q.Question}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <RadioGroup
                  value={q.isWrong ? q.inCorrectAnswer : q.correctAnswer}
                >
                  {/* Wrong answer (highlighted red) */}
                  {q.isWrong && q.inCorrectAnswer && (
                    <div className="flex items-center gap-2 text-sm p-4 bg-[#FEF2F2]">
                      <RadioGroupItem
                        className="text-red-600 border-red-600"
                        value={q.inCorrectAnswer}
                        id={`${q.QID}-wrong`}
                      />
                      <Label htmlFor={`${q.QID}-wrong`}>
                        {q.inCorrectAnswer}
                      </Label>
                    </div>
                  )}

                  {/* Correct answer (highlighted green) */}
                  <div className="flex items-center gap-2 text-sm p-4 bg-[#ECFDF5]">
                    <RadioGroupItem
                      className="text-green-600 border-green-600"
                      value={q.correctAnswer}
                      id={`${q.QID}-correct`}
                    />
                    <Label htmlFor={`${q.QID}-correct`}>
                      {q.correctAnswer}
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
