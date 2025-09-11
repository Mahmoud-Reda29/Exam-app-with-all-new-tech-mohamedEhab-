import { useMutation } from "@tanstack/react-query";
import { deleteAccount } from "../_actions/profile";

/**
 * useDeleteMe Hook
 * ----------------
 * A custom React Query mutation hook for deleting the current user's account.
 * - Calls the `deleteAccount` server action.
 * - Returns mutation object with `mutate`, `isLoading`, `isError`, etc.
 */
export const useDeleteMe = () => {
  return useMutation({
    mutationFn: async () => {
      return await deleteAccount();
    },
  });
};
