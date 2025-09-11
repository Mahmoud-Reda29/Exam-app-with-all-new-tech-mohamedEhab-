import { Suspense } from "react";
import LoadingSubjects from "./loading";
import SubjectsList from "./_components/subjects-list";
import { fetchSubjects } from "@/lib/apis/diplomas.api";
import type { Metadata } from "next";

/**
 * Page Metadata
 * -------------
 * SEO and OpenGraph settings for the Diploma Subjects page.
 */
export const metadata: Metadata = {
  title: "Diploma Subjects", // Browser tab title
  description: "Browse the list of available diploma subjects and details.", // Meta description
  keywords: ["diploma", "subjects", "education", "courses"], // Meta keywords
  openGraph: {
    title: "Diploma Subjects", // OpenGraph title
    description: "Browse the list of available diploma subjects and details.", // OpenGraph description
    type: "website",
    url: "http://localhost:3000/diploma", // Page URL
    images: [
      {
        url: "http://localhost:3000/images/diploma-og.png", // OG image
        width: 1200,
        height: 630,
        alt: "Diploma Subjects",
      },
    ],
  },
};

/**
 * Page Component
 * --------------
 * Fetches diploma subjects and renders the SubjectsList component.
 * Uses React Suspense with a loading fallback component.
 */
export default async function Page() {
  const data = await fetchSubjects();

  return (
    <Suspense fallback={<LoadingSubjects />}>
      <SubjectsList
        subjects={data.subjects}
        metadata={data.metadata}
        message={data.message}
      />
    </Suspense>
  );
}
