import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import SideBar from "./SideBar";
import { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import DropDownMenuModal from "../top bar/DropDownMenuModal";
import SwitchLanguagePc from "../top bar/SwitchLanguagePc";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";




const fetshUser = async (token: string) => {
  const url = import.meta.env.VITE_SERVER_URL_USERS as string;
  const { data } = await axios.get(url + "/api/user/auth-user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};


const TopBar = () => {

  const token = localStorage.getItem("jwt");

  const { data } = useQuery({
    queryKey: ["fetshAppuser", token],
    queryFn: () => fetshUser(token!),
    enabled: !!token,
  });




  return (
    <>
      <div className="h-[60px] bg-white fixed right-0 left-0 top-0 flex items-center justify-between px-4 shadow-sm lg:h-[80px] md:px-10 lg:px-[80px] z-50 ">
        <SideBarPart name={data?.name} />
        <LangMenu data={data} />
      </div>
    </>
  );
};

export default TopBar;


const SideBarPart = ({name}: {name: string}) => { 
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <>
      <div className="name flex items-center gap-2 lg:gap-3">
        <button onClick={() => setOpen(true)}>
          {open ? (
            <IoClose className="lg:text-[28px]" />
          ) : (
            <FiMenu className="lg:text-[28px]" />
          )}
        </button>
        <p className="text-[18px] font-bold lg:text-[28px]">
          {t("hello")}, {name} 👋
        </p>
      </div>
      <SideBar open={open} setOpen={setOpen} />
    </>
  );
}


const LangMenu = ({data}: {data: any}) => { 

  const url = import.meta.env.VITE_SERVER_URL_USERS as string;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <>
      <div className="right flex items-center">
        <SwitchLanguagePc />
        <LazyLoadImage
          src={
            data?.profilePicture
              ? url + "/" + data?.profilePicture
              : "/anonyme.jpg"
          }
          className="w-[40px] h-[40px] rounded-50 object-cover object-center lg:w-[50px] lg:h-[50px]"
          alt="profilePic"
          effect="blur"
        />
        <button className="items-center gap-2"
        onClick={handleMenuOpen}
        >
          <HiOutlineDotsVertical className="text-[28px]" />
        </button>
      </div>
      {isMenuOpen && (
        <DropDownMenuModal
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={handleMenuClose}
          anchorEl={anchorEl}
          user={data}
        />
      )}
    </>
  );
}