"use client";

import {
  CircleUserRound,
  EllipsisVertical,
  FolderCode,
  GraduationCap,
  Lock,
  LogOut,
  UserRound,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Sidebar menu items (dynamic depending on "isfixed")
const normalItems = [
  { title: "Profile", url: "/profile", icon: CircleUserRound },
  { title: "Change Password", url: "/change-password", icon: Lock },
];

const fixedItems = [
  { title: "Diplomas", url: "/", icon: GraduationCap },
  { title: "Account Settings", url: "/profile", icon: UserRound },
];

export function AppSidebar({ isfixed }: { isfixed?: boolean }) {
  const { data: session } = useSession(); // Get user session from NextAuth
  const pathname = usePathname(); // Current path for active state

  // Decide which menu items to render
  const items = isfixed ? fixedItems : normalItems;

  return (
    <Sidebar
      isfixed={isfixed}
      className={`${isfixed ? "w-[362px]" : "w-[282px]"}`}
    >
      <div
        className={`${
          isfixed ? "p-10 bg-[#EFF6FF]" : "p-6 bg-white border-none"
        } flex flex-col h-full `}
      >
        {/*  Show logo + app name only if sidebar is fixed */}
        {isfixed && (
          <SidebarHeader>
            <div className="flex items-center justify-between">
              <Image
                src="/images/FinalLogo1.png"
                alt="Logo"
                width={192}
                height={37}
              />
            </div>
            <div className="flex gap-3 items-center">
              <span className="text-primary" aria-hidden="true">
                <FolderCode />
              </span>
              <h1 className="geist-mono-semibold font-mono !m-0 text-primary text-lg">
                Exam App
              </h1>
            </div>
          </SidebarHeader>
        )}

        {/*  Menu items section */}
        <SidebarContent className={`flex-1 ${isfixed && "mt-15"}`}>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  let isActive = false;

                  // Define "active state" depending on current pathname
                  if (item.title === "Diplomas") {
                    isActive =
                      pathname === "/" || pathname.startsWith("/exams");
                  }
                  if (item.title === "Account Settings") {
                    isActive =
                      pathname.startsWith("/profile") ||
                      pathname.startsWith("/change-password");
                  }
                  if (item.title === "Profile") {
                    isActive = pathname.startsWith("/profile");
                  }
                  if (item.title === "Change Password") {
                    isActive = pathname.startsWith("/change-password");
                  }

                  return (
                    <SidebarMenuItem
                      key={item.title}
                      className={`p-4 border text-primary geist-mono-regular
                      ${
                        isActive
                          ? "border-blue-500 bg-[#DBEAFE]"
                          : "border-transparent"
                      } `}
                    >
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          className="flex w-full h-full items-center gap-2"
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/*  Footer (user info + logout) */}
        <SidebarFooter>
          <SidebarMenu>
            {isfixed && (
              <SidebarMenuItem>
                {/* Dropdown with account + logout (when sidebar fixed) */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="p-0 rounded-none flex items-center h-[54px]">
                      {/* User avatar */}
                      <div className="relative w-[54px] h-[54px] overflow-hidden border-2 border-primary shrink-0">
                        <Image
                          src={
                            "/images/cb9358d489b7d9a2fbcfd109b058718b5287b696.jpg"
                          }
                          alt="User Avatar"
                          width={54}
                          height={54}
                          className="object-cover w-[54px] h-[54px]"
                        />
                      </div>

                      {/* User info */}
                      <div className="flex flex-col text-left ml-3 overflow-hidden">
                        <span className="font-semibold truncate">
                          {session?.user?.firstName || "Guest"}
                        </span>
                        <p className="text-sm text-muted-foreground truncate">
                          {session?.user?.email || "No email"}
                        </p>
                      </div>

                      <EllipsisVertical className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>

                  {/* Dropdown menu content */}
                  <DropdownMenuContent
                    side="top"
                    className="w-[--radix-popper-anchor-width]"
                  >
                    <Link href="/profile">
                      <DropdownMenuItem className="p-4">
                        <UserRound size={16} strokeWidth={1.5} />
                        Account
                      </DropdownMenuItem>
                    </Link>

                    {/* Logout button inside dropdown */}
                    <DropdownMenuItem
                      className="p-4 text-[#DC2626]"
                      onClick={() => signOut()}
                    >
                      <LogOut
                        size={16}
                        strokeWidth={1.5}
                        className="transform -scale-x-100 mr-2"
                      />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            )}

            {/* Logout button directly (when sidebar is not fixed) */}
            {!isfixed && (
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="text-[#DC2626] p-4 flex items-center bg-[#FEF2F2]"
                  onClick={() => signOut()}
                >
                  <LogOut
                    size={20}
                    strokeWidth={1.5}
                    className="transform -scale-x-100 mr-2"
                  />
                  Logout
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
