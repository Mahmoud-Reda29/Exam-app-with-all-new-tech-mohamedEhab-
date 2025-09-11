"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  useForgotPassword,
  useVerifyResetCode,
  useResetPassword,
} from "@/app/(auth)/forgot-password/_hooks/use-forgot-password";
import {
  ForgotPasswordInput,
  forgotPasswordSchema,
  ResetPasswordInput,
  resetPasswordSchema,
  VerifyCodeInput,
  verifyCodeSchema,
} from "@/lib/schemes/auth.schema";
import Image from "next/image";
import Link from "next/link";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import CountdownTimer from "../../../../components/shared/countdownTimer";
import { useCountdownStore } from "@/store/useCountdownStore";
import { useRouter } from "next/navigation";

/**
 * ForgotPasswordForm Component
 * ----------------------------
 * Multi-step form to handle password recovery:
 * 1) Step 1: User enters email → sends reset code.
 * 2) Step 2: User verifies reset code → continues if valid.
 * 3) Step 3: User sets a new password → redirects to login on success.
 *
 * Features:
 * - Validation using zod + react-hook-form.
 * - API integration using custom hooks (mutations).
 * - Countdown timer for resend functionality.
 */
export function ForgotPasswordForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1); // Track form step
  const startCountdown = useCountdownStore((s) => s.startCountdown);
  const router = useRouter();

  // Mutations for each step
  const forgotPasswordMutation = useForgotPassword();
  const verifyResetCodeMutation = useVerifyResetCode();
  const resetPasswordMutation = useResetPassword();

  // Forms with validation
  const emailForm = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const codeForm = useForm<VerifyCodeInput>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: { resetCode: "" },
  });

  const resetForm = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: "", newPassword: "" },
  });

  // Step 1: Submit email → trigger forgot password API
  const handleEmailSubmit = (data: ForgotPasswordInput) => {
    forgotPasswordMutation.mutate(data.email, {
      onSuccess: () => {
        startCountdown(60); // Start 60s countdown
        setStep(2); // Move to next step
      },
    });
  };

  // Step 2: Submit reset code → verify API
  const handleCodeSubmit = (data: VerifyCodeInput) => {
    verifyResetCodeMutation.mutate(data.resetCode, {
      onSuccess: () => {
        setStep(3);
      },
    });
  };

  // Step 3: Submit new password → reset password API
  const handleResetSubmit = (data: ResetPasswordInput) => {
    resetPasswordMutation.mutate(data, {
      onSuccess: () => {
        router.push("/login"); // Redirect on success
      },
    });
  };

  // Reset form state when step changes
  useEffect(() => {
    if (step !== 1) emailForm.reset();
    if (step !== 2) codeForm.reset();
    if (step !== 3) resetForm.reset();
  }, [step]);

  return (
    <div className="flex flex-col justify-center gap-10 font-sans">
      {/* ---------------- STEP 1: Email Input ---------------- */}
      {step === 1 && (
        <Form {...emailForm}>
          <div className="flex flex-col gap-10">
            {/* Header */}
            <div className="flex flex-col gap-3">
              <h1 className="font-bold text-[30px] leading-[1] ">
                Forgot Password
              </h1>
              <h2 className="font-mono text-[16px] text-[#6B7280]">
                Don’t worry, we will help you recover your <br /> account.
              </h2>
            </div>

            {/* Email Form */}
            <form
              onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
              className="space-y-10 w-[452px]"
            >
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="font-mono font-medium text-base">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="user@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    {/* Error Handling */}
                    {forgotPasswordMutation.isError && (
                      <p className="text-sm text-red-500 mt-1">
                        {forgotPasswordMutation.error instanceof Error
                          ? forgotPasswordMutation.error.message
                          : "Something went wrong"}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-primary flex items-center justify-center gap-2 font-mono"
                disabled={forgotPasswordMutation.isPending}
              >
                {forgotPasswordMutation.isPending ? (
                  "Loading..."
                ) : (
                  <>
                    <span>Continue</span>
                    <Image
                      src="/images/move-right.png"
                      alt="Continue Icon"
                      width={18}
                      height={18}
                    />
                  </>
                )}
              </Button>

              {/* Link to Register */}
              <div className="text-center !mt-9">
                <span className="font-mono text-[14px] text-muted-foreground">
                  Don’t have an account?{" "}
                </span>
                <Link
                  href="/register"
                  className="font-mono text-[14px] text-primary"
                >
                  Create yours
                </Link>
              </div>
            </form>
          </div>
        </Form>
      )}

      {/* ---------------- STEP 2: Verify Code ---------------- */}
      {step === 2 && (
        <Form {...codeForm}>
          <div className="flex flex-col gap-10">
            {/* Back Button */}
            <span
              onClick={() => setStep(1)}
              className="border w-fit p-2 cursor-pointer"
            >
              <Image
                src="/images/move-left.png"
                alt="Previous Icon"
                width={24}
                height={24}
              />
            </span>

            {/* Header */}
            <div className="flex flex-col gap-3">
              <h1 className="font-bold text-[30px] leading-[1] ">
                Forgot Password
              </h1>
              <h2 className="font-mono text-[16px] text-[#6B7280]">
                Please enter the 6-digits code we have sent to:
              </h2>
              <p className="font-mono text-[16px] text-gray-600">
                user@example.com.{" "}
                <span className="underline text-primary cursor-pointer">
                  Edit
                </span>
              </p>
            </div>

            {/* Code Form */}
            <form
              onSubmit={codeForm.handleSubmit(handleCodeSubmit)}
              className="space-y-10 w-[452px]"
            >
              <FormField
                control={codeForm.control}
                name="resetCode"
                render={({ field }) => (
                  <FormItem className="font-mono font-medium text-base">
                    <FormControl>
                      {/* OTP Input */}
                      <InputOTP
                        maxLength={6}
                        value={field.value}
                        onChange={field.onChange}
                        className="w-full flex gap-2"
                      >
                        <InputOTPGroup className="w-full flex justify-center gap-[10px]">
                          {[...Array(6)].map((_, index) => (
                            <InputOTPSlot
                              key={index}
                              index={index}
                              className="w-10 h-10 border border-gray-300 text-center font-mono focus:border-primary"
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                    {/* Error Handling */}
                    {verifyResetCodeMutation.isError && (
                      <p className="text-sm text-red-500 mt-1">
                        {verifyResetCodeMutation.error instanceof Error
                          ? verifyResetCodeMutation.error.message
                          : "Something went wrong"}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              {/* Countdown Timer */}
              <CountdownTimer />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-primary font-mono"
                disabled={verifyResetCodeMutation.isPending}
              >
                {verifyResetCodeMutation.isPending
                  ? "Loading..."
                  : "Verify Code"}
              </Button>

              {/* Link to Register */}
              <div className="text-center !mt-9">
                <span className="font-mono text-[14px] text-muted-foreground">
                  Don’t have an account?{" "}
                </span>
                <Link
                  href="/register"
                  className="font-mono text-[14px] text-primary"
                >
                  Create yours
                </Link>
              </div>
            </form>
          </div>
        </Form>
      )}

      {/* ---------------- STEP 3: Reset Password ---------------- */}
      {step === 3 && (
        <Form {...resetForm}>
          {/* Back Button */}
          <span
            onClick={() => setStep(2)}
            className="border w-fit p-2 cursor-pointer"
          >
            <Image
              src="/images/move-left.png"
              alt="Previous Icon"
              width={24}
              height={24}
            />
          </span>

          {/* Header */}
          <div className="flex flex-col gap-3">
            <h1 className="font-bold text-[30px] leading-[1] ">
              Create a New Password
            </h1>
            <h2 className="font-mono text-[16px] text-[#6B7280]">
              Create a new strong password for your account.
            </h2>
          </div>

          {/* Reset Password Form */}
          <form
            onSubmit={resetForm.handleSubmit(handleResetSubmit)}
            className="flex flex-col gap-4 w-[452px] font-mono"
          >
            {/* Email Field */}
            <FormField
              control={resetForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="user@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* New Password Field */}
            <FormField
              control={resetForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="New password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  {/* Error Handling */}
                  {resetPasswordMutation.isError && (
                    <p className="text-sm text-red-500 mt-1">
                      {resetPasswordMutation.error instanceof Error
                        ? resetPasswordMutation.error.message
                        : "Something went wrong"}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 !mt-6 bg-primary font-mono"
              disabled={resetPasswordMutation.isPending}
            >
              {resetPasswordMutation.isPending
                ? "Loading..."
                : "Update Password"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
