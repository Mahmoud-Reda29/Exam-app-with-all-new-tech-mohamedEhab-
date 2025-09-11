import React from "react";
import { ChangePasswordForm } from "./_components/change-password-form";

// Page metadata (SEO + social sharing configuration)
export const metadata = {
  title: "Change Password", // Title shown in browser tab and search engines
  description: "Update your account password securely.",
  keywords: ["change password"], // Keywords for SEO
  openGraph: {
    // OpenGraph metadata (used by Facebook, LinkedIn, etc.)
    title: "Change Password",
    description: "Update your account password securely.",
    type: "website",
    url: "http://localhost:3000/change-password",
    images: [
      {
        url: "https://via.placeholder.com/1200x630.png?text=Change+Password", // Preview image for sharing
        width: 1200,
        height: 630,
        alt: "Change Password",
      },
    ],
  },
};

// Page Component
export default function Page() {
  return (
    <div className="w-full">
      {/* Render change password form component */}
      <ChangePasswordForm />
    </div>
  );
}
