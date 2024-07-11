"use client";

import { formatDate } from "@/lib/utils";
import { RefreshCcw, Trash, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


interface ChangelogProps {
  id: string;
  title: string;
  version: string;
  createdAt: Date;
  content: string;

}


export default function ChangeLogCard({
  id,
  title,
  version,
  content,
  createdAt,
  isAdmin
}: ChangelogProps & { isAdmin: boolean }) {  

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    
    const deleteChangelog = async (id: string) => {
        setIsLoading(true);
        const response = await fetch(`/api/changelog/delete-changelog/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
            }),
        });
        if (response.ok) {
            setIsLoading(false);
            toast.success(`Le Changelog ${title} a été supprimé avec succès`);
            router.refresh();
        } else {
            setIsLoading(false);
            toast.error(`Le Changelog ${title} n'a pas été supprimé`);
        }
    }

    return (
    <>
      <li key={id} className="p-4 flex gap-4">
        
        <div className="text-gray-400 text-xs mb-2 w-fit flex-0 mt-1">
          {formatDate(createdAt.toString())}
        </div>
        <div className="flex-1 flex flex-col gap-5 p-4 rounded-md border-2 border-gray-800 bg-gray-950 w-5xl ">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center">
                <RefreshCcw className="w-4 h-4 mr-2" />
                {title}</h2>
            <div className="flex items-center gap-2">
                <p className="text-sm text-gray-400">version {version}</p>
                {isAdmin && <p className="text-sm text-gray-400"><Button disabled={isLoading} variant="destructive" onClick={() => {
                  deleteChangelog(id);
                }}>
                    {isLoading ? <Loader2 className="w-4 h-4" /> : <Trash className="w-4 h-4" />}
                </Button></p>}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-gray-400">{content}</p>
          </div>
        </div>
        
      </li>
    </>
  );
}
