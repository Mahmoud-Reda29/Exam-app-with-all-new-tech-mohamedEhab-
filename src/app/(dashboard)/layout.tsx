/**
 * DashboardLayout
 * ----------------
 * Layout component for all dashboard pages:
 * - Provides a fixed sidebar navigation.
 * - Adds breadcrumbs, title bar, and back button for navigation clarity.
 * - Wraps children with global Providers (e.g., state management, theming).
 * - Integrates toast notifications for user feedback.
 */

import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./_components/sidebar";
import { Providers } from "../providers";
import Breadcrumbs from "./_components/breadcrumbs";
import Titlebar from "./_components/titlebar";
import BackButton from "./_components/back-button";
import ToastProvider from "@/components/providers/toast.provider";

export const metadata = {
  title: "Dashboard Pages",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // SidebarProvider keeps sidebar state accessible throughout the app
    <SidebarProvider>
      {/* Persistent sidebar navigation */}
      <AppSidebar isfixed={true} />

      {/* Main content area */}
      <main className="p-6 pt-0 flex-1 flex flex-col min-h-screen bg-gray-50">
        {/* Breadcrumbs for page hierarchy navigation */}
        <Breadcrumbs />

        {/* Header section: back navigation + page title */}
        <div className="flex items-center gap-4 mb-6">
          <BackButton />
          <Titlebar />
        </div>

        {/* Providers wrap children with global state/context */}
        <Providers>
          {children}

          {/* ToastProvider handles notifications (success/error/info) */}
          <ToastProvider />
        </Providers>
      </main>
    </SidebarProvider>
  );
}
