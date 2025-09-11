"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * GlobalError Component
 * ---------------------
 * A client-side error boundary UI for catching unhandled errors:
 * - Logs the error to the console.
 * - Displays a styled card with the error message.
 * - Provides a "Try again" button that calls the `reset` function
 *   to reattempt rendering the failed UI.
 *
 * Props:
 * - error: The caught error object (may include digest info).
 * - reset: Function to reset/retry the rendering process.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Log the error to the console for debugging
  useEffect(() => {
    console.error("Global error caught:", error);
  }, [error]);

  return (
    <html>
      <body className="flex items-center justify-center h-screen bg-muted">
        <Card className="max-w-md w-full shadow-lg">
          <CardHeader>
            <CardTitle className="text-red-600">
              Something went wrong!
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Display error message */}
            <p className="text-sm text-muted-foreground mb-4">
              {error.message || "An unexpected error occurred."}
            </p>

            {/* Retry button */}
            <Button variant="default" onClick={() => reset()}>
              Try again
            </Button>
          </CardContent>
        </Card>
      </body>
    </html>
  );
}
