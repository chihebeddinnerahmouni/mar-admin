import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import classes_array from "../../assets/files/classes_array";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function TemporaryDrawer({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  
  const location = useLocation();
  const firstSection = location.pathname.split("/")[1] ? location.pathname.split("/")[1] : "";
  const [activeIndex, setActiveIndex] = React.useState<string | null>(firstSection);
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleListItemClick = (index: string) => {
    setActiveIndex(index);
  };

  const DrawerList = (
    <Box
      className={"w-[200px] md:w-[200px]"}
      role="presentation"
      onClick={toggleDrawer(false)}
      fontFamily={"Cairo, sans-serif"}
    >
      <h1 className="text-center text-2xl font-bold mt-4">{t("admin")}</h1>
      <List className="space-y-1">
        {classes_array.map((text, index) => (
          <ListItem
            key={index}
            onClick={() => navigate(`/${text.url}`)}
            disablePadding
            className={`
            ${
              activeIndex === text.url
                ? i18n.language === "ar"
                  ? "border-r-4 border-main bg-main bg-opacity-10"
                  : "border-l-4 border-main bg-main bg-opacity-10"
                : "hover:bg-gray-100"
            }`}
          >
            <ListItemButton onClick={() => handleListItemClick(text.url)}>
              <ListItemIcon
                className={i18n.language === "ar" ? "ml-4" : "mr-4"}
              >
                <text.icon
                  className={`${activeIndex === text.url ? "text-main" : ""}`}
                />
              </ListItemIcon>
              <ListItemText
                primary={t(text.title)}
                className={`${activeIndex === text.url ? "text-main" : ""} ${
                  i18n.language === "ar" ? "text-right" : "text-left"
                }`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Drawer
        open={open}
        anchor={i18n.language === "ar" ? "right" : "left"}
        slotProps={{
          backdrop: {
            style: {
              backdropFilter: "blur(7px)",
              backgroundColor: "transparent",
            },
          },
        }}
        onClose={toggleDrawer(false)}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}