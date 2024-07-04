"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Coins, Layout, LogOut, Settings, Shield } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface HeaderDashboardProps {
  isAvatar: boolean;
  isAdmin: boolean;
  session: any;
}

export default function UserDropdown({
  isAvatar,
  session,
  isAdmin,
}: HeaderDashboardProps) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          id="avatarButton"
          className="rounded-full border border-white p-1 cursor-pointer"
        >
          {isAvatar ? (
            <Avatar>
              <AvatarImage src={session?.user?.image} alt="profile" />
            </Avatar>
          ) : (
            <div className="rounded-full bg-white w-10 h-10"></div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52 bg-bg-primary text-torea-50
         border border-white/10 mt-2 -translate-x-2">
        <DropdownMenuLabel>
          {session?.user?.name ?? "My account"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuGroup>
          <Link href="/dashboard" >
            <DropdownMenuItem className="cursor-pointer">
              <Layout className="mr-2 w-4 h-4" />
              <span>Tableau de bord</span>
            </DropdownMenuItem>
          </Link>
          <Link href="">
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
