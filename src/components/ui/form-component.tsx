"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
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
import { useRouter } from "next/navigation";
import { XCircle, Eye, EyeOff } from "lucide-react";
import { UserInput, userSchema } from "@/lib/schemes/auth.schema";
import { useEditProfile } from "@/app/(dashboard)/(account-settings)/profile/_hooks/use-edit-profile";
import toast from "react-hot-toast";
import { useDeleteMe } from "@/app/(dashboard)/(account-settings)/profile/_hooks/use-delete-acount";
import { signOut, useSession } from "next-auth/react";
import { DeleteAccountButton } from "@/app/(dashboard)/(account-settings)/profile/_component/DeleteAccountButton";
import { useRegister } from "@/app/(auth)/register/_hooks/use-register";
import { PhoneInput } from "./phone-input";
import { use, useEffect, useState } from "react";

export function FormComponent({ isProfile, isEdit }: { isProfile?: boolean; isEdit?: boolean }) {
    // States to toggle password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);

    const router = useRouter();

    const session = useSession();
    const user = session.data?.user;

    // React Hook Form setup with Zod schema validation
    const form = useForm<UserInput>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            username: user?.username || "",
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            email: user?.email || "",
            phone: user?.phone || "",
            password: undefined,
            rePassword: undefined,
        }
    });

    useEffect(() => {
        if(isProfile && isEdit) {
        form.reset({
            username: user?.username || "",
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            email: user?.email || "",
            phone: "+2"+user?.phone || "",
        });
    }
    }, [user, isProfile, isEdit,form]);


    // Mutation hook to delete account
    const deleteMutation = useDeleteMe();

    // Function to handle account deletion
    const handleDelete = () => {
        deleteMutation.mutate(undefined, {
            onSuccess: async () => {
                toast.success("Account deleted successfully!");
                await signOut({ callbackUrl: "/login" }); // redirect to login after deletion
            },
            onError: (err: any) => {
                toast.error(err.message || "Failed to delete account.");
            },
        });
    };

    // Mutation hooks for registration and profile editing
    const registerMutation = useRegister();
    const editProfileMutation = useEditProfile();

    // Form submission handler
    const onSubmit = (data: UserInput) => {
        // Normalize phone number
        let phone = data.phone || "";
        phone = phone.replace(/^(\+2|002)/, "");
        const payload = { ...data, phone };

        // Remove password fields if not provided
        if (!data.password) {
            delete payload.password;
            delete payload.rePassword;
        }

        // Determine whether to edit profile or register a new user
        if (isProfile && isEdit) {
            editProfileMutation.mutate(payload, {
                onSuccess: () => {
                    toast.success("Profile updated successfully!");
                    router.push("/profile");
                },
                onError: (err) => {
                    console.error("Profile update error:", err);
                    toast.error("Failed to update profile.");
                },
            });
        } else {
            registerMutation.mutate(payload, {
                onSuccess: () => {
                    toast.success(isProfile ? "Profile updated successfully!" : "Registration successful!");
                    router.push(isProfile ? "/profile" : "/login");
                },
                onError: (err) => {
                    console.error(isProfile ? "Profile update error:" : "Register error:", err);
                    toast.error(isProfile
                        ? "Failed to update profile."
                        : "Registration failed.");
                },
            });
        }
    };

    return (
        <div className="flex flex-col justify-center gap-10 font-sans">
            {/* Title only for registration form */}
            {!isProfile && <h1 className="font-sans font-bold text-[30px] leading-[1] pb-6">
                Create Account
            </h1>}

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={`space-y-4 ${!isProfile && "w-[452px]"} `}
                >
                    <div className="grid grid-cols-2 gap-4">
                        {/* First Name field */}
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="First Name"
                                            {...field}
                                            className={
                                                form.formState.errors.firstName
                                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                    : ""
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Last Name field */}
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Last Name"
                                            {...field}
                                            className={
                                                form.formState.errors.lastName
                                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                    : ""
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Username field */}
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Your Username"
                                        {...field}
                                        className={
                                            form.formState.errors.username
                                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                : ""
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Email field */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Your Email"
                                        {...field}
                                        className={
                                            form.formState.errors.email
                                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                : ""
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Phone number field */}
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <PhoneInput
                                        {...field}
                                        defaultCountry="EG"
                                        international
                                        countryCallingCodeEditable={false}
                                        className={`w-full rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                                             ${form.formState.errors.phone
                                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                : ""
                                            }`}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Password fields only for registration */}
                    {!isProfile && <>
                        {/* Password */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            {/* Password input with toggle visibility */}
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Password"
                                                {...field}
                                                className={
                                                    form.formState.errors.password
                                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500 pr-10"
                                                        : "pr-10"
                                                }
                                            />
                                            {/* Eye icon button */}
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Confirm Password */}
                        <FormField
                            control={form.control}
                            name="rePassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            {/* Confirm password input with toggle visibility */}
                                            <Input
                                                type={showRePassword ? "text" : "password"}
                                                placeholder="Confirm Password"
                                                {...field}
                                                className={
                                                    form.formState.errors.rePassword
                                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500 pr-10"
                                                        : "pr-10"
                                                }
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowRePassword(!showRePassword)}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            >
                                                {showRePassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                    }

                    <div className={`flex flex-col gap-9 ${isProfile ? "pt-2" : "pt-6"} `}>
                        {/* Global error alert */}
                        {(registerMutation.isError || editProfileMutation.isError) && (
                            <div className="relative w-full bg-red-50 border border-red-300 text-red-600 rounded-md p-3 h-fit">
                                <XCircle className="h-5 w-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-red-600" />
                                <p className="text-center font-mono text-[14px] leading-[100%] tracking-[0px] align-middle">
                                    {isProfile
                                        ? editProfileMutation.error instanceof Error
                                            ? editProfileMutation.error.message
                                            : "Something went wrong"
                                        : registerMutation.error instanceof Error
                                            ? registerMutation.error.message
                                            : "Something went wrong"
                                    }
                                </p>
                            </div>
                        )}

                        {/* Submit button for registration */}
                        {!isProfile && <Button
                            className="w-full h-12 bg-primary rounded-none"
                            type="submit"
                            disabled={registerMutation.isPending}
                        >
                            {registerMutation.isPending ? "Loading..." : "Create Account"}
                        </Button>}

                        {/* Buttons for profile editing */}
                        {isProfile && (
                            <div className="flex gap-4">
                                <DeleteAccountButton
                                    isPending={deleteMutation.isPending}
                                    onDelete={handleDelete}
                                />

                                <Button
                                    className="w-full h-12 bg-primary rounded-none"
                                    type="submit"
                                    disabled={editProfileMutation.isPending}
                                >
                                    {editProfileMutation.isPending ? "Loading..." : "Save Changes"}
                                </Button>
                            </div>
                        )}

                        {/* Link to login page for users who already have account */}
                        {!isProfile && <div className="pt-4 text-center">
                            <span className="font-mono font-medium text-[14px] text-muted-foreground">
                                Already have an account?{" "}
                            </span>
                            <Link
                                href="/login"
                                className="font-mono font-medium text-[14px] text-primary underline"
                            >
                                Login
                            </Link>
                        </div>}

                    </div>
                </form>
            </Form>
        </div>
    );
}
