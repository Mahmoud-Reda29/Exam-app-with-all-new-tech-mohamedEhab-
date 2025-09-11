/**
 * useChangePassword Hook
 * ----------------------
 * A custom React Query hook to handle changing the user's password.
 *
 * Features:
 * - Calls the `changePassword` server action when triggered.
 * - Shows a success toast message on successful password change.
 * - Shows an error toast message if the operation fails.
 *
 * Usage:
 * const changePasswordMutation = useChangePassword();
 * changePasswordMutation.mutate({ oldPassword, password, rePassword });
 */
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { changePassword } from "../_actions/change-password";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword, // Function that performs the password change
    onSuccess: () => {
      toast.success("Password changed successfully!"); // Notify user on success
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to change password."); // Notify user on error
    },
  });
};
