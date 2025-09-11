"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

// Define props for the BackButton component
type BackButtonProps = {
  fallback?: string; // Fallback path if no history is available
  variant?: React.ComponentProps<typeof Button>["variant"]; // Pass variant style for the Button
  size?: React.ComponentProps<typeof Button>["size"]; // Pass size style for the Button
};

export default function BackButton({
  fallback = "/", // Default fallback route is homepage
  variant = "outline", // Default button variant
  size = "sm", // Default button size
}: BackButtonProps) {
  const router = useRouter();

  // Handle button click: go back if history exists, otherwise redirect to fallback
  const handleClick = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back(); // Navigate to previous page
    } else {
      router.push(fallback); // Navigate to fallback route
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      size={size}
      className="w-[38px] flex justify-center items-center h-full border-primary rounded-none"
    >
      {/* Chevron left icon to indicate 'back' action */}
      <ChevronLeft className="h-6 w-6 text-primary" />
    </Button>
  );
}
