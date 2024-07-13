"use client";

import { Download, HelpCircle, MessagesSquare, Settings, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const accountMenu = [
  {
    name: "Details",
    href: "/account/details",
    icon: UserRound,
  },
  {
    name: "Paramètres",
    href: "/account/settings",
    icon: Settings,
  },
  {
    name: "Facture",
    href: "/account/invoice",
    icon: Download,
  },
  {
    name: "Aide / Discord",
    href: "/account/help",
    icon: HelpCircle,
  },
  {
    name: "Feedback",
    href: "/account/feedback",
    icon: MessagesSquare,
  },
  

]

const AccountMenu = () => {  
  
  const pathname = usePathname();  

  return ( 
    <aside className="w-72 flex flex-col border-r-2 border-gray-900 mr-8">
      <div className="text-gray-400">
        {accountMenu.map((item) => (
          <Link 
            href={item.href} 
            key={item.name} 
            className={`flex items-center gap-2 hover:text-gray-50 pl-4 py-3 ${item.href === pathname && "bg-torea-950/40 text-gray-50 border-r-2 border-torea-500"}`}
          >
            <item.icon width={20} height={20} />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </aside>
   );
}
 
export default AccountMenu;