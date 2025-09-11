"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

type Props = {
  isPending: boolean; // indicates if deletion is in progress
  onDelete: () => void; // callback function to execute account deletion
};

/**
 * DeleteAccountButton Component
 * -----------------------------
 * A button wrapped in a confirmation dialog to delete the user's account:
 * - Shows a "Delete My Account" button.
 * - When clicked, opens an alert dialog with warning and action buttons.
 * - User can cancel or confirm deletion.
 * - Displays loading state when the deletion is in progress.
 */
export function DeleteAccountButton({ isPending, onDelete }: Props) {
  return (
    <AlertDialog>
      {/* Trigger button for opening the alert dialog */}
      <AlertDialogTrigger asChild>
        <Button
          className="w-full h-12 bg-[#FEF2F2] text-[#DC2626] rounded-none hover:bg-red-400 hover:text-white"
          type="button"
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Delete My Account"}
        </Button>
      </AlertDialogTrigger>

      {/* Alert dialog content */}
      <AlertDialogContent>
        <AlertDialogHeader className="p-9">
          <AlertDialogTitle className="text-red-600 geist-mono-medium text-center flex flex-col justify-center items-center gap-[30px]">
            {/* Warning icon */}
            <div
              className="relative w-[110px] h-[110px] rounded-full flex items-center justify-center
                                        before:content-[''] before:absolute before:w-[110px] before:h-[110px] before:bg-[#FEF2F2] before:rounded-full
                                        after:content-[''] after:absolute after:w-[80px] after:h-[80px] after:bg-[#FEE2E2] after:rounded-full"
            >
              <TriangleAlert className="w-[50px] h-[50px] text-red-500 relative z-10" />
            </div>
            Are you sure you want to delete your account?
          </AlertDialogTitle>
          <AlertDialogDescription className="geist-mono-regular text-center">
            This action is permanent and cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Action buttons */}
        <AlertDialogFooter className="p-6 bg-[#F9FAFB] border-t-[1px] border-gray-200">
          <AlertDialogCancel className="w-[217px] h-[46px] rounded-none">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className="bg-red-600 text-white hover:bg-red-700 w-[217px] h-[46px] rounded-none"
          >
            {isPending ? "Deleting..." : "Yes, Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
