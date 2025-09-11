"use client";

import { LoginInput } from "@/lib/schemes/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

// Custom React Query mutation hook for handling login
export function useLogin() {
  return useMutation({
    // mutationFn defines what happens when the mutation is triggered
    mutationFn: async (data: LoginInput) => {
      // Call NextAuth signIn with "credentials" provider
      const res = await signIn("credentials", {
        redirect: false, // Prevent automatic redirect, handle it manually
        email: data.email,
        password: data.password,
      });

      // If NextAuth returns an error, throw it so React Query can handle it
      if (res?.error) {
        throw new Error(res.error);
      }

      // Return successful response (session info, status, etc.)
      return res;
    },
  });
}
