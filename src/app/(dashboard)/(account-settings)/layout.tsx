import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../_components/sidebar";

// Page metadata
export const metadata = {
  title: "Account Settings", // Displayed in browser tab and search engines
};

// Account layout component
export default function AcountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Wrap layout with SidebarProvider for context
    <SidebarProvider className="pt-6 gap-6">
      {/* Render sidebar, not fixed */}
      <AppSidebar isfixed={false} />
      {/* Main content area */}
      <div className="flex-1 bg-white p-6">{children}</div>
    </SidebarProvider>
  );
}
