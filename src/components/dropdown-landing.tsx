"use client";

import { Layout, LogOut, Shield, User } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface DropdownLandingProps {
  isAdmin: boolean;
  session: Session;
}

const DropdownLanding = ({isAdmin, session}: DropdownLandingProps) => {
  return ( 
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"} 
          className="flex items-center bg-transparent text-gray-200 hover:bg-gray-800"
        >
          <span className="relative flex shrink-0 overflow-hidden rounded-full md:mr-2 size-6">
            <Image src={session?.user?.image || ""} alt="user image" width={30} height={30} className="rounded-full" />
          </span>
          <span className="hidden md:block font-semibold translate-y-[1px]">{session?.user?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-52 bg-bg-primary text-torea-50 border border-white/10 mt-1 max-md:-translate-x-2">
        <DropdownMenuGroup>
          <Link href="/dashboard">
            <DropdownMenuItem className="cursor-pointer">
              <Layout className="mr-2 h-4 w-4" />
              <span>Tableau de bord</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/account/details">
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Compte</span>
            </DropdownMenuItem>
          </Link>

          {isAdmin && (
            <Link href="/admin">
              <DropdownMenuItem className="cursor-pointer">
                <Shield className="mr-2 h-4 w-4" />
                <span>Admin</span>
              </DropdownMenuItem>
            </Link>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/", redirect: true })}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Se déconnecter</span>
          {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
   );
}
 
export default DropdownLanding;