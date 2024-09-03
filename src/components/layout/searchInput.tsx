"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from "@/components/ui/command";
import { Lessons_level } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

type Lesson = {
  id: string, 
  title: string,
  slug: string,
}

interface SearchInputProps {
  categories: {
    id: string;
    name: string;
    createdAt: Date;
    sort_number: number | null;
    level: Lessons_level | null;
    description: string | null;
    Lessons: Lesson[];
  }[];
}

export default function SearchInput( { categories } : SearchInputProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  console.log(categories);
  

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "o" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        router.push("/dashboard");
      }
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        router.push("/changelog");
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant={"outline"} 
        className="flex items-center gap-4 border text-gray-300 bg-gray-950 hover:bg-black hover:border-gray-800 transition-none"
        onClick={() => setOpen(true)}
      >
        <span>
          Cherche un cours
        </span>
        <span className="text-xs text-gray-400 p-1 rounded-sm border border-gray-800 bg-gray-950">
          Ctrl K            
        </span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="bg-bg-primary text-white">
          <CommandInput placeholder="Rechercher un cours..." />
          <CommandList className="no-scrollbar">
            <CommandEmpty>Pas de résultat trouvé</CommandEmpty>
            <CommandSeparator />
              {categories.map((category, index) => (
                <>
                  { index !== 0 && <Separator /> }
                  <CommandGroup key={`shortcut:cat:${category.id}`} heading={`${index + 1}. ${category.name}`}>
                    {category.Lessons.map(lesson => (
                      <Link key={`shortcut:lesson:${lesson.id}`} href={`/cours/${lesson.slug}`}>
                        <CommandItem className="text-gray-50">
                          {lesson.title}
                        </CommandItem>
                      </Link>
                    ))}
                  </CommandGroup>
                </>
              ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
