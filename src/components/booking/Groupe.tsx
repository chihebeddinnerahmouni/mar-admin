import { IoPeopleSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const Groupe = ({ details }: any) => {
  const { t } = useTranslation();

  return (
    <div className="w-full p-4 bg-white mt-5 rounded-10 shadow-sm">
      <div className="preferedDate flex items-center gap-4">
        <IoPeopleSharp className="text-writingGrey text-[30px]" />
        <div className="datesAgain lg:text-[18px]">
          <p className="font-bold">{t("guests")}</p>
          <p className="text-writingGrey">
            {Number(details.booking_info.groupSize.adults) +
              Number(details.booking_info.groupSize.infants) +
              Number(details.booking_info.groupSize.children)}{" "}
            {t("guests")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Groupe;
