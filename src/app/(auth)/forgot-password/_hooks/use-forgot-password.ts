"use client";

import { useMutation } from "@tanstack/react-query";

import {
  ForgotPasswordInput,
  ResetPasswordInput,
  VerifyCodeInput,
} from "@/lib/schemes/auth.schema";
import { forgotPassword, resetPassword, verifyResetCode } from "../../_actions/auth.action";

/**
 * Hook: useForgotPassword
 * -----------------------
 * - Wraps the `forgotPassword` server action inside a mutation.
 * - Expects the user's email as input.
 * - Used in Step 1 of Forgot Password flow to request a reset code.
 */
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: ForgotPasswordInput["email"]) => forgotPassword(email),
  });
};

/**
 * Hook: useVerifyResetCode
 * ------------------------
 * - Wraps the `verifyResetCode` server action inside a mutation.
 * - Expects the reset code as input.
 * - Used in Step 2 of Forgot Password flow to verify the sent OTP/code.
 */
export const useVerifyResetCode = () => {
  return useMutation({
    mutationFn: (resetCode: VerifyCodeInput["resetCode"]) =>
      verifyResetCode(resetCode),
  });
};

/**
 * Hook: useResetPassword
 * ----------------------
 * - Wraps the `resetPassword` server action inside a mutation.
 * - Expects an object with `email` and `newPassword`.
 * - Used in Step 3 of Forgot Password flow to set the new password.
 */
export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordInput) => resetPassword(data),
  });
};
