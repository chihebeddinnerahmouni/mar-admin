import { useTranslation } from "react-i18next";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import { MdOutlineCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { MdOutlineStopCircle } from "react-icons/md";



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
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const { inboxId } = useParams();


  // console.log(details);

  const acceptInquiry = () => {
    axios
      .post(`${url}/api/bookings/from-inquiry/${inboxId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          Swal.fire({
            icon: "error",
            title: t("network_error"),
            text: t("please_try_again"),
            customClass: {
              confirmButton: "custom-confirm-button",
            },
          });
        }
      });
  }
  

  const cancel = () => {

    const isBoatOwner = localStorage.getItem("isBoatOwner") === "true";
    if (isBoatOwner) {
      axios
        .patch(
          `${url}/api/bookings/inquiries/${inboxId}/cancel`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        )
        .then(() => {
          window.location.reload();
          Swal.fire({
            icon: "success",
            title: t("inquiry_cancelled"),
            customClass: {
              confirmButton: "custom-confirm-button",
            },
          });
        })
        .catch((err) => {
          if (err.message === "Network Error") {
            Swal.fire({
              icon: "error",
              title: t("network_error"),
              text: t("please_try_again"),
              customClass: {
                confirmButton: "custom-confirm-button",
              },
            });
          }
        });
    } else {
      axios
        .get(
          `${url}/api/bookings/inquiries/${inboxId}/cancel/user`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        )
        .then(() => {
          window.location.reload();
          Swal.fire({
            icon: "success",
            title: t("inquiry_cancelled"),
            customClass: {
              confirmButton: "custom-confirm-button",
            },
          });
        })
        .catch((err) => {
          if (err.message === "Network Error") {
            Swal.fire({
              icon: "error",
              title: t("network_error"),
              text: t("please_try_again"),
              customClass: {
                confirmButton: "custom-confirm-button",
              },
            });
          }
        });
     }
  }
  


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
        Swal.fire({
          icon: "success",
          title: t("service_ended"),
          customClass: {
            confirmButton: "custom-confirm-button",
          },
        });
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          Swal.fire({
            icon: "error",
            title: t("network_error"),
            text: t("please_try_again"),
            customClass: {
              confirmButton: "custom-confirm-button",
            },
          });
        }
      });
  }

  return (
    <div
      className={`options absolute p-3 rounded-10 bg-white shadow-hardShadow text-writingMainDark bottom-[50px] flex flex-col gap-3 items-start lg:bottom-[60px] ${
        i18n.language === "en" ? "left-0" : "right-0"
      }`}
    >
      {/* messages */}
      {/* {details.status !== "cancelled" && ( */}
      <div
        className="flex items-center h-full px-4 cursor-pointer gap-3"
        onClick={() => setSelected("messages")}
      >
        <LuSendHorizonal className="text-2xl" />
        <p className="">{t("messages")}</p>
      </div>
      {/* )} */}

      {/* accept */}
      {details.status === "pending" && (
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
      )}

      {/* cancel inquiry */}

      {details.status === "pending" || details.status === "confirmed" ? (
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
      ) : null}

      {details.status === "ongoing" && (
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
      )}

      {/* {details.status === "finished" && (
        <>
          <hr className="w-full border-1 border-gray-200" />
          <div
            className="flex items-center h-full px-4 cursor-pointer gap-3"
            onClick={() => navigate(`/review/${details.listingDetails.id}`)}
          >
            <FaRegStar className="text-2xl" />
            <p className="">{t("evaluate")}</p>
          </div>
        </>
      )} */}
    </div>
  );
};
