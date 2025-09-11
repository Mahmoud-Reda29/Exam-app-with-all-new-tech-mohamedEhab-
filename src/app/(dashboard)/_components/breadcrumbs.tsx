"use client";

import { usePathname } from "next/navigation";
import { useExamStore } from "@/store/useExamStore";

export default function Breadcrumbs() {
  const pathname = usePathname(); // Get current path from Next.js router
  const segments = pathname.split("/").filter(Boolean); // Split path into segments and remove empty values
  const { quizTitle } = useExamStore(); // Get quiz title from global store

  return (
    <p className="geist-mono-regular text-[#9CA3AF] p-4">
      {/* If no segments, display "Home" */}
      {segments.length === 0 ? (
        "Home"
      ) : (
        <>
          {/* Always start with "Home" */}
          <span className="capitalize">Home</span>

          {/* Map through each segment to build breadcrumb */}
          {segments.map((seg, idx) => {
            const isLast = idx === segments.length - 1; // Check if it's the last segment

            // Case 1: If segment is "exams" and it's the last part → highlight it
            if (seg === "exams" && isLast) {
              return (
                <span key={seg}>
                  {" / "}
                  <span className="text-primary capitalize">{seg}</span>
                </span>
              );
            }

            // Case 2: If last segment but inside "exams" path → show quiz title + "Questions"
            if (isLast && segments.includes("exams")) {
              return (
                <span key={seg}>
                  {" / "}
                  <span className="text-primary capitalize">
                    {quizTitle} / Questions
                  </span>
                </span>
              );
            }

            // Default: render normal breadcrumb, highlight only the last one
            return (
              <span key={seg}>
                {" / "}
                <span className={`capitalize ${isLast ? "text-primary" : ""}`}>
                  {seg}
                </span>
              </span>
            );
          })}
        </>
      )}
    </p>
  );
}
