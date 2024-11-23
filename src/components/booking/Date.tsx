import { useTranslation } from "react-i18next";
import { FaRegCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";

const Dates = ({ details }: any) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const formatDate = (date: Date) => {
    const locale = currentLanguage === "ar" ? ar : enUS;
    return format(date, "dd MMM yyyy", { locale });
  };

  return (
    <div className="w-full p-4 bg-white mt-5 rounded-10 shadow-sm">
      <div className="preferedDate flex items-center gap-4">
        <FaRegCalendarAlt className="text-writingGrey text-[30px]" />
        <div className="datesAgain lg:text-[18px]">
          <p className="text- text-writingMainDark font-bold">
            {t("depart")}:{" "}
            <span className="font-normal text-writingGrey">
              {formatDate(new Date(details.booking_info.preferredDate))}
            </span>
            <span className="font-normal text-writingGrey">
              {", "}{details.booking_info.departureTime}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dates;
