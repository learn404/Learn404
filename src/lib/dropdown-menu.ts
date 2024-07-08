import { Coins, Layout, Settings, Shield } from "lucide-react";

export const dropdownMenu = [
  {
    name: "Tableau de bord",
    icon: Layout,
    link: "/dashboard",
  },
  {
    name: "Gains",
    icon: Coins,
    link: "/earnings",
  },
  {
    name: "Paramètres",
    icon: Settings,
    link: "/settings",
  },
  {
    name: "Admin",
    icon: Shield,
    link: "/admin",
  },
];