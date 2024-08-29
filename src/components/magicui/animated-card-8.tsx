"use client";

import { cubicBezier, motion } from "framer-motion";
import Image from "next/image";

export function FeatureCard8() {
  const variant1 = {
    initial: {
      y: 0,
      scale: 0.97,
      transition: {
        delay: 0,
        duration: 0.2,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
    whileHover: {
      y: -45,
      scale: 1,
      boxShadow:
        "rgba(39,127,245,0.15) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
      transition: {
        delay: 0,
        duration: 0.2,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
  };
  const variant2 = {
    initial: {
      y: 30,
      opacity: 0,
      scale: 0.97,
      transition: {
        delay: 0,
        duration: 0.2,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
    whileHover: {
      y: 10,
      opacity: 1,
      scale: 1,
      boxShadow:
        "rgba(245,40,145,0.05) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
      transition: {
        delay: 0,
        duration: 0.2,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
  };
  const variant3 = {
    initial: {
      x: 30,
      y: 20,
      opacity: 0,
      transition: {
        delay: 0,
        duration: 0.2,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
    whileHover: {
      x: 5,
      y: 5,
      opacity: 1,
      boxShadow:
        "rgba(39,245,76,0.15) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
      transition: {
        delay: 0.05,
        duration: 0.2,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
  };

  const containerVariants = {
    initial: {},
    whileHover: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="relative h-full w-full transform-gpu border border-gray-900 rounded-xl bg-gray-50 
      [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] 
      dark:bg-bg-primary 
      md:max-h-[500px]">
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileHover="whileHover"
        className="flex h-full w-full cursor-pointer flex-col items-start justify-between"
      >
        <div className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-y-1 overflow-hidden rounded-t-xl bg-transparent">
          <div className="relative flex flex-col items-center justify-center gap-y-2 px-10 py-20">
            <motion.div
              variants={variant1}
              className=" relative flex items-start gap-x-2 rounded-lg border border-gray-400/20 bg-gray-50 p-4 shadow-[0px_0px_40px_-25px_rgba(0,0,0,0.25)] dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="h-6 w-6 rounded-full bg-blue-500">
                <Image
                  width={24}
                  height={24} 
                  className="h-full w-full rounded-full object-cover"
                  src="https://avatar.vercel.sh/joshua"
                  alt="unknown"
                />
              </div>
              <div className="w-[calc(100%-3rem)]">
                <h3 className="text-base font-semibold">.Unknown</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Quelqu'un intéressé pour un projet SaaS avec Next/Tailwind ?
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={variant2}
              className=" absolute inset-10 -bottom-14 z-[3] m-auto flex h-fit items-start gap-x-2 rounded-lg border border-gray-400/20 bg-gray-50 p-4 shadow-[0px_0px_40px_-25px_rgba(0,0,0,0.25)] dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="w-8 ">
                <div className="h-6 w-6 rounded-full bg-blue-500">
                  <Image
                    width={24}
                    height={24}
                    className="h-full w-full rounded-full object-cover"
                    src="https://avatar.vercel.sh/christina"
                    alt="nicolas"
                  />
                </div>
              </div>
              <div className="w-[calc(100%-3rem)]">
                <h3 className="text-base font-semibold">Nicolas</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Pourquoi pas, quel est ton idée de projet ?
                </p>
              </div>
              <motion.p
                variants={variant3}
                className="highlighted absolute -bottom-2 right-2 w-fit rounded-full border bg-torea-800 px-2 py-0.5 text-xs text-gray-50"
              >
                envoyé
              </motion.p>
            </motion.div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start border-t border-gray-200 p-4 dark:border-gray-800">
          {/* <h2 className="text-xl font-semibold">Communauté</h2> */}
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            Découvre des personnes partageant la même passion que toi.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
