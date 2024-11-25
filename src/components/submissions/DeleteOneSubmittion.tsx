

import ReactModal from "react-modal";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import LoadingButton from "../ui/LoadingButton";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

interface DeleteModalProps {
  setClose: (isOpen: number) => void;
  user: any;
}
ReactModal.setAppElement("#root");

const DeleteOneSubmittion: React.FC<DeleteModalProps> = ({
  setClose,
  user,
}) => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const mainColor = "#FF385C";
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const { t } = useTranslation();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setLoading(true);
   axios
     .put(
       `${url}/api/submit/user-submissions/${user.id}/refuse`,
       {
         reason: reason,
       },
       {
         headers: {
           Authorization: `Bearer ${localStorage.getItem("jwt")}`,
         },
       }
     )
     .then(() => {
        Swal.fire({
          icon: "success",
          title: t("greate"),
          showConfirmButton: false,
        });
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
          }).then(() => {
            window.location.reload();
          });
        }
       setLoading(false);
     });
  };




  return (
    <ReactModal
      isOpen={true}
      onRequestClose={() => setClose(0)}
      className={
        " bg-white rounded-lg p-4 shadow-hardShadow w-full max-w-[400px] lg:p-6"
      }
      overlayClassName={
        "fixed bg-black bg-opacity-10 backdrop-blur-[7px] inset-0 p-4 flex items-center justify-center mt-[60px] lg:mt-[80px]"
      }
    >
      <h1 className="text-2xl font-bold text-center lg:text-3xl">
        {t("refuse_submission")}
      </h1>
      <p className="text-gray-500 text-center mt-5 lg:text-lg">
        {t("are_you_sure_you_want_to")}{" "}
        <strong className="text-red-400">{t("refuse")}</strong> ?
      </p>

      <TextField
        label={t("reason_for_refusing")}
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "grey",
            },
            "&:hover fieldset": {
              borderColor: "grey",
            },
            "&.Mui-focused fieldset": {
              borderColor: mainColor,
            },
          },
          "& .MuiInputLabel-root": {
            color: "gray",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: mainColor,
          },
        }}
      />

      <div className="buttons flex w-full mt-3 gap-2">
        <button
          className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
          onClick={(e) => {
            e.stopPropagation();
            setClose(0);
          }}
        >
          {t("cancel")}
        </button>
        <button
          className="w-full bg-red-500 text-white px-4 py-2 rounded-lg flex items-center justify-center"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? (
            <LoadingButton />
          ) : (
            <>
                <span>{t("refuse")}</span>
              <DeleteIcon />
            </>
          )}
        </button>
      </div>
    </ReactModal>
  );
};

export default DeleteOneSubmittion;