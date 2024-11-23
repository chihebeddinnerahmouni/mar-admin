import { GiCaptainHatProfile } from "react-icons/gi";
import { useTranslation } from "react-i18next";

const WithCaptain = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full p-4 bg-white mt-5 rounded-10 shadow-sm">
      <div className="preferedDate flex items-center gap-4">
        <GiCaptainHatProfile className="text-writingGrey text-[30px]" />
        <div className="datesAgain lg:text-[18px]">
          <p className="font-bold">{t("with_captain")}</p>
          <p className="text-sm text-writingGrey">
            {t("a_captain_is_included_in_the_price")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WithCaptain;
