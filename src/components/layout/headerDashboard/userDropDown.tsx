"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { currentUserType } from "@/lib/current-user";
import { Coins, Layout, LogOut, Settings, Shield } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

interface HeaderDashboardProps {
  isAvatar: boolean;
  isAdmin: boolean;
  user: currentUserType;
}

export default function UserDropdown({
  isAvatar,
  isAdmin,
  user,
}: HeaderDashboardProps) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
          {isAvatar ? (
            <Image src={user?.image ?? ""} alt="profile" width={45} height={45} className="rounded-full border border-white p-1 cursor-pointer" />
          ) : (
            <div className="rounded-full bg-white w-10 h-10"></div>
          )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-52 bg-bg-primary text-torea-50
         border border-white/10 mt-2 -translate-x-2">
        <DropdownMenuLabel>
          {user?.name ?? "My account"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuGroup>
          <Link href="/dashboard" >
            <DropdownMenuItem className="cursor-pointer">
              <Layout className="mr-2 w-4 h-4" />
              <span>Tableau de bord</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/settings">
            <DropdownMenuItem className="cursor-pointer">
              <Coins className="mr-2 w-4 h-4" />
              <span>Gains</span>
            </DropdownMenuItem>
          </Link>
          <Link href="">
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 w-4 h-4" />
              <span>Paramètres</span>
            </DropdownMenuItem>
          </Link>
          {isAdmin && (
            <Link href="/admin" >
              <DropdownMenuItem className="cursor-pointer">
                <Shield className="mr-2 w-4 h-4" />
                <span>Admin</span>
              </DropdownMenuItem>
            </Link>
          )}
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
