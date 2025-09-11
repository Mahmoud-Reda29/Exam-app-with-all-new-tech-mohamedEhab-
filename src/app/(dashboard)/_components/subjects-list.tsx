"use client";

import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Subject, SubjectsResponse } from "@/types/subject";
import Link from "next/link";

// Component to display subjects with infinite scrolling
export default function SubjectsList({ subjects, metadata }: SubjectsResponse) {
  // State to keep track of displayed subjects
  const [displayed, setDisplayed] = useState<Subject[]>([]);
  // State to check if more subjects are available
  const [hasMore, setHasMore] = useState(true);
  // Number of items per page
  const ITEMS_PER_PAGE = 6;

  // Initialize displayed subjects when `subjects` changes
  useEffect(() => {
    setDisplayed(subjects.slice(0, ITEMS_PER_PAGE));
  }, [subjects]);

  // Function to load more subjects when scrolling
  const fetchMoreData = () => {
    const nextIndex = displayed.length; // current index
    const nextSubjects = subjects.slice(nextIndex, nextIndex + ITEMS_PER_PAGE); // get next subjects
    setDisplayed((prev) => [...prev, ...nextSubjects]); // append to displayed list

    // If we reached the metadata limit OR the end of the subjects list, stop fetching
    if (
      displayed.length + nextSubjects.length >= metadata.limit ||
      nextIndex + ITEMS_PER_PAGE >= subjects.length
    ) {
      setHasMore(false);
    }
  };

  return (
    <InfiniteScroll
      dataLength={displayed.length} // current number of items displayed
      next={fetchMoreData} // function to load more data
      hasMore={hasMore} // determines if more items should load
      loader={
        // Loader shown while fetching more items
        <div className="flex flex-col items-center justify-center p-2 gap-1 my-6">
          <h4 className="text-center geist-mono-regular text-[#4B5563]">
            Scroll to view more
          </h4>
          <ChevronDown className="animate-bounce text-[#cbcfd5]" />
        </div>
      }
      endMessage={
        // Message when no more items are available
        <p className="text-center geist-mono-regular py-4 text-[#4B5563]">
          No more subjects
        </p>
      }
    >
      {/* Grid layout for subjects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 py-6">
        {displayed.map((subject) => (
          <Link key={subject._id} href={`/exams`} className="group">
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition h-fit relative">
              <CardContent className="p-0">
                <div className="relative w-full h-[448px]">
                  {/* Subject Image */}
                  <Image
                    src={subject.icon}
                    alt={`Icon of ${subject.name}`}
                    fill
                    className="object-cover rounded-md"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    priority={false}
                  />
                  {/* Overlay with subject title */}
                  <div className="absolute bottom-0 w-full p-3">
                    <h2 className="text-white geist-mono-semibold bg-primary/50 px-4 py-1 h-[67px] flex items-center">
                      {subject.name}
                    </h2>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </InfiniteScroll>
  );
}
