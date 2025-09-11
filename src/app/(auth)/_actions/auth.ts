"use server";
// Next.js directive to ensure this file runs on the server side

import {
  ForgotPasswordInput,
  ResetPasswordInput,
  UserInput,
  VerifyCodeInput,
} from "@/lib/schemes/auth.schema";
// Importing TypeScript types (schemas) for input validation

/**
 * Forgot Password
 * Sends a request to the API to trigger a reset password email/code.
 */
export async function forgotPassword(email: ForgotPasswordInput["email"]) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/auth/forgotPassword`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }), // Send email in request body
    }
  );

  // Handle API errors
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to send reset code");
  }

  return res.json(); // Return successful response
}

/**
 * Verify Reset Code
 * Validates if the provided reset code is correct and still valid.
 */
export async function verifyResetCode(resetCode: VerifyCodeInput["resetCode"]) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/auth/verifyResetCode`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resetCode }), // Send reset code in request body
    }
  );

  // Handle API errors
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Invalid or expired reset code");
  }

  return res.json(); // Return successful response
}

/**
 * Reset Password
 * Updates the user's password using the provided email and new password.
 */
export async function resetPassword(data: ResetPasswordInput) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/auth/resetPassword`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        newPassword: data.newPassword, // New password sent in request
      }),
    }
  );

  // Handle API errors
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to reset password");
  }

  return res.json(); // Return successful response
}

/**
 * Register User
 * Creates a new user account by sending registration data to the API.
 */
export async function registerAction(data: UserInput) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Send user data in request body
    });

    // Handle API errors
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    return await res.json(); // Return successful response
  } catch (err: any) {
    // Catch any unexpected errors
    throw new Error(err.message || "Failed to register");
  }
}
