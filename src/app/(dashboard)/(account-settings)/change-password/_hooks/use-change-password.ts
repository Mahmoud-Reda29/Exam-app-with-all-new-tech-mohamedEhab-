import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { changePassword } from "../_actions/change-password";
import { ChangePasswordInput } from "@/lib/schemes/auth.schema";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordInput) => {
      return changePassword(data);
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to change password.");
    },
  });
};
