import { useTranslation } from "react-i18next";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useState } from "react";
import BlockUnblocModal from "./BlockUnblocModal";
import { MdBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";


const Validated = ({ blocked, title, id }: any) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full p-4 bg-white mt-5 rounded-10 shadow-sm relative">
      <div className="preferedDate flex items-center gap-4">
        {isOpen && (
          <BlockUnblocModal
            setClose={() => setIsOpen(false)}
            blocked={blocked}
            title={title}
            id={id}
          />
        )}
        <p
          className={`text-[30px] ${
            blocked ? "text-red-500" : "text-green-500"
          }`}
        >
         {blocked ? <MdBlock /> : <CgUnblock />}
        </p>
        <p className="text-[18px] lg:text-[20px] font-medium text-writingGrey w-full">
          {blocked ? t("blocked") : t("not_blocked")}
        </p>
      </div>
      <div
        className={`absolute top-1 flex gap-2 ${
          i18n.language === "ar" ? "left-2" : "right-2"
        }`}
      >
        <button onClick={() => setIsOpen(!isOpen)}>
          <HiOutlineDotsHorizontal className="text-writingGrey text-[30px]" />
        </button>
      </div>
    </div>
  );
};

export default Validated;
