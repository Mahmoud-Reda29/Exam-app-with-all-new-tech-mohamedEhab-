"use server";

import { getAccessToken } from "@/lib/utils/auth.util";
import { UserInput } from "@/lib/schemes/auth.schema";

/**
 * Edit user profile
 * -----------------
 * Sends a PUT request to update user profile data.
 * Requires a valid access token for authentication.
 * @param data UserInput - new user data to update
 * @returns updated user data in JSON
 * @throws Error if request fails
 */
export async function editProfile(data: UserInput) {
  const token = await getAccessToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/auth/editProfile`,
    {
      headers: {
        token: token || "",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to update profile");
  }

  return res.json();
}

/**
 * Delete user account
 * -------------------
 * Sends a DELETE request to remove the current user's account.
 * Requires a valid access token for authentication.
 * @returns confirmation JSON
 * @throws Error if request fails
 */
export async function deleteAccount() {
  const token = await getAccessToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/deleteMe`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token: token || "",
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to delete account");
  }

  return res.json();
}
