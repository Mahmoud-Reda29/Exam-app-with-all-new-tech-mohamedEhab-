"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { XCircle } from "lucide-react";
import {
  ChangePasswordInput,
  changePasswordSchema,
} from "@/lib/schemes/auth.schema";
import { useChangePassword } from "../_hooks/use-change-password";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";

export function ChangePasswordForm() {
  const form = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      rePassword: "",
    },
  });

  const changePasswordMutation = useChangePassword();

  const onSubmit = (data: ChangePasswordInput) => {
    changePasswordMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Password changed successfully. Please login again.");
        signOut({ callbackUrl: "/login" });
      },
    });
  };

  return (
    <div className="flex flex-col justify-center gap-10 font-sans ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-10 geist-mono-medium text-[16px]"
        >
          {/* Current Password Field */}
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter current password"
                    {...field}
                    className={
                      form.formState.errors.oldPassword
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* New Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    {...field}
                    className={
                      form.formState.errors.password
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm New Password Field */}
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Re-enter new password"
                    {...field}
                    className={
                      form.formState.errors.rePassword
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Display general error message if mutation fails */}
          {changePasswordMutation.isError && (
            <div className="relative w-full bg-red-50 border border-red-300 text-red-600 rounded-md p-3 h-fit">
              <XCircle className="h-5 w-5 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-red-600" />
              <p className="text-center font-mono text-[14px]">
                {changePasswordMutation.error instanceof Error
                  ? changePasswordMutation.error.message
                  : "Something went wrong"}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            className="w-full h-12 bg-primary rounded-none"
            type="submit"
            disabled={changePasswordMutation.isPending}
          >
            {changePasswordMutation.isPending
              ? "Loading..."
              : "Update Password"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
