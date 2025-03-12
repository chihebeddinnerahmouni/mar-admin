import { IoMdBoat } from "react-icons/io";
import { useTranslation } from "react-i18next";

const Guests = ({ category }: any) => {
  const { t } = useTranslation();

  return (
    <div className="w-full p-4 bg-white mt-5 rounded-10 shadow-sm relative">
      <div className="preferedDate flex items-center gap-4">
        <IoMdBoat className="text-writingGrey text-[30px] min-w-[40px]" />
        <div className="datesAgain">
          <p className="font-bold">{t("category")}</p>
          <p className="text-writingGrey">{category}</p>
        </div>
      </div>
    </div>
  );
};

export default Guests;
