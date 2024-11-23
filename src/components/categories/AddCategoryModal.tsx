import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Swal from "sweetalert2";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from "../ui/LoadingButton";



interface UpdatePricesProps {
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddCategoryModal: React.FC<UpdatePricesProps> = ({
  setClose,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [engName, setEngName] = useState("");
  const [arName, setArName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const mainColor = "#FF385C";
  const url = import.meta.env.VITE_SERVER_URL_CATEGORY as string;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleContinue = () => {

    // console.log(engName, arName, image);

    const check = !engName || !image || !arName
    if (check) return;

    setLoading(true); 

    const formData = new FormData();
    formData.append("name", engName);
    formData.append("arabic_name", arName);
    formData.append("image", image);
    axios
      .post(
        `${url}/admin/categories`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      )
      .then(() => {
        // console.log(res);
        setLoading(false);
        Swal.fire({
          title: t("great"),
          text: t("prices_updated_successfully"),
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          timerProgressBar: true,
          customClass: {
            confirmButton: "custom-confirm-button",
          },
        });
        setClose(false);
        window.location.reload();
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
        Swal.fire({
          title: t("oops"),
          text: t(err.response.data.error),
          icon: "error",
          timer: 2000,
          timerProgressBar: true,
          customClass: {
            confirmButton: "custom-confirm-button",
          },
        });
      });
  };

  return (
    <div className="mb-5 bg-white rounded-[5px] shadow-sm p-4 flex flex-col items-center relative">
      <div className="cancel absolute top-2 right-2">
        <IconButton
          size="small"
          sx={{ color: "red" }}
          onClick={() => setClose(false)}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <p className="mb-5 text-[25px] font-bold">{t("add_category")}</p>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
        id="icon-button-file"
      />
      <label htmlFor="icon-button-file" className="">
        <IconButton component="span">
          {imagePreview ? (
            <Avatar src={imagePreview} sx={{ width: 106, height: 106 }} />
          ) : (
            <Avatar sx={{ width: 106, height: 106 }}>
              <PhotoCamera />
            </Avatar>
          )}
        </IconButton>
      </label>
      <div className="inputs flex gap-4 w-full">
        <TextField
          label={t("category_name_in_english")}
          value={engName}
          onChange={(e) => setEngName(e.target.value)}
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
        <TextField
          label={t("category_name_in_arabic")}
          value={arName}
          onChange={(e) => setArName(e.target.value)}
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
      </div>

      <button
        onClick={handleContinue}
        disabled={loading}
        className="w-full h-10 bg-main text-white rounded-lg shadow-md hover:bg-mainHover transition duration-200 ease-in-out mt-5"
      >
        {/* {t("save")} */}
        {loading ? <LoadingButton /> : t("save")}
      </button>
    </div>
  );
};

export default AddCategoryModal;
