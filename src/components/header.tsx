import Image from "next/image";
import { LogIn } from "lucide-react";

export default function Header() {
  return (
    <header className="p-8 m-auto w-full">
      <nav className="rounded-lg bg-indigo-950 backdrop-blur-xl flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-5">
          <Image src="/img/logo.png" alt="logo" width={25} height={25} />
          <h3 className="text-xl font-semibold">Learn404</h3>
        </div>
        <div>
          <ul className="flex items-center gap-5">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
          </ul>
        </div>
        <div>
          <button className="rounded-lg border  backdrop-blur border-white text-white  px-5 py-1 flex items-center gap-4">
            <LogIn size={20} />
            Se connecter
          </button>
        </div>
      </nav>
    </header>
  );
}
