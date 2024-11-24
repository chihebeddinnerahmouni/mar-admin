import ReactModal from "react-modal";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import LoadingButton from "../ui/LoadingButton";
import Swal from "sweetalert2";
import { MdBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import { useTranslation } from "react-i18next";

interface DeleteModalProps {
  setClose: (isOpen: boolean) => void;
    blocked: any;
  id: number;
  title: string;
}
ReactModal.setAppElement("#root");

const BlockUnblocModal: React.FC<DeleteModalProps> = ({
  setClose,
  blocked,
    title,
    id,
}) => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
    const mainColor = "#FF385C";
    const { t } = useTranslation();
  const url = import.meta.env.VITE_SERVER_URL_LISTING;

const handleBlock = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoading(true);
        axios
          .put(
            `${url}/api/listing/listings/${id}/status`,
            {
            //   validated: true,
              blocked: true,
              block_reason: "This is a test reason",
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
              },
            }
          )
            .then(() => {
            setLoading(false);
            Swal.fire(
              t("Blocked!"),
              t("The listing has been blocked."),
              "success"
            );
            window.location.reload();
            // console.log(res.data);
          })
          .catch((err) => {
              console.log(err);
                setLoading(false);
            Swal.fire("Error!", err.message, "error");
          });
    };
    


    const handleUnblock = (e: React.MouseEvent) => {
        e.stopPropagation();
        setLoading(true);
        axios
          .put(
            `${url}/api/listing/listings/${id}/status`,
            {
            //   validated: true,
              blocked: false,
              block_reason: "This is a test reason",
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
              },
            }
          )
          .then(() => {
            window.location.reload();
            // console.log(res.data);
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
               })
            //        .then(() => {
            //      window.location.reload();
            //    });
             }
            setLoading(false);
          });
        }


  return (
    <ReactModal
      isOpen={true}
      onRequestClose={() => setClose(false)}
      className={" bg-white rounded-lg p-4 shadow-hardShadow lg:p-6"}
      overlayClassName={
        "fixed bg-black bg-opacity-10 backdrop-blur-[7px] inset-0 flex items-center justify-center mt-[60px] lg:mt-[80px]"
      }
    >
      {!blocked && (
        <>
          <h1 className="text-2xl font-bold text-center lg:text-3xl">
            Block Listing
          </h1>
          <p className="text-gray-500 text-center mt-5 lg:text-lg">
            Do you want to <strong className="text-red-400">Block</strong>{" "}
            {title} ?
          </p>

          <TextField
            label="Reason for Blocking"
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
                setClose(false);
              }}
            >
              Cancel
            </button>
            <button
              className="w-full bg-red-500 text-white px-4 py-2 rounded-lg flex items-center justify-center"
              onClick={handleBlock}
              disabled={loading}
            >
              {loading ? (
                <LoadingButton />
              ) : (
                <>
                  <span className="mx-1">Block</span>
                  <MdBlock />
                </>
              )}
            </button>
          </div>
        </>
      )}

      {blocked && (
        <>
          <h1 className="text-2xl font-bold text-center lg:text-3xl">
            Unblock Listing
          </h1>
          <p className="text-gray-500 text-center mt-2 lg:text-lg">
            Do you want to <strong className="text-green-400">Unblock</strong>{" "}
            {title} ?
          </p>

          {/* <TextField
            label="Reason for deletion"
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
          /> */}

          <div className="buttons flex w-full mt-6 gap-2">
            <button
              className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
              onClick={(e) => {
                e.stopPropagation();
                setClose(false);
              }}
            >
              Cancel
            </button>
            <button
              className="w-full bg-green-500 text-white px-4 py-2 rounded-lg flex items-center justify-center"
                onClick={handleUnblock}
              disabled={loading}
            >
              {loading ? (
                <LoadingButton />
              ) : (
                <>
                  <span className="mx-1">Unblock</span>
                  <CgUnblock />
                </>
              )}
            </button>
          </div>
        </>
      )}
    </ReactModal>
  );
};


export default BlockUnblocModal;
