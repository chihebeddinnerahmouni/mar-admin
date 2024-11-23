import ReactModal from "react-modal";
import { useTranslation } from "react-i18next";
import SwitchLangMobile from "./SwitchLangMobile";

ReactModal.setAppElement("#root");

const DropDownMenuModal = ({ setClose }: any) => {
  const { i18n } = useTranslation();


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
          //   src={profilePic ? `${url}/${profilePic}` : "/anonyme.jpg"}
          src="/profilePic.png"
          alt="profile, picture"
          className="w-[35px] h-[35px] object-cover object-center rounded-50"
        />
        <p className="text-sm text-writingMainDark font-medium">
          {/* {firstName} {lastName} */}
          John Doe
        </p>
      </div>

      <hr className="my-3" />

      <SwitchLangMobile />
    </ReactModal>
  );
};

export default DropDownMenuModal;