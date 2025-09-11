import React from "react";
import { LoginForm } from "./_components/login-form";

// Page metadata (SEO + social sharing configuration)
export const metadata = {
  title: "Login | Exam App", // Title shown in browser tab and search engines
  description:
    "Login to Exam App and empower your learning journey with smart exams and tailored diplomas.",
  openGraph: {
    // OpenGraph metadata (used by Facebook, LinkedIn, etc.)
    title: "Login | Exam App",
    description:
      "Login to Exam App and empower your learning journey with smart exams and tailored diplomas.",
    url: "http://localhost:3000/login",
    siteName: "Exam App",
    images: [
      {
        url: "https://via.placeholder.com/1200x630.png?text=login", // Preview image for sharing
        width: 1200,
        height: 630,
        alt: "Exam App Login",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true, // Allow search engines to index this page
    follow: true, // Allow following links from this page
  },
};

// Page Component
export default function Page() {
  return (
    <div className="w-full max-w-md">
      {/* Render login form component */}
      <LoginForm />
    </div>
  );
}
