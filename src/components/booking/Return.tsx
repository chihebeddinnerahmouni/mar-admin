import { useTranslation } from "react-i18next";
import { TiHomeOutline } from "react-icons/ti";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

const Return = ({ details }: any) => {
  const { t, i18n } = useTranslation();
  //   console.log(details);

  const returnDateTime = details.booking_info.returnDateTime;
  const returnDate = new Date(returnDateTime.seconds * 1000);
  const locale = i18n.language === "ar" ? ar : undefined;
  const formattedReturnDate = format(returnDate, "dd MMM yyyy HH:mm", {
    locale,
  });

  return (
    <div className="w-full p-4 bg-white mt-5 rounded-10 shadow-sm">
      <div className="preferedDate flex items-center gap-4">
        <TiHomeOutline className="text-writingGrey text-[30px]" />
        <div className="datesAgain lg:text-[18px]">
          <p className="text- text-writingMainDark font-bold">
            {t("return")}:{" "}
            <span className="font-normal text-writingGrey">
              {formattedReturnDate}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Return;
