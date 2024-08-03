"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { currentUserType } from "@/lib/current-user";
import { dropdownMenu } from "@/lib/dropdown-menu";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";


interface UserDropdownProps {
  user: currentUserType;
  isAdmin: boolean;
  isAvatar: boolean;
}

export default function UserDropdown({
  isAvatar,
  isAdmin,
  user,
}: UserDropdownProps) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
          {isAvatar ? (
            <Image src={user?.image ?? ""} alt="profile" width={45} height={45} className="rounded-full border border-white p-1 cursor-pointer" />
          ) : (
            <div className="rounded-full bg-white w-10 h-10"></div>
          )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52 bg-bg-primary text-torea-50
         border border-white/10 mt-2 -translate-x-4">
        <DropdownMenuLabel>
          {user?.name ?? "My account"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuGroup>
          {dropdownMenu.map((item) => (
            (!isAdmin && ["Admin", "Gains"].includes(item.name) ) ? (
              null
            ) : (
              <Link href={item.link} key={`menu:${item.name}`}>
                <DropdownMenuItem className="cursor-pointer">
                  <item.icon className="mr-2 w-4 h-4" />
                  <span>{item.name}</span>
                </DropdownMenuItem>
              </Link>
            )
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/", redirect: true })} >
          <LogOut className="mr-2 w-4 h-4" />
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
