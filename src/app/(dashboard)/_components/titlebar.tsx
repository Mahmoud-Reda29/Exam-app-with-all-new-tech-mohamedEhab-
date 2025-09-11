"use client";

import { usePathname } from "next/navigation";
import {
  BookOpenCheck,
  CircleQuestionMark,
  GraduationCap,
  UserRound,
} from "lucide-react";
import React from "react";
import { useExamStore } from "@/store/useExamStore";

// List of possible navigation items (not directly used but can be helpful for mapping in the future)
const items = [
  { title: "Diplomas", url: "/", icon: GraduationCap },
  { title: "Account Settings", url: "/account-settings", icon: UserRound },
  { title: "Exams", url: "/exams", icon: BookOpenCheck },
];

export default function Titlebar() {
  const pathname = usePathname(); // Get current route path
  const { quizTitle } = useExamStore(); // Get quiz title from global store

  // Default values
  let title = "Account Settings";
  let Icon = CircleQuestionMark;

  // Update title and icon based on pathname
  if (!pathname || pathname === "/") {
    // Home page
    title = "Diplomas";
    Icon = GraduationCap;
  } else if (pathname.toLowerCase() === "/exams") {
    // Exams main page
    title = "Exams";
    Icon = BookOpenCheck;
  } else if (pathname.toLowerCase().startsWith("/exams/")) {
    // Inside a specific exam → show quiz title with fallback
    title = `[${quizTitle || "Quiz"}] Questions`;
    Icon = BookOpenCheck;
  }

  return (
    // Title bar container
    <div className="flex items-center gap-4 p-4 bg-primary geist-mono-semibold text-white flex-1">
      {/* Dynamic icon */}
      <Icon className="w-11 h-11 text-white" />
      {/* Dynamic title */}
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
}
