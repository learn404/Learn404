"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const ChaptersSection = ({
  categories,
  lessons
}: {
  categories: {
    id: string;
    name: string;
    description: string | null;
    level: string | null;
  }[];
  lessons: { id: string; title: string; categoryId: string, slug: string }[];
}) => {
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
  const generatePath = (categoriesCount: number) => {
    const segmentWidth = 430;
    const totalWidth = segmentWidth * categoriesCount;
    let d = `M19.9506 11C19.4489 16.0533 15.1853 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.1853 0 19.4489 3.94668 19.9506 9H`;

    for (let i = 0; i < categoriesCount; i++) {
        const x = segmentWidth * (0 + 1);
        d += `${x}C${x}.551 3.94668 ${x + 4.815} 0 ${x + 10} 0C${x + 15.185} 0 ${x + 19.449} 3.94668 ${x + 20.951} 9H`;
    }
    d += ` ${totalWidth - 10}C${totalWidth - 10}.551 3.94668 ${totalWidth - 5.815} 0 ${totalWidth} 0C${totalWidth + 5.523} 0 ${totalWidth + 10} 4.47715 ${totalWidth + 10} 10C${totalWidth + 10} 15.5228 ${totalWidth + 5.523} 20 ${totalWidth} 20C${totalWidth - 5.815} 20 ${totalWidth - 10.551} 16.0533 ${totalWidth - 10.049} 11H${totalWidth - 10}Z`;

    return d;
};

  const svgPath = generatePath(categories.length -1);

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
          viewBox={`0 0 870 20`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="hidden lg:block absolute top-24 left-[10vw]"
        >
          <path
            id="Union"
            fillRule="evenodd"
            clipRule="evenodd"
            d={svgPath}
            fill="#6B7280"
          />
          <mask
            id="mask0_3918_93"
            className="mask-type:alpha"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="870"
            height="20"
          >
            <path
              id="Union"
              fillRule="evenodd"
              clipRule="evenodd"
              d={svgPath + " 0 0"}
              fill="#6B7280"
            />
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
              className="w-screen pt-16 lg:pt-52 px-6 lg:px-[10vw] lg:h-svh"
            >
              <span className="bg-torea-950 border border-torea-800 rounded-full px-4 py-2 text-gray-50 max-sm:text-sm">
                {category.level}
              </span>
              <div className="mt-8">
                <h1 className="text-3xl lg:text-5xl m-0 text-gray-50">
                  {category.name}
                </h1>
                <p className="mt-2 text-gray-400 max-w-2xl ">
                  {category.description}
                </p>
                <div className="flex flex-wrap gap-16 mt-8">
                  {chunkedLessons.map((lessonGroup, groupIndex) => (
                    <div
                      key={groupIndex}
                      className="flex flex-col gap-y-4"
                    >
                      {lessonGroup.map((lesson, lessonIndex) => (
                        <div key={lesson.id} className="flex items-center gap-4">
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
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default ChaptersSection;
