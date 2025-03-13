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
import { Menu, MenuItem } from "@mui/material";


const url = import.meta.env.VITE_SERVER_URL_LISTING;


const ButtomTrip = ({ setSelected, details }: any) => {


  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Icon = anchorEl ? FaChevronUp : FaChevronDown;

  return (
    <div
      className={`w-full fixed px-4 h-[60px] bg-creme shadow-hoverShadow bottom-0 py-2 flex justify-center items-center lg:ml-[0px] lg:w-auto  ${
        i18n.language === "ar"
          ? "lg:left-0 lg:right-[350px]"
          : "lg:right-0 lg:left-[350px]"
      }`}
    >
      <button
        className="relative w-full h-full rounded-20 bg-main text-white font-medium md:w-[530px] xl:w-[630px]"
        onClick={handleOpen}
      >
        {t("options")} <Icon className="inline-block ml-2" />
      </button>
      <Options
        setSelected={setSelected}
        details={details}
        anchorEl={anchorEl}
        handleClose={handleClose}
      />
    </div>
  );
};

export default ButtomTrip;

const Options = ({
  setSelected,
  details,
  anchorEl,
  handleClose,
}: {
  setSelected: any;
  details: any;
  anchorEl: any;
  handleClose: any;
}) => {
  const { t } = useTranslation();
  const { inboxId } = useParams();

  return (
    <Menu
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      BackdropProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          backdropFilter: "blur(5px)",
        },
      }}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MessagesComp t={t} setSelected={setSelected} handleClose={handleClose} />
      {details.status === "pending" && <AcceptComp t={t} inboxId={inboxId} />}
      {details.status === "pending" ||
        (details.status === "confirmed" && (
          <CancelComp t={t} inboxId={inboxId} />
        ))}
      {details.status === "ongoing" && (
        <ServiceEndComp t={t} inboxId={inboxId} />
      )}
    </Menu>
  );
};




const MessagesComp = ({
  t,
  setSelected,
  handleClose,
}: {
  t: any;
    setSelected: any;
    handleClose: any;
}) => {
  return (
    <MenuItem
      onClick={() => {
        handleClose();
        setSelected("messages");
      }}
      sx={{
        "&:hover": {
          backgroundColor: "rgba(0,0,0,0.1)",
        },
      }}
    ><div className="flex w-full items-center justify-center cursor-pointer gap-3">
      <LuSendHorizonal className="text-2xl" />
        <p className="">{t("messages")}</p>
      </div>
    </MenuItem>
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
    <MenuItem
      onClick={acceptInquiry}
      sx={{
        "&:hover": {
          backgroundColor: "rgba(0,0,0,0.1)",
        },
      }}
    >
      <div className="flex w-full items-center justify-center cursor-pointer gap-3">
        <FaCheck className="text-2xl" />
        <p className="">{t("accept_inquiry")}</p>
      </div>
    </MenuItem>
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
    <MenuItem
      onClick={cancel}
      sx={{
        "&:hover": {
          backgroundColor: "rgba(0,0,0,0.1)",
        },
      }}
    >
      <div className="flex w-full items-center justify-center cursor-pointer gap-3">
        <MdOutlineCancel className="text-2xl" />
        <p className="">{t("cancel_inquiry")}</p>
      </div>
    </MenuItem>
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
    <MenuItem
      onClick={serviceEnd}
      sx={{
        "&:hover": {
          backgroundColor: "rgba(0,0,0,0.1)",
        },
      }}
    >
      <div className="flex w-full items-center justify-center cursor-pointer gap-3">
        <MdOutlineStopCircle className="text-2xl" />
        <p className="">{t("end_of_service")}</p>
      </div>
    </MenuItem>
  );
};
