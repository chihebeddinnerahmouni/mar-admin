import { FaCodePullRequest } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const SpecialRequest = ({ details }: any) => {
  const { t } = useTranslation();

  return (
    <div className="w-full p-4 bg-white mt-5 rounded-10 shadow-sm">
      <div className="preferedDate flex items-center gap-4">
        <FaCodePullRequest className="text-writingGrey text-[30px]" />
        <div className="datesAgain lg:text-[18px]">
          <p className="font-bold">{t("special_requests")}</p>
          <p className="text-sm text-writingGrey">
            {details.booking_info.additionalInfo}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpecialRequest;
