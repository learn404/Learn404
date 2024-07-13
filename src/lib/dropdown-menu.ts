
import { Coins, Layout, Shield, User, Book } from "lucide-react";

export const dropdownMenu = [
  {
    name: "Tableau de bord",
    icon: Layout,
    link: "/dashboard",
  },
  {
    name: "Blog",
    icon: Book,
    link: "/blog",
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