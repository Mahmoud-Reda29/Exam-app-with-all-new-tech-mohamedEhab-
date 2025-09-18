"use client"; // Marks this component as a client-side component in Next.js

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }; // `error` object includes details about the error
  reset: () => void; // `reset` function allows retrying the rendering
}) {
  // Navigation
  const router = useRouter(); // Next.js navigation hook for client-side routing

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      {/* Error title */}
      <h2 className="text-2xl font-semibold text-red-600">
        Something went wrong!
      </h2>

      {/* Show the actual error message */}
      <p className="text-gray-600">{error.message}</p>

      {/* Action buttons */}
      <div className="flex space-x-2">
        {/* Retry rendering the component/route */}
        <Button variant="outline" onClick={() => reset()}>
          Try Again
        </Button>

        {/* Navigate user back to the login page */}
        <Button onClick={() => router.push("/login")}>Go to Login</Button>
      </div>
    </div>
  );
}
