import { Inventory2Outlined } from "@mui/icons-material";

export interface MenuChild {
  text: string;
  icon: React.ReactElement;
  path: string;
}

export interface MenuItem {
  section: string;
  items: MenuChild[];
}

export const menuItems: MenuItem[] = [
  {
    section: "Products",
    items: [
      { text: "All Products", icon: <Inventory2Outlined />, path: "/products" },
    ],
  },
];
