"use client";

import Image from "next/image";
import { LogIn, LogOut } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isConnected, setIsConnected] = useState(true);

  return (
    <header className="p-8 m-auto w-full">
      <nav className="rounded-lg bg-indigo-950 backdrop-blur-xl flex items-center justify-between px-8 py-4 relative">
        <div className="flex items-center gap-5">
          <Image src="/img/logo.png" alt="logo" width={25} height={25} />
          <h3 className="hidden md:block text-xl font-semibold">Learn404</h3>
        </div>
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
              <button className="rounded-lg border backdrop-blur border-gray-600 text-white px-5 py-1 flex items-center gap-2 hover:bg-gray-600 transition-all dureation-300 ease-in-out">
                <span className="text-sm md:text-base font-medium">Lesson</span>
              </button>
              <button
                className="rounded-lg border backdrop-blur border-gray-600 text-white px-5 py-1 flex items-center gap-2 hover:bg-gray-600 transition-all dureation-300 ease-in-out"
                onClick={() => setIsConnected(false)}
              >
                <LogOut size={20} />
                <span className="hidden md:block font-medium">
                  Se déconnecter
                </span>
              </button>
            </>
          ) : (
            <button
              className="rounded-lg border backdrop-blur border-gray-600 text-white px-5 py-1 flex items-center gap-2 hover:bg-gray-600 transition-all dureation-300 ease-in-out"
              onClick={() => setIsConnected(true)}
            >
              <LogIn size={20} />
              <span className="hidden md:block font-medium">Se connecter</span>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
