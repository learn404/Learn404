"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LogoutButton } from "@/components/buttons/auth/AuthButton";

interface HeaderDashboardProps {
  isAvatar: boolean;
  session: any;
}

export default function UserDropdown({
  isAvatar,
  session,
}: HeaderDashboardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <div
        id="avatarButton"
        className="rounded-full border border-white p-1 cursor-pointer"
        onClick={handleDropdownToggle}
      >
        {isAvatar ? (
          <Image
            src={session?.user?.image}
            alt="profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="rounded-full bg-white w-10 h-10"></div>
        )}
      </div>
      {isDropdownOpen && (
        <div
          id="userDropdown"
          className="absolute right-0 mt-2 z-10 bg-gray-950 divide-y divide-gray-100 rounded-lg shadow w-44"
        >
          <div className="px-4 py-3 text-sm text-white">
            <div>{session?.user?.name ?? "User"}</div>
            <div className="font-medium truncate">
              {session?.user?.email ?? "email@example.com"}
            </div>
          </div>
          <ul
            className="py-2 text-sm text-gray-100"
            aria-labelledby="avatarButton"
          >
            <li>
              <Link
                href="/dashboard"
                className="block px-4 py-2 hover:bg-white/10"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="block px-4 py-2 hover:bg-white/10"
              >
                Settings
              </Link>
            </li>
            <li>
              <Link
                href="/earnings"
                className="block px-4 py-2 hover:bg-white/10"
              >
                Earnings
              </Link>
            </li>
          </ul>
          <div className="py-1">
            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  );
}
