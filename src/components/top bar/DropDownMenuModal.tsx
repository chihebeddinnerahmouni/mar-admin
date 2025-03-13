import { Menu, MenuItem } from "@mui/material";
import SwitchLangMobile from "./SwitchLangMobile";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { useQueryClient } from "@tanstack/react-query";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface Props {
  isMenuOpen: boolean;
  setIsMenuOpen: any;
  anchorEl: any;
  user: any;
}

const OnlineDropMenu = ({ isMenuOpen, setIsMenuOpen, anchorEl, user }: Props) => {

  return (
    <Menu
      anchorEl={anchorEl}
      open={isMenuOpen}
      onClose={setIsMenuOpen}
      PaperProps={{
        style: {
          borderRadius: "10px",
          marginTop: "10px",
        },
      }}
      BackdropProps={{
        style: {
          backdropFilter: "blur(10px)",
        },
      }}
    >
      <User user={user} />
      <LanguageItem />
      <Disconnect />
    </Menu>
  );
};

export default OnlineDropMenu;







const User = ({user}: {user: any}) => {
  const url = import.meta.env.VITE_SERVER_URL_USERS;
  return (
    <MenuItem
      sx={{
        "&:hover": { backgroundColor: "#f5f5f5" },
        fontFamily: "Cairo, sans-serif",
      }}
      className="user flex items-center gap-2"
    >
      <LazyLoadImage
        src={
          user?.profilePicture ? `${url}/${user?.profilePicture}` : "/anonyme.jpg"
        }
        alt="profile, picture"
        effect="blur"
        className="w-[35px] h-[35px] object-cover object-center rounded-50"
      />
      <p className="text-writingMainDark font-medium">
        {user?.name} {user?.surname}
      </p>
    </MenuItem>
  );
};


const LanguageItem = () => {

  return (
    <MenuItem
      sx={{
        "&:hover": { backgroundColor: "#f5f5f5" },
        fontFamily: "Cairo, sans-serif",
      }}
      className="user flex items-center gap-2"
    >
      <SwitchLangMobile />
    </MenuItem>
  );
}



const Disconnect = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return (
    <MenuItem
      sx={{
        "&:hover": { backgroundColor: "#f5f5f5" },
        fontFamily: "Cairo, sans-serif",
      }}
      className="user flex items-center gap-2"
    >
      <button
        onClick={() => {
          localStorage.removeItem("jwt");
          queryClient.clear();
          navigate("/login");
        }}
        className="w-full flex items-center gap-2 text-writingMainDark"
      >
        <IoIosLogOut className="text-[20px]" />
        <span>{t("logout")}</span>
      </button>
    </MenuItem>
  );
};

