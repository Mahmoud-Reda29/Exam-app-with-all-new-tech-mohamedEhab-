/**
 * checkAnswersAction
 * -------------------
 * Server action to validate exam answers:
 * - Retrieves the access token for authentication.
 * - Sends a POST request with the answers payload to the API.
 * - Throws an error if the API response is not successful.
 * - Returns the JSON result containing evaluation data.
 */
"use server";

import { getAccessToken } from "@/lib/utils/auth.util";
import { AnswerPayload } from "@/lib/types/exams";

export const checkAnswersAction = async (payload: AnswerPayload) => {
  const token = await getAccessToken();
  console.log(token);

  const res = await fetch(
    `${process.env.API}/questions/check`,
    {
      method: "POST",
      headers: {
        token: token || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to check answers");
  }

  return res.json();
};
