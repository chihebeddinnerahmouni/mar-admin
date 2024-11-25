import React, { useState } from "react";
import ReactModal from "react-modal";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import LoadingButton from "../ui/LoadingButton";

interface AddQstProps {
  setClose: (isOpen: boolean) => void;
}

ReactModal.setAppElement("#root");

// const categoriesArray = ["All", "About", "Features", "Listings", "Regions", "Users"];

const AddQuestionCat: React.FC<AddQstProps> = ({ setClose }) => {
  const [arName, setArName] = useState("");
  const [enName, setEnName] = useState("");
  const { t } = useTranslation();
  const mainColor = "#FF385C";
  const url = import.meta.env.VITE_SERVER_URL_HELP;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!arName || !enName) return alert (t("please_fill_all_fields"));
    axios
      .post(`${url}/categories`, {
        name: enName,
        arabic_name: arName,
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: t("greate"),
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
      });
    setClose(false);
  };

  return (
    <ReactModal
      isOpen={true}
      onRequestClose={() => setClose(false)}
      className={
        "bg-white w-full rounded-lg p-4 shadow-hardShadow lg:p-6 md:max-w-[550px] xl:mx-auto"
      }
      overlayClassName={
        "fixed bg-black bg-opacity-10 backdrop-blur-[7px] inset-0 flex items-center justify-center p-4 mt-[60px] md:px-20 lg:mt-[80px] "
      }
    >
      <Typography variant="h4" component="h2" gutterBottom>
        {t("add_category")}
      </Typography>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col gap-2">
          <TextField
            label={t("arabic_name")}
            variant="outlined"
            fullWidth
            value={arName}
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
            onChange={(e) => setArName(e.target.value)}
          />
          <TextField
            label={t("english_name")}
            variant="outlined"
            fullWidth
            value={enName}
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
            onChange={(e) => setEnName(e.target.value)}
          />
        </div>

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="outlined"
            onClick={() => setClose(false)}
            sx={{
              color: mainColor,
              backgroundColor: "white",
              borderColor: "#FF385C",
            }}
          >
            {t("cancel")}
          </Button>
          <Button
            variant="contained"
            sx={{ color: "white", backgroundColor: mainColor }}
            type="submit"
          >
            {t("save")}
          </Button>
        </Box>
      </form>
    </ReactModal>
  );
};

export default AddQuestionCat;
