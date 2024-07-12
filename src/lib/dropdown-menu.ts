import { Coins, Layout, Shield, User } from "lucide-react";

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
    name: "Compte",
    icon: User,
    link: "/account/details",
  },
  {
    name: "Admin",
    icon: Shield,
    link: "/admin",
  },
];