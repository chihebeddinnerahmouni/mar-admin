import ReactModal from "react-modal";
import { useTranslation } from "react-i18next";
import SwitchLangMobile from "./SwitchLangMobile";
// import { useContext } from "react";
// import { AppContext } from "../../App";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";


ReactModal.setAppElement("#root");
interface Props {
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
}

const DropDownMenuModal = ({ setClose, data }: Props) => {
  const { i18n, t } = useTranslation();
  const url = import.meta.env.VITE_SERVER_URL_USERS as string;
  // const { profilePicture, name, surname } = useContext(AppContext);
  const queryClient = useQueryClient();

  const navigate = useNavigate();



  return (
    <ReactModal
      isOpen={true}
      onRequestClose={() => setClose(false)}
      className={`z-50 outline-none bg-white absolute w-[220px] top-[-4px] py-3 px-4 lg:top-[-5px] lg:w-[280px] rounded-20 shadow-hardShadow ${
        i18n.language === "en"
          ? "right-3 md:right-[50px] lg:right-[80px] 2xl:right-[120px]"
          : "left-3 md:left-[50px] lg:right-[80px] 2xl:right-[120px]"
      }`}
      overlayClassName={`fixed inset-0 backdrop-filter backdrop-blur-[7px] mt-[74px] lg:mt-[95px] z-50`}
    >
      <div className="user flex items-center gap-2">
        <img
          src={
            data.profilePicture
              ? url + "/" + data?.profilePicture
              : "/anonyme.jpg"
          }
          alt="profile, picture"
          className="w-[35px] h-[35px] object-cover object-center rounded-50"
        />
        <p className="text-sm text-writingMainDark font-medium">
          {data?.name} {data?.surname}
        </p>
      </div>

      <hr className="my-3" />

      <SwitchLangMobile />

      <hr className="my-3 lg:hidden" />

      <button
        onClick={() => {
          localStorage.removeItem("jwt");
          setClose(false);
          queryClient.clear();
          navigate("/login");
        }}
        className="w-full flex items-center gap-2 text-writingMainDark"
      >
        <IoIosLogOut className="text-[20px]" />
        <span>{t("logout")}</span>
      </button>
    </ReactModal>
  );
};

export default DropDownMenuModal;