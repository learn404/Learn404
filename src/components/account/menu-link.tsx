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
    <div className="sm:w-72 h-full flex flex-col sm:border-r-2 border-gray-900 sm:mr-8 lg:sticky lg:top-10">
      <div className="text-gray-400">
        {accountMenu.map((item) => (
          <Link 
            href={item.href} 
            key={item.name} 
            className={`flex items-center gap-2 hover:text-gray-50 sm:pl-4 py-3 ${item.href === pathname && "sm:bg-torea-950/40 text-gray-50 sm:border-r-2 sm:border-torea-500"}`}
          >
            <item.icon width={20} height={20} />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
   );
}
 
export default AccountMenu;