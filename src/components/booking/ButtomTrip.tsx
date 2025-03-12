import { useTranslation } from "react-i18next";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import { MdOutlineCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MdOutlineStopCircle } from "react-icons/md";
import { axios_toast_error } from "../../functions/axios_toast_error";

const url = import.meta.env.VITE_SERVER_URL_LISTING;


const ButtomTrip = ({ setSelected, details }: any) => {
  const { t, i18n } = useTranslation();
  const [isOptionsOn, setIsOptionsOn] = useState(false);

  return (
    <div
      className={`w-full fixed px-4 h-[60px] bg-creme shadow-hoverShadow bottom-0 py-2 lg:h-[70px] flex justify-center items-center lg:ml-[0px] lg:w-auto  ${
        i18n.language === "ar"
          ? "lg:left-0 lg:right-[350px]"
          : "lg:right-0 lg:left-[350px]"
      }`}
    >
      <button
        className="relative w-full h-full rounded-20 bg-main text-white font-medium md:w-[530px] xl:w-[630px]"
        onClick={() => setIsOptionsOn(!isOptionsOn)}
      >
        {t("options")}{" "}
        {isOptionsOn ? (
          <FaChevronDown className="inline-block ml-2" />
        ) : (
          <FaChevronUp className="inline-block ml-2" />
        )}
        {isOptionsOn && details.status !== "cancelled" && <Options setSelected={setSelected} details={details} />}
      </button>
    </div>
  );
};

export default ButtomTrip;

const Options = ({ setSelected, details }: any) => {

  const { i18n, t } = useTranslation();
  const { inboxId } = useParams();

  return (
    <div
      className={`options absolute p-3 rounded-10 bg-white shadow-hardShadow text-writingMainDark bottom-[50px] flex flex-col gap-3 items-start lg:bottom-[60px] ${
        i18n.language === "en" ? "left-0" : "right-0"
      }`}
    >
      <MessagesComp t={t} setSelected={setSelected} />
      {details.status === "pending" && <AcceptComp t={t} inboxId={inboxId} />}
      {details.status === "pending" ||
        (details.status === "confirmed" && (
          <CancelComp t={t} inboxId={inboxId} />
        ))}
      {details.status === "ongoing" && (
        <ServiceEndComp t={t} inboxId={inboxId} />
      )}
    </div>
  );
};




const MessagesComp = ({ t, setSelected }: { t: any; setSelected: any }) => {
  return (
    <div
      className="flex items-center h-full px-4 cursor-pointer gap-3"
      onClick={() => setSelected("messages")}
    >
      <LuSendHorizonal className="text-2xl" />
      <p className="">{t("messages")}</p>
    </div>
  );
};




const AcceptComp = ({
  t,
  inboxId,
}: {
  t: any;
  inboxId: any;
}) => {
  const acceptInquiry = () => {
    axios
      .post(
        `${url}/api/bookings/from-inquiry/${inboxId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      )
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        axios_toast_error(err, t);
      });
  };

  return (
    <>
      <hr className="w-full border-1 border-gray-200" />
      <div
        className="flex items-center h-full px-4 cursor-pointer gap-3"
        onClick={acceptInquiry}
      >
        <FaCheck className="text-2xl" />
        <p className="">{t("accept_inquiry")}</p>
      </div>
    </>
  );
};








const CancelComp = ({
  t,
  inboxId,
}: {
  t: any;
  inboxId: any;
  }) => {
   
  const cancel = () => {
      axios
        .get(`${url}/api/bookings/inquiries/${inboxId}/cancel/user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          axios_toast_error(err, t);
        });
  };

  return (
    <>
      <hr className="w-full border-1 border-gray-200" />
      <div
        className="flex items-center h-full px-4 cursor-pointer gap-3"
        onClick={cancel}
      >
        <MdOutlineCancel className="text-2xl" />
        <p className="">{t("cancel_inquiry")}</p>
      </div>
    </>
  );
};
const ServiceEndComp = ({
  t,
  inboxId,
}: {
  t: any;
  inboxId: any;
  }) => {
   
  const serviceEnd = () => {
    // Cannot finish booking as the end date has not yet passed
    axios
      .patch(
        `${url}/api/bookings/inquiries/${inboxId}/finish`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      )
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        axios_toast_error(err, t);
      });
  };

  return (
    <>
      <hr className="w-full border-1 border-gray-200" />
      <div
        className="flex items-center h-full px-4 cursor-pointer gap-3"
        onClick={serviceEnd}
      >
        <MdOutlineStopCircle className="text-2xl" />
        <p className="">{t("end_of_service")}</p>
      </div>
    </>
  );
};
