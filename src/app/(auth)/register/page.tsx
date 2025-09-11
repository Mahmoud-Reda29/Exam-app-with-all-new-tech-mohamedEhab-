import { FormComponent } from "@/components/ui/form-component";
import React from "react";

// Metadata for the Register page (SEO + OpenGraph for social sharing)
export const metadata = {
  title: "Register | Exam App",
  description:
    "Create your account on Exam App and start your learning journey with smart exams and tailored diplomas.",
  openGraph: {
    title: "Register | Exam App",
    description:
      "Create your account on Exam App and start your learning journey with smart exams and tailored diplomas.",
    url: "http://localhost:3000/register", // Page URL
    siteName: "Exam App",
    images: [
      {
        url: "https://via.placeholder.com/1200x630.png?text=register", // OpenGraph image
        width: 1200,
        height: 630,
        alt: "Exam App Register",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true, // Allow search engines to index this page
    follow: true, // Allow following links on this page
  },
};

// Register Page Component
export default function Page() {
  return (
    <div className="w-full max-w-md">
      {/* Registration form component */}
      <FormComponent />
    </div>
  );
}
