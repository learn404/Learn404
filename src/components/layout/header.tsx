"use client";

import Image from "next/image";
import { LogIn, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import SecondaryButton from "@/components/buttons/SecondaryButton";

export default function Header() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsConnected(!!token);
  }, []);

  const Logout = () => {
    localStorage.removeItem("token");
    setIsConnected(false);
  };

  return (
    <header className="p-8 m-auto w-full">
      <nav className="rounded-lg bg-black bg-opacity-20 backdrop-blur-xl flex items-center justify-between px-8 py-4 relative">
        <Link href="/">
          <div className="flex items-center gap-5">
            <Image src="/img/logo.png" alt="logo" width={25} height={25} />
            <h3 className="hidden md:block text-xl font-semibold">Learn404</h3>
          </div>
        </Link>

        {/* <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex items-center gap-5 text-gray-600">
            <li>
              <a href="#">Fonctionnalités</a>
            </li>
            <li>
              <a href="#">Prix</a>
            </li>
          </ul>
        </div> */}
        <div className="flex items-center gap-2">
          {isConnected ? (
            <>
              <SecondaryButton redirectTo="/lesson">
                <span className="text-sm md:text-base font-medium">Lesson</span>
              </SecondaryButton>
              <SecondaryButton onClick={Logout}>
                <LogOut size={20} />
                <span className="hidden md:block font-medium">
                  Se déconnecter
                </span>
              </SecondaryButton>
            </>
          ) : (
            <SecondaryButton redirectTo="/login">
              <LogIn size={20} />
              <span className="hidden md:block font-medium">Se connecter</span>
            </SecondaryButton>
          )}
        </div>
      </nav>
    </header>
  );
}
