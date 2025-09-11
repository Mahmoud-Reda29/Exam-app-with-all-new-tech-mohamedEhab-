import { ForgotPasswordForm } from "./_components/forgot-password-form";

/**
 * Page Metadata
 * -------------
 * - Provides SEO metadata for the Forgot Password page.
 * - Includes title, description, Open Graph, and robots configuration.
 */
export const metadata = {
  title: "Forgot Password | Exam App",
  description:
    "Reset your password securely on Exam App and continue your learning journey with smart exams and tailored diplomas.",
  openGraph: {
    title: "Forgot Password | Exam App",
    description:
      "Reset your password securely on Exam App and continue your learning journey with smart exams and tailored diplomas.",
    url: "http://localhost:3000/forgot-password",
    siteName: "Exam App",
    images: [
      {
        url: "https://via.placeholder.com/1200x630.png?text=Forgot+Password",
        width: 1200,
        height: 630,
        alt: "Forgot Password - Exam App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true, // Allow indexing by search engines
    follow: true, // Allow crawling of links
  },
};

/**
 * Page Component: Forgot Password
 * -------------------------------
 * - Renders the Forgot Password form wrapped inside a responsive container.
 * - Uses `ForgotPasswordForm` to handle the 3-step flow (email → code → reset password).
 */
export default function Page() {
  return (
    <div className="w-full max-w-md">
      <ForgotPasswordForm />
    </div>
  );
}
