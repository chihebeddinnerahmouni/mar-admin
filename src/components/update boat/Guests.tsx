import { IoPeopleSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";
// import { HiOutlineDotsHorizontal } from "react-icons/hi";
// import { useState } from "react";

const Guests = ({ guests }: any) => {
  const { t,
    // i18n
  } = useTranslation();
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full p-4 bg-white mt-5 rounded-10 shadow-sm relative">
      <div className="preferedDate flex items-center gap-4">
        <IoPeopleSharp className="text-writingGrey text-[30px]" />
        <div className="datesAgain">
          <p className="font-bold">{t("guests")}</p>
          <p>{guests}</p>
        </div>
      </div>

      {/* <div
        className={`absolute top-1 flex gap-2 ${
          i18n.language === "ar" ? "left-2" : "right-2"
        }`}
      >
        <button onClick={() => setIsOpen(!isOpen)}>
          <HiOutlineDotsHorizontal className="text-writingGrey text-[30px]" />
        </button>
      </div> */}
    </div>
  );
};

export default Guests;
