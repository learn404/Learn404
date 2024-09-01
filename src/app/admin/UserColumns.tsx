"use client"

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ToggleMemberPermission from "../actions/toggle-member-permission";

export type User = {
    id: string;
    name: string | null;
    email: string | null;
    admin: boolean | string | null;
    image: string | null;
    isMember: boolean | null;

} 

export const userColumns: ColumnDef<User>[] = [
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Email
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
        
    },
    {
        accessorKey: 'name',
        header: 'Nom'
    },
    {
        accessorKey: 'isMember',
        header: 'Membre'
    },
    {
        accessorKey: 'admin',
        header: 'Admin'
    },
    {
        id: "actions",
        cell: ({ row }) => {
          const user = row.original     

          const router = useRouter();

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
                  onClick={() => navigator.clipboard.writeText(user.id)}
                >
                  Copier l'ID utilisateur
                </DropdownMenuItem>
                <DropdownMenuItem onClick={async () => {
                  //  Server action pour rendre membre ou enlever le rôle
                  const { error, message } = await ToggleMemberPermission(user.id)
                  if (error) {
                    toast.error(error)
                    return;
                  }
                  toast.success(message)
                  router.refresh()
                }}>
                  {user.isMember ? "Enlever le rôle de membre" : "Promouvoir membre"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <Link href={`/admin/user/${user.id}`}>
                  <DropdownMenuItem>Profil utilisateur</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    
    
]
