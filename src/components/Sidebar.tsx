"use client";
import { menuItems } from "@/config/menuItems";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const drawerWidth = 240;

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const pathname = usePathname();

  const drawerContent = (
    <Box sx={{ mt: 8 }}>
      {menuItems.map((section) => (
        <Box key={section.section}>
          <Typography
            variant="overline"
            sx={{
              px: 3,
              py: 1.5,
              display: "block",
              color: "text.secondary",
              fontWeight: "bold",
            }}
          >
            {section.section}
          </Typography>
          <List disablePadding>
            {section.items.map((item) => {
              const isActive = pathname === item.path;
              return (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    selected={isActive}
                    sx={{
                      "&.Mui-selected": {
                        bgcolor: "action.selected",
                        color: "primary.main",
                        "&:hover": {
                          bgcolor: "action.selected",
                        },
                        "& .MuiListItemIcon-root": {
                          color: "primary.main",
                        },
                      },
                      "&:hover": {
                        bgcolor: "action.hover",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: isActive ? "primary.main" : "text.secondary",
                        minWidth: "40px",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{
                        "& .MuiTypography-root": {
                          fontWeight: isActive ? 600 : 400,
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <Divider sx={{ my: 1 }} />
        </Box>
      ))}
    </Box>
  );

  return (
    <Box component="nav">
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={isOpen}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
