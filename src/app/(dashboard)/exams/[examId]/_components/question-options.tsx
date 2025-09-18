"use client";

import { Controller } from "react-hook-form";
import { Question } from "@/lib/types/question";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type Props = {
  control: any; // Control object from react-hook-form (manages form state)
  question: Question; // Current question object with options
};

export function QuestionOptions({ control, question }: Props) {
  return (
    <Controller
      // Bind this question’s answer to react-hook-form
      key={question._id}
      control={control}
      name={`answers.${question._id}`}
      render={({ field }) => (
        <RadioGroup
          // Controlled radio group (value comes from form state)
          value={field.value || ""}
          onValueChange={field.onChange}
          className="space-y-3"
        >
          {/* Render each possible answer as a radio button */}
          {question.answers.map((option) => (
            <div
              key={option.key}
              className="flex items-center space-x-2 p-4 geist-mono-regular h-[50px] bg-gray-50 hover:bg-gray-100 rounded-md"
            >
              {/* Single option input */}
              <RadioGroupItem
                value={option.key}
                id={`${question._id}-${option.key}`}
              />
              {/* Label for the option */}
              <Label htmlFor={`${question._id}-${option.key}`}>
                {option.answer}
              </Label>
            </div>
          ))}
        </RadioGroup>
      )}
    />
  );
}
