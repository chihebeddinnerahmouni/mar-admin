import { useTranslation } from "react-i18next";
import { LuSailboat } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface TopProps {
  selected: string;
  setSelected: (selected: string) => void;
  details: any;
}

const Top: React.FC<TopProps> = ({ selected, setSelected, details }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();



  return (
    <div className="p-4 w-full flex justify-between items-center fixed top-[] bg-creme lg:w-[550px] xl:w-[650px] md:px-20 lg:p-4 z-10">
      <div className="right flex items-center gap-4">
        <button
          className="flex items-center gap-2 lg:hidden"
          onClick={() => navigate("/inquiries")}
        >
          {i18n.language === "ar" ? (
            <FaArrowRightLong
              className={`text-[16px] lg:text-[25px] text-writingMainDark`}
            />
          ) : (
            <FaArrowLeftLong
              className={`text-[16px] lg:text-[25px] text-writingMainDark`}
            />
          )}
        </button>


            {details.status === "pending" && (
              <p className="text-[18px] lg:text-[20px] font-medium text-orange-400">
                {t("pending")}
              </p>
            )}
            {details.status === "expired" && (
              <p className="text-[18px] lg:text-[20px] font-medium text-red-400">
                {t("offer_expired")}
              </p>
            )}
            {details.status === "confirmed" && (
              <p className="text-[18px] lg:text-[20px] font-medium text-green-400">
                {t("offer_confirmed")}
              </p>
            )}
            {details.status === "ongoing" && (
              <p className="text-[18px] lg:text-[20px] font-medium text-blue-400">
                {t("offer_ongoing")}
              </p>
            )}
            {details.status === "cancelled" && (
              <p className="text-[18px] lg:text-[20px] font-medium text-red-400">
                {t("offer_cancelled")}
              </p>
            )}
            {details.status === "finished" && (
              <p className="text-[18px] lg:text-[20px] font-medium text-gray-400">
                {t("offer_finished")}
              </p>
            )}
      </div>

      <div className="buttons flex items-center gap-5">
        <button
          className={`flex flex-col items-center gap-2 ${
            selected === "details"
              ? "text-main pb-1 border-b-1 border-b-main"
              : "text-writingGrey hover:text-writingMainDark"
          }`}
          onClick={() => setSelected("details")}
        >
          <LuSailboat className="text-[22px] lg:text-[25px]" />
          <p className="text-[10px] lg:text-[12px]">{t("trip_details")}</p>
        </button>
        <button
          className={`flex flex-col items-center gap-2 ${
            selected === "messages"
              ? "text-main pb-1 border-b-1 border-main"
              : "text-writingGrey hover:text-writingMainDark"
          }`}
          onClick={() => setSelected("messages")}
        >
          <MdOutlineEmail className="text-[22px] lg:text-[25px]" />
          <p className="text-[10px] lg:text-[12px]">{t("messages")}</p>
        </button>
      </div>
    </div>
  );
};

export default Top;
