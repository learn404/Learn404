"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const logo = [
  "/svg/vscode-logo.svg",
  "/svg/html-logo.svg",
  "/svg/js-logo.svg",
  "/svg/nodejsexpress-logo.svg",
];

interface ChapterSectionProps {
  categories: {
    id: string;
    name: string;
    description: string | null;
    level: string | null;
  }[];
  lessons: {
    id: string;
    title: string;
    categoryId: string;
    slug: string;
  }[];
}

const ChaptersSection = ({ categories, lessons }: ChapterSectionProps) => {
  const slider = useRef<HTMLDivElement>(null);
  const component = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!slider.current || !component.current) return;

    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const initGSAPAnimations = () => {
      let ctx = gsap.context(() => {
        let panels = gsap.utils.toArray(".scrollx > section");
        gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: slider.current,
            pin: true,
            scrub: 1,
            snap: 1 / (panels.length - 1),
            end: () => "+=" + slider.current!.offsetWidth,
          },
        });

        gsap.to(".mask", {
          width: "100%",
          scrollTrigger: {
            trigger: component.current,
            start: "top left",
            scrub: 1,
            end: () =>
              "+=" + (slider.current!.offsetWidth - 100 * categories.length),
          },
        });
      }, component);
      return () => ctx.revert();
    };

    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        initGSAPAnimations();
      } else {
        gsap.killTweensOf(".scrollx > section");
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    };

    if (mediaQuery.matches) {
      initGSAPAnimations();
    }

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      gsap.killTweensOf(".scrollx > section");
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [categories.length]);

  const chunkArray = (array: any[], chunkSize: number) => {
    const results = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      results.push(array.slice(i, i + chunkSize));
    }
    return results;
  };


  return (
    <div className="overflow-hidden relative" ref={component}>
      <div
        className="lg:flex lg:w-[400vw] max-lg:pb-[6.25rem] scrollx"
        ref={slider}
        style={{
          width: `${categories.length * 100}vw`,
        }}
      >
        <svg
          width="870"
          height="20"
          viewBox="0 0 870 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="hidden lg:block absolute top-24 left-[10vw] z-20"
        >
          <circle cx="10" cy="10" r="10" fill="#6B7280" />
          <circle cx="860" cy="10" r="10" fill="#6B7280" />
          <rect x="19" y="9" width="832" height="2" fill="#6B7280" />

          <mask
            id="mask0_3918_93"
            className="mask-type:alpha"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="870"
            height="20"
          >
            <circle cx="10" cy="10" r="10" fill="#6B7280" />
            <circle cx="860" cy="10" r="10" fill="#6B7280" />
            <rect x="19" y="9" width="832" height="2" fill="#6B7280" />
          </mask>
          <g mask="url(#mask0_3918_93)">
            <rect
              id="Rectangle 21"
              y="-21"
              width="5%"
              height="63"
              fill="#4F45E6"
              className="mask"
            />
          </g>
        </svg>

        {categories.map((category, index) => {
          const filteredLessons = lessons.filter(
            (lesson) => lesson.categoryId === category.id
          );
          const chunkSize = 5;
          const chunkedLessons = chunkArray(filteredLessons, chunkSize);

          return (
            <section
              key={index}
              className="relative w-screen pt-16 lg:pt-52 px-6 lg:px-[10vw] lg:h-svh"
            >
              <span className="bg-torea-950 border border-torea-800 rounded-full px-4 py-2 text-gray-50 max-sm:text-sm">
                {category.level === "BEGINNER"
                  ? "Débutant"
                  : category.level === "INTERMEDIATE"
                  ? "Intermédiaire"
                  : "Avancé"}
              </span>
              <div className="mt-8 z-10">
                <h2 className="text-3xl lg:text-5xl m-0 text-gray-50">
                  {category.name}
                </h2>
                <p className="mt-2 text-gray-400 max-w-2xl ">
                  {category.description}
                </p>
                <div className="flex flex-wrap gap-x-16 mt-8">
                  {chunkedLessons.map((lessonGroup, groupIndex) => (
                    <div
                      key={groupIndex}
                      className={cn(
                        "flex flex-col gap-y-4",
                        groupIndex > 0 && "max-lg:mt-4"
                      )}
                    >
                      {lessonGroup.map((lesson, lessonIndex) => (
                        <div
                          key={lesson.id}
                          className="flex items-center gap-4"
                        >
                          <span className="text-gray-50 font-semibold text-lg sm:text-xl lg:text-2xl tabular-nums">
                            {lessonIndex + 1 + groupIndex * chunkSize}
                          </span>
                          <span className="text-gray-400 font-semibold text-lg sm:text-xl lg:text-2xl">
                            {lesson.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden lg:block w-1/4 max-w-96 aspect-square absolute bottom-2/4 right-28 2xl:right-1/4 z-0">
                <Image
                  src={logo[index]}
                  alt="arrow"
                  width={0}
                  height={0}
                  sizes="20vw"
                  className="w-full h-full"
                />
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default ChaptersSection;
