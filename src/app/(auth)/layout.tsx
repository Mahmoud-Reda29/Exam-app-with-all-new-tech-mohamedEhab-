import React from "react";
import LeftSideAuth from "./_components/leftSide-auth";

// Page metadata (used by Next.js for SEO and browser tab title)
export const metadata = {
  title: "Auth Pages",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode; // This will hold the child components (e.g., login/register forms)
}) {
  return (
    <main className="flex h-screen backdrop-blur-[200px]">
      {/* Left side (usually branding, images, or extra info for auth pages) */}
      <aside className="w-6/12">
        <LeftSideAuth />
      </aside>

      {/* Right side (main authentication form area) */}
      <section
        className="flex justify-center items-center w-6/12"
        aria-label="Authentication Form" // Accessibility label for screen readers
      >
        {children}
      </section>
    </main>
  );
}
