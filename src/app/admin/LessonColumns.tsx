"use client";

import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";

export type Lesson = {
  id: string;
  title: string | null;
  slug: string | null;
  draft: boolean | string | null;
  categoryId: string | null;

};

export const lessonColumns: ColumnDef<Lesson>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Titre
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "draft",
    header: "Brouillon",
  },
  {
    accessorKey: "categoryId",
    header: "Catégorie",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const lesson = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(lesson.id)}
            >
              Cours ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href={`/cours/${lesson.slug}`}>
              <DropdownMenuItem>Voir le cours</DropdownMenuItem>
            </Link>
            <Link href={`/admin/edit-lesson/${lesson.slug}`}>
              <DropdownMenuItem>Modifier le cours</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
