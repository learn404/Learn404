"use client";

import {
  Book,
  LayoutDashboard,
  Loader,
  Settings,
  User
} from "lucide-react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface Lesson {
  id: string;
  title: string;
  slug: string;
}

export default function SearchInput({
  lessons,
 
}: {
  lessons: Lesson[];

}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

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
        className="border-2 rounded-md p-2"
        onClick={() => setOpen(true)}
      >
        <p className="text-sm text-muted-foreground">
          {" "}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 cursor-pointer">
            <span className="text-xs">⌘</span>K
          </kbd>
        </p>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="bg-bg-primary text-white">
          <CommandInput placeholder="Rechercher ..." />
          <CommandList>
            <CommandEmpty>Pas de résultat trouvé</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <Link href="/dashboard">
                <CommandItem className="flex items-center justify-between w-full cursor-pointer">
                  <div className="flex items-center">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Tableau de bord</span>
                  </div>
                  <div className="">
                    <CommandShortcut>⌘O</CommandShortcut>
                  </div>
                </CommandItem>
              </Link>
              <Link href="/changelog">
                <CommandItem className="flex items-center justify-between w-full cursor-pointer">
                  <div className="flex items-center">
                    <Loader className="mr-2 h-4 w-4" />
                    <span>Journal des modifications</span>
                  </div>
                  <div className="">
                    <CommandShortcut>⌘J</CommandShortcut>
                  </div>
                </CommandItem>
              </Link>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <Link href="/profile">
                <CommandItem className="flex items-center w-full cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </CommandItem>
              </Link>
              <Link href="/settings">
                <CommandItem className="flex items-center w-full cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </CommandItem>
              </Link>
              <Link href="/changelog">
                <CommandItem className="flex items-center w-full cursor-pointer">
                  <Loader className="mr-2 h-4 w-4" />
                  <span>Journal des modifications</span>
                </CommandItem>
              </Link>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Cours">
              {lessons.map((lesson) => (
                <Link href={`/cours/${lesson.slug}`} key={lesson.id}>
                  <CommandItem className="text-white">
                    {lesson.title}
                  </CommandItem>
                </Link>
              ))}
            </CommandGroup>

          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
