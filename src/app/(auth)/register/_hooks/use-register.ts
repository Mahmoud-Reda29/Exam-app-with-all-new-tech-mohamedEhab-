"use client";

import { useMutation } from "@tanstack/react-query";
import { UserInput } from "@/lib/schemes/auth.schema";
import { registerAction } from "../../_actions/auth.action";


// Custom hook to handle user registration logic
export const useRegister = () => {
  return useMutation({
    // mutationFn is the function that will be executed when we call mutate()
    mutationFn: async (data: UserInput) => {
      // Calls the server action to register a new user
      return await registerAction(data);
    },
  });
};
