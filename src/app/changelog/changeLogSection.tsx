"use client";
import { RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";
import ChangeLogCard from "@/components/cards/changeLogCard";

interface ChangelogData {
  id: string;
  title: string;
  content: string;
  version: string;
  createdAt: Date;
  
}


export default function ChangeLogSection({
  ChangelogData,
  isAdmin,
}: {
  ChangelogData: ChangelogData[];
  isAdmin: boolean;
}) {
  return (
    <>
      <h1 className="text-2xl font-bold my-5 mx-10 w-fit flex items-center">
        Journal des modifications
      </h1>
      <div className="flex flex-col gap-4 justify-center max-w-2xl mx-auto mb-10">
        <ul>
          {ChangelogData.map((changelogData, index) => (
            <motion.div
              key={changelogData.id}
              initial={{ opacity: 0, y: 100, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: index * 0.2 }}
            >
              <ChangeLogCard {...changelogData} isAdmin={isAdmin} />
            </motion.div>
          ))}
        </ul>
      </div>
    </>
  );
}
