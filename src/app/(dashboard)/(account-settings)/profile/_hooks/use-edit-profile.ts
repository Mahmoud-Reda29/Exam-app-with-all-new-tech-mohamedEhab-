import { useMutation } from "@tanstack/react-query";
import { UserInput } from "@/lib/schemes/auth.schema";
import { editProfile } from "../_actions/profile.action";

/**
 * useEditProfile Hook
 * -------------------
 * A React Query mutation hook for updating the user's profile.
 * - Accepts `UserInput` data to send to the server.
 * - Calls the `editProfile` server action.
 * - Returns mutation object containing `mutate`, `isLoading`, `isError`, etc.
 */
export const useEditProfile = () => {
  return useMutation({
    mutationFn: async (data: UserInput) => {
      return await editProfile(data);
    },
  });
};
