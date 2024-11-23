// import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { format } from "date-fns";
// import { ar, enUS } from "date-fns/locale";

// const BookingItem = ({ item }: any) => {
//   const { t, i18n } = useTranslation("");
//   const navigate = useNavigate();
//   const [depuis, setDepuis] = useState("");
//   const [duration, setDuration] = useState("");
//   const url = import.meta.env.VITE_SERVER_URL_LISTING;
// //   const userId = Number(localStorage.getItem("userId"));
//   const locale = i18n.language === "en" ? enUS : ar;

//   // console.log(item);
//   // console.log(userId);

//   useEffect(() => {
//     // to calculate the time difference
//     const date = new Date(
//       item.createdAt.seconds * 1000 + item.createdAt.nanoseconds / 1000000
//     );
//     const now = new Date();
//     const diff = now.getTime() - date.getTime();
//     const diffMinutes = Math.ceil(diff / (1000 * 60));
//     const diffHours = Math.ceil(diff / (1000 * 3600));
//     const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
//     let formattedDifference = "";

//     if (diff < 1000 * 60 * 60) {
//       formattedDifference = `${diffMinutes} ${t("minutes")}`;
//     } else if (diff < 1000 * 60 * 60 * 24) {
//       formattedDifference = `${diffHours} ${t("hours")}`;
//     } else {
//       formattedDifference = `${diffDays} ${t("days")}`;
//     }
//     setDepuis(formattedDifference);

//     // set the duration
//     const allDiration = item.booking_info.duration;
//     let formattedDuration = "";
//     if (allDiration?.hours && allDiration?.minutes) {
//       formattedDuration = `${allDiration.hours}${t("h")}:${
//         allDiration.minutes
//       } ${t("minimin")}`;
//     } else if (allDiration?.hours) {
//       formattedDuration = `${allDiration.hours}h`;
//     } else if (allDiration?.minutes) {
//       formattedDuration = `${allDiration.minutes}${t("minimin")}`;
//     }
//     const final = allDiration?.nights
//       ? `${allDiration.nights} ${t("nights")}`
//       : formattedDuration;
//     setDuration(final);
//   }, []);

//   const handleClick = () => {
//     navigate(`/bookings/${item.conversationId}`);
//   };

//   return (
//     <div
//       className="w-full cursor-pointer rounded-[5px] overflow-hidden shadow-hardShadow hover:shadow-hoverShadow transition-all duration-100"
//       onClick={handleClick}
//     >
//       <img
//         src={`${url}/${item.listingDetails.image}`}
//         // src={`/${item.listingDetails.image}`}
//         className="w-full h-[180px] object-cover object-center"
//         alt="boat"
//       />
//       {/* infos */}
//       <div className="relative info flex flex-col py-2 px-2">
//         <p className="text-sm font-semibold mx-auto text-writingMainDark">
//             {item.listingDetails.name}
//         </p>
//         <p className="inboxdate text-sm mt-5 text-writingMainDark">
//           <span>
//             {format(new Date(item.booking_info.preferredDate), "dd MMM yyyy", {
//               locale,
//             })}
//           </span>
//           , <span>{duration}</span>
//         </p>
//         <div className="guestsState flex w-full justify-between mt-1">
//           <p className="text-sm text-writingMainDark">
//             {Number(item.booking_info.groupSize.adults) +
//               Number(item.booking_info.groupSize.children) +
//               Number(item.booking_info.groupSize.infants)}{" "}
//             {t("guests")}
//           </p>
//           {item.status === "pending" && (
//             <p className={`text-sm text-orange-400`}>{t("pending")}</p>
//           )}
//           {item.status === "expired" && (
//             <p className={`text-sm text-red-400`}>{t("offer_expired")}</p>
//           )}
//           {item.status === "confirmed" && (
//             <p className={`text-sm text-green-400`}>{t("offer_confirmed")}</p>
//           )}
//           {item.status === "ongoing" && (
//             <p className={`text-sm text-blue-400`}>{t("offer_ongoing")}</p>
//           )}
//           {item.status === "cancelled" && (
//             <p className={`text-sm text-red-400`}>{t("offer_cancelled")}</p>
//           )}
//           {item.status === "finished" && (
//             <p className={`text-sm text-gray-400`}>{t("offer_finished")}</p>
//           )}
//         </div>
//         <div className="withCaptain flex w-full justify-between mt-1">
//           <p className="text-sm text-writingMainDark">{t("with_captain")}</p>
//           <p className="text-sm text-writingGrey">{depuis}</p>
//         </div>
       
//       </div>
//     </div>
//   );
// };

// export default BookingItem;
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";

const BookingItem = ({ item }: any) => {
  const { t, i18n } = useTranslation("");
  const navigate = useNavigate();
  const [depuis, setDepuis] = useState("");
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
//   const userId = Number(localStorage.getItem("userId"));
  const locale = i18n.language === "en" ? enUS : ar;

  // console.log(item);
  // console.log(userId);

  useEffect(() => {
    // to calculate the time difference
    const date = new Date(
      item.createdAt.seconds * 1000 + item.createdAt.nanoseconds / 1000000
    );
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffMinutes = Math.ceil(diff / (1000 * 60));
    const diffHours = Math.ceil(diff / (1000 * 3600));
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    let formattedDifference = "";

    if (diff < 1000 * 60 * 60) {
      formattedDifference = `${diffMinutes} ${t("minutes")}`;
    } else if (diff < 1000 * 60 * 60 * 24) {
      formattedDifference = `${diffHours} ${t("hours")}`;
    } else {
      formattedDifference = `${diffDays} ${t("days")}`;
    }
    setDepuis(formattedDifference);
  }, []);

  const handleClick = () => {
    navigate(`/bookings/${item.conversationId}`);
  };

  return (
    <div
      className="w-full cursor-pointer rounded-[5px] overflow-hidden shadow-hardShadow hover:shadow-hoverShadow transition-all duration-100"
      onClick={handleClick}
    >
      <img
        src={`${url}/${item.listingDetails.image}`}
        // src={`/${item.listingDetails.image}`}
        className="w-full h-[180px] object-cover object-center"
        alt="boat"
      />
      {/* infos */}
      <div className="relative info flex flex-col py-2 px-2">
        <p className="text-sm font-semibold mx-auto text-writingMainDark">
            {item.listingDetails.name}
        </p>
        <p className="inboxdate text-sm mt-5 text-writingMainDark">
          <span>
            Client: {item.clientDetails.name} {item.clientDetails.surname}
          </span>
        </p>
        <div className="guestsState flex w-full justify-between mt-1">
          <p className="text-sm text-writingMainDark">
            {t("captain")}: {item.boatOwnerDetails.name} {item.boatOwnerDetails.surname}
          </p>
          {item.status === "pending" && (
            <p className={`text-sm text-orange-400`}>{t("pending")}</p>
          )}
          {item.status === "expired" && (
            <p className={`text-sm text-red-400`}>{t("offer_expired")}</p>
          )}
          {item.status === "confirmed" && (
            <p className={`text-sm text-green-400`}>{t("offer_confirmed")}</p>
          )}
          {item.status === "ongoing" && (
            <p className={`text-sm text-blue-400`}>{t("offer_ongoing")}</p>
          )}
          {item.status === "cancelled" && (
            <p className={`text-sm text-red-400`}>{t("offer_cancelled")}</p>
          )}
          {item.status === "finished" && (
            <p className={`text-sm text-gray-400`}>{t("offer_finished")}</p>
          )}
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
