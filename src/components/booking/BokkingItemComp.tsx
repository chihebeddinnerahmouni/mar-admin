import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const BookingItem = ({ item }: any) => {
  const { t, i18n } = useTranslation("");
  const navigate = useNavigate();
  const [depuis, setDepuis] = useState("");
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const locale = i18n.language === "en" ? enUS : ar;

  useEffect(() => {
    const calculateTimeDifference = () => {
      const date = new Date(
        item.createdAt.seconds * 1000 + item.createdAt.nanoseconds / 1000000
      );
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      switch (true) {
        case diff < 1000 * 60 * 60:
          return `${Math.ceil(diff / (1000 * 60))} ${t("minutes")}`;
        case diff < 1000 * 60 * 60 * 24:
          return `${Math.ceil(diff / (1000 * 3600))} ${t("hours")}`;
        default:
          return `${Math.ceil(diff / (1000 * 3600 * 24))} ${t("days")}`;
      }
    };

    setDepuis(calculateTimeDifference());
  }, [item.createdAt, t]);

  const handleClick = () => {
    navigate(`/inquiries/${item.conversationId}`);
  };

  return (
    <div
      className="w-full cursor-pointer rounded-[5px] overflow-hidden shadow-hardShadow hover:shadow-hoverShadow transition-all duration-100 max-w-[400px] mx-auto"
      onClick={handleClick}
    >
      <LazyLoadImage
        src={`${url}/${item.listingDetails.image}`}
        alt="boat"
        effect="blur"
        width={"100%"}
        className="h-[180px] object-cover object-center"
      />
      {/* infos */}
      <div className="relative info flex flex-col py-2 px-2">
        <p className="text-sm font-semibold mx-auto text-writingMainDark">
          {item.listingDetails.name}
        </p>
        <p className="inboxdate text-sm mt-5 text-writingMainDark">
          <span>
            {t("client")}: {item.clientDetails.name}{" "}
            {item.clientDetails.surname}
          </span>
        </p>
        <div className="guestsState flex w-full justify-between mt-1">
          <p className="text-sm text-writingMainDark">
            {t("captain")}: {item.boatOwnerDetails.name}{" "}
            {item.boatOwnerDetails.surname}
          </p>
          <StatusComp status={item.status} t={t} />
        </div>
        <div className="withCaptain flex w-full justify-between mt-1">
          <p className="text-sm text-writingMainDark">
            {format(new Date(item.booking_info.preferredDate), "dd MMM yyyy", {
              locale,
            })}
          </p>
          <p className="text-sm text-writingGrey">{depuis}</p>
        </div>
      </div>
    </div>
  );
};

export default BookingItem;

const StatusComp = ({ status, t }: { status: string; t: any }) => {
  switch (status) {
    case "pending":
      return <p className={`text-sm text-orange-400`}>{t("pending")}</p>;
    case "expired":
      return <p className={`text-sm text-red-400`}>{t("offer_expired")}</p>;
    case "confirmed":
      return <p className={`text-sm text-green-400`}>{t("offer_confirmed")}</p>;
    case "ongoing":
      return <p className={`text-sm text-blue-400`}>{t("offer_ongoing")}</p>;
    case "cancelled":
      return <p className={`text-sm text-red-400`}>{t("offer_cancelled")}</p>;
    case "finished":
      return <p className={`text-sm text-gray-400`}>{t("offer_finished")}</p>;
    default:
      return null;
  }
};
