import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .email("Invalid email")
        .nonempty("Email is required"),
    password: z
        .string()
        .nonempty("Password is required")
        .min(6, "Password must be at least 6 chars"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
    .object({
        username: z.string().nonempty("Username is required"),
        firstName: z.string().nonempty("First name is required"),
        lastName: z.string().nonempty("Last name is required"),
        email: z.email("Invalid email").nonempty("Email is required"),
        password: z
            .string()
            .min(6, "Password must be at least 6 chars"),
        rePassword: z.string(),
        phone: z
            .string()
            .nonempty("Phone is required")
            .regex(/^\+\d{6,15}$/, "Invalid phone number"),
    })
    .refine(
        (data) =>
            !data.password || !data.rePassword || data.password === data.rePassword,
        {
            message: "Passwords don't match",
            path: ["rePassword"],
        }
    );

export type RegisterInput = z.infer<typeof registerSchema>;


export const forgotPasswordSchema = loginSchema.pick({ email: true });
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const verifyCodeSchema = z.object({
    resetCode: z.string().nonempty("Reset code is required"),
});
export type VerifyCodeInput = z.infer<typeof verifyCodeSchema>;

export const resetPasswordSchema = z
  .object({
    email: z
      .string()
      .email("Invalid email")
      .nonempty("Email is required"),
    newPassword: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
      ),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;



export const changePasswordSchema = z
    .object({
        oldPassword: z.string().min(6, "Current password is required"),
        password: z.string().min(6, "New password must be at least 6 characters"),
        rePassword: z.string().min(6, "Confirm your new password"),
    })
    .refine((data) => data.password === data.rePassword, {
        path: ["rePassword"],
        message: "Passwords do not match",
    });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;


export const userSchema = z
    .object({
        username: z.string().nonempty("Username is required"),
        firstName: z.string().nonempty("First name is required"),
        lastName: z.string().nonempty("Last name is required"),
        email: z.email("Invalid email").nonempty("Email is required"),
        phone: z.string()
            .nonempty("Phone is required")
            .regex(/^\+\d{6,15}$/, "Invalid phone number"),
        password: z.string().min(6, "Password must be at least 6 chars").optional(),
        rePassword: z.string().optional(),
    })
    .refine(
        (data) =>
            !data.password && !data.rePassword ? true : data.password === data.rePassword,
        {
            message: "Passwords don't match",
            path: ["rePassword"],
        }
    );


export type UserInput = z.infer<typeof userSchema>;
