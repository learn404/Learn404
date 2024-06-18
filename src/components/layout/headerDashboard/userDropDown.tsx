"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
          className="absolute dropdown-container right-0 mt-2 z-50 bg-bg-primary divide-y divide-gray-100 rounded-lg shadow w-44 border border-white/10 "
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
                className="block px-4 py-2 hover:bg-white/10 rounded mx-2"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="block px-4 py-2 hover:bg-white/10 rounded mx-2"
              >
                Settings
              </Link>
            </li>
            <li>
              <Link
                href="/earnings"
                className="block px-4 py-2 hover:bg-white/10 rounded mx-2"
              >
                Earnings
              </Link>
            </li>
            {isAdmin && (
              <li>
                <Link
                  href="/admin"
                  className="block px-4 py-2 hover:bg-white/10 rounded mx-2"
                >
                  Admin
                </Link>
              </li>
            )}
          </ul>
          <div className="py-1 flex justify-center">
            <button
              onClick={() => signOut({ callbackUrl: "/", redirect: true })}
              className="px-4 py-2 hover:bg-white/10 flex items-center gap-2 text-sm font-medium rounded w-max text-left"
            >
              <LogOut size={15} />
              <span className="text-sm text-center">Déconnexion</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
