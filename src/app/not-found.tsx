"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * NotFound Component
 * -----------------
 * - Displays a 404 page when the requested route does not exist.
 * - Shows a user-friendly message.
 * - Provides a button to navigate back to the home page.
 */
export default function NotFound() {
  return (
    <html>
      <body className="flex items-center justify-center h-screen bg-muted">
        <Card className="max-w-md w-full shadow-lg text-center">
          <CardHeader>
            <CardTitle className="text-red-600 text-2xl">
              404 - Page Not Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Sorry, the page you are looking for does not exist.
            </p>
            {/* Navigate back to home page */}
            <Link href="/">
              <Button variant="default">Go Home</Button>
            </Link>
          </CardContent>
        </Card>
      </body>
    </html>
  );
}
