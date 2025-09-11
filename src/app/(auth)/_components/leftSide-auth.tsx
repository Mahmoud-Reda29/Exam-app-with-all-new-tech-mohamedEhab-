import {
  BookOpenCheck,
  Brain,
  FolderCode,
  RectangleEllipsis,
} from "lucide-react"; // Icon set
import Head from "next/head"; // Next.js <Head> for SEO metadata

// Features information displayed in the left sidebar
const information = [
  {
    title: "Tailored Diplomas",
    desc: "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
    icon: Brain,
  },
  {
    title: "Focused Exams",
    desc: "Access topic-specific tests including HTML, CSS, JavaScript, and more.",
    icon: BookOpenCheck,
  },
  {
    title: "Smart Multi-Step Forms",
    desc: "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
    icon: RectangleEllipsis,
  },
];

/**
 * LeftSideAuth Component
 * ----------------------
 * A sidebar for the authentication pages that introduces the exam app.
 * - Adds SEO-friendly metadata using <Head>.
 * - Displays a branded header with logo and title.
 * - Shows a headline and feature list with icons and descriptions.
 *
 * File Location: app/(auth)/_components/LeftSideAuth.tsx
 */
export default function LeftSideAuth() {
  return (
    <>
      {/* SEO Metadata */}
      <Head>
        <title>Exam App - Smart Exam Platform</title>
        <meta
          name="description"
          content="Empower your learning journey with our smart exam platform. Tailored diplomas, focused exams, and smart multi-step forms."
        />
        <meta name="robots" content="index, follow" />
      </Head>

      {/* Sidebar Section */}
      <aside
        className="flex flex-col justify-center items-center h-screen py-[116px] px-[131px] bg-[#EFF6FFBF] text-white backdrop-blur-[200px] opacity-100"
        aria-label="Exam App introduction"
      >
        <div className="w-[458px] h-[792px] flex flex-col justify-center gap-32">
          {/* Logo + App Title */}
          <header className="flex gap-3 items-center">
            <span className="text-primary" aria-hidden="true">
              <FolderCode />
            </span>
            <h1 className="geist-mono-semibold font-mono !m-0 text-primary text-lg">
              Exam App
            </h1>
          </header>

          {/* Headline + Features */}
          <main className="flex flex-col gap-[60px]">
            <h2 className="font-sans font-bold text-[30px] leading-[1] text-[#1F2937]">
              Empower your learning journey with our smart exam platform.
            </h2>

            {/* Features List */}
            <ul className="flex flex-col gap-9">
              {information.map((item, index) => (
                <li key={index} className="flex gap-5">
                  {/* Icon */}
                  <span
                    className="text-primary w-9 h-9 flex items-center justify-center border-[1.5px] border-primary aspect-square"
                    aria-hidden="true"
                  >
                    <item.icon className="w-5 h-5" />
                  </span>

                  {/* Title + Description */}
                  <div className="flex flex-col gap-[10px]">
                    <h3 className="geist-mono-semibold font-mono text-primary">
                      {item.title}
                    </h3>
                    <p className="geist-mono-regular font-mono text-black">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </main>
        </div>
      </aside>
    </>
  );
}
