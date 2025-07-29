'use client';

import FlexSection from "@/components/FlexSection";
import Link from 'next/link';
import {
  LuSmartphone,
  LuCalendar,
  LuMapPin
} from "react-icons/lu";
import twclsx from "@/utils/twclsx";
import { useCallback } from 'react';
import Data from "public/data/data.json"

// Custom hook untuk smooth scroll
const useSmoothScroll = () => {
  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.querySelector(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  return { scrollToSection };
};

const HowTo = () => {
  const { scrollToSection } = useSmoothScroll();

  // Fungsi handler untuk scroll
  const handleSmoothScroll = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <FlexSection
      sectionClassName="py-16 bg-gradient-to-br from-accent to-blue-600"
      wrapperClassName="lg:flex-col lg:items-start xl:flex-row xl:items-center"
      id="prosedur"
    >
      <div className="flex-1 space-y-4">
        <h2 className="text-4xl font-bold text-white drop-shadow-md">
          {Data["how-to"].title}
        </h2>
        <p className="text-xl text-white/90">
          {Data["how-to"].subtitle}
        </p>
      </div>
      <div
        className={twclsx(
          "mt-9 flex-1 flex flex-col gap-6 text-lg font-medium",
          "sm:flex-row sm:items-center xl:mt-0"
        )}
      >
        <Link
          href={Data["how-to"].icon1}
          target="_blank"
          className="cursor-pointer group flex flex-col items-center text-white hover:scale-105 transition-all"
        >
          <LuSmartphone className="w-[2.6rem] h-[2.6rem] sm:mb-4 group-hover:text-yellow-300" />
          <span>{Data["how-to"].text1}</span>
        </Link>

        <div
          onClick={handleSmoothScroll(Data["how-to"].icon2)}
          className="cursor-pointer group flex flex-col items-center text-white hover:scale-105 transition-all"
        >
          <LuCalendar className="w-[2.6rem] h-[2.6rem] sm:mb-4 group-hover:text-yellow-300" />
          <span>{Data["how-to"].text2}</span>
        </div>

        <Link
          href={Data["how-to"].icon3}
          target="_blank"
          className="cursor-pointer group flex flex-col items-center text-white hover:scale-105 transition-all"
        >
          <LuMapPin className="w-[2.6rem] h-[2.6rem] sm:mb-4 group-hover:text-yellow-300" />
          <span>{Data["how-to"].text3}</span>
        </Link>
      </div>
    </FlexSection>
  );
};

export default HowTo;