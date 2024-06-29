import {
  Bookmark,
  LayoutGrid,
  Settings,
  SquarePen,
  Tag,
  Users
} from "lucide-react";

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Posts",
          active: pathname.includes("/posts"),
          icon: SquarePen,
        },
        {
          href: "/categories",
          label: "Categories",
          active: pathname.includes("/categories"),
          icon: Bookmark,
        },
        {
          href: "/tags",
          label: "Tags",
          active: pathname.includes("/tags"),
          icon: Tag,
        }
      ]
    },
    {
      groupLabel: "Settings",
      menus: [

        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
        }
      ]
    },
    {
      groupLabel: "Admin",
      menus: [
        {
          href: "",
          label: "Users",
          active: pathname.includes("/admin"),
          icon: Users,
        },
        {
          href: "",
          label: "Lessons",
          active: pathname.includes("/admin"),
          icon: Users,
        },
      ]
    }
  ];
}
