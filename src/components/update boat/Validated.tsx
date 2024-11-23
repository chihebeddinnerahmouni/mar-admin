import { GrValidate } from "react-icons/gr";
import { useTranslation } from "react-i18next";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useState } from "react";


const Validated = ({ validated }: any) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full p-4 bg-white mt-5 rounded-10 shadow-sm relative">
      <div className="preferedDate flex items-center gap-4">
        <p>
          <GrValidate
            className={` text-[30px] ${
              validated ? "text-green-500" : "text-red-500"
            }`}
          />
        </p>
        <p className="text-[18px] lg:text-[20px] font-medium text-writingGrey w-full">
          {validated ? t("validated") : t("not_validated")}
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
