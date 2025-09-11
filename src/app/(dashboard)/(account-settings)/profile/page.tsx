import { FormComponent } from "@/components/ui/form-component";
import type { Metadata } from "next";

/**
 * Page Metadata
 * -------------
 * SEO and social sharing configuration for the Edit Profile page.
 */
export const metadata: Metadata = {
  title: "Edit Profile", // Browser tab title
  description: "Update your profile information and settings.", // Meta description
  keywords: ["profile", "edit profile", "user settings"], // Meta keywords
  openGraph: {
    title: "Edit Profile", // OpenGraph title
    description: "Update your profile information and settings.", // OpenGraph description
    type: "website",
    url: "https://yourdomain.com/profile/edit", // Page URL
    images: [
      {
        url: "https://yourdomain.com/images/profile-og.png", // OG image
        width: 1200,
        height: 630,
        alt: "Edit Profile",
      },
    ],
  },
};

/**
 * Page Component
 * --------------
 * Renders the profile edit form with edit mode enabled.
 */
export default function Page() {
  return <FormComponent isProfile={true} isEdit={true} />;
}
