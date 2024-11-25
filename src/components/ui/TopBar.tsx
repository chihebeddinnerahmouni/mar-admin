import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import SideBar from "./SideBar";
import { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import DropDownMenuModal from "../top bar/DropDownMenuModal";
import SwitchLanguagePc from "../top bar/SwitchLanguagePc";
import { useContext } from "react";
import { AppContext } from "../../App";
import { useTranslation } from "react-i18next";



const TopBar = () => {

  const [open, setOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { profilePicture, name } = useContext(AppContext);
  const url = import.meta.env.VITE_SERVER_URL_USERS as string;
  const { t } = useTranslation();


  return (
    <>
      <div className="h-[60px] bg-white fixed right-0 left-0 top-0 flex items-center justify-between px-4 shadow-sm lg:h-[80px] md:px-10 lg:px-[80px] z-50 ">
        <div className="name flex items-center gap-2 lg:gap-3">
          <button onClick={() => setOpen(true)}>
            {open ? (
              <IoClose className="lg:text-[28px]" />
            ) : (
              <FiMenu className="lg:text-[28px]" />
            )}
          </button>
          <p className="text-[18px] font-bold lg:text-[28px]">{t("hello")}, {name} 👋</p>
        </div>

        <div className="right flex items-center">
          <SwitchLanguagePc />
          <img
            src={profilePicture ? url + "/" + profilePicture : "/anonyme.jpg"}
            // src="/anonyme.jpg"
            className="w-[40px] h-[40px] rounded-50 object-cover object-center lg:w-[50px] lg:h-[50px]"
            alt="profilePic"
          />
          <button
            className="items-center gap-2"
            onClick={() => setIsMenuOpen(true)}
          >
            <HiOutlineDotsVertical className="text-[28px]" />
          </button>
        </div>
      </div>
      <SideBar open={open} setOpen={setOpen} />
      {isMenuOpen && <DropDownMenuModal setClose={setIsMenuOpen} />}
    </>
  );
};

export default TopBar;
