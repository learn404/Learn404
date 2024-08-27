"use client";

import { formatDate } from "@/lib/utils";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

interface ChangelogProps {
  id: string;
  title: string;
  version: string;
  createdAt: Date;
  content: string;
  deleteChangelog: (id: string) => void;
}

export default function ChangeLogCard({
  id,
  title,
  version,
  content,
  createdAt,
  isAdmin,
  deleteChangelog,
}: ChangelogProps & { isAdmin: boolean }) {
  
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClick = async () => {
    setIsLoading(true);
    deleteChangelog(id);
  }


  return (

    <div className="flex-1 flex items-center ">
      <div key={id} className="flex flex-col gap-3 flex-1">
        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center font-medium rounded-md text-xs px-2 py-1 bg-primary-50 
            text-gray-300 ring-1 ring-inset ring-torea-900 bg-torea-950 ">
              {version}
            </span>
            {isAdmin && (
              <Button
                disabled={isLoading}
                variant="ghost"
                onClick={handleOnClick}
                className="hover:bg-red-500/10"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash className="w-4 h-4" />
                )}
              </Button>
            )}
          </div>
          <h2 className="text-gray-50 font-semibold text-xl mb-1">
            {title}
          </h2>
          <p className="text-gray-400">
            {content}
          </p>
        </div>
        <p className="text-gray-400 text-sm mt-4">
          {formatDate(createdAt.toString())}
        </p>
      </div>
    </div>
  );
}
