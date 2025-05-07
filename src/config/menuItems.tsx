import InventoryIcon from "@mui/icons-material/Inventory";

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
      { text: "All Products", icon: <InventoryIcon />, path: "/products" },
    ],
  },
];
