import { GiDuration } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const Duration = ({ details }: any) => {
  const [duration, setDuration] = useState("");

  const { t } = useTranslation();
  const hours = t("h");

  useEffect(() => {
    const allDiration = details.booking_info.duration;
    let formattedDuration = "";
    if (allDiration?.hours && allDiration?.minutes) {
      formattedDuration = `${allDiration.hours}${hours}:${
        allDiration.minutes
      }${t("minimin")}`;
    } else if (allDiration?.hours) {
      formattedDuration = `${allDiration.hours}h`;
    } else if (allDiration?.minutes) {
      formattedDuration = `${allDiration.minutes}${t("minimin")}`;
    }
    const final = allDiration?.nights
      ? `${allDiration.nights} ${t("nights")}`
      : formattedDuration;

    setDuration(final);
  }, []);

  return (
    <div className="w-full p-4 bg-white mt-5 rounded-10 shadow-sm">
      <div className="preferedDate flex items-center gap-4">
        <GiDuration className="text-writingGrey text-[30px]" />
        <div className="datesAgain flex gap-1 lg:text-[18px]">
          <p className="font-bold">{t("duration")}:</p>
          <p className="text-writingGrey">{duration}</p>
        </div>
      </div>
    </div>
  );
};

export default Duration;
