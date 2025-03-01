import { useTranslation } from "react-i18next";
import React, { useState, useCallback } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from "../ui/LoadingButton";
import InputText from "../ui/inputs/InputText";
import { axios_error_handler } from "../../functions/axios_error_handler";




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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const request = useCallback(async (formData: any) => { 
    const url = import.meta.env.VITE_SERVER_URL_CATEGORY as string;
    axios
      .post(`${url}/admin/categories`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then(() => {
        // console.log(res);
        setLoading(false);
        setClose(false);
        window.location.reload();
      })
      .catch((err) => {
        axios_error_handler(err, t);
        setLoading(false);
      });
  }, []);

  const handleContinue = useCallback(() => {
    const check = !engName || !image || !arName
    if (check) return alert(t("please_fill_all_fields"));
    setLoading(true); 
    const formData = new FormData();
    formData.append("name", engName);
    formData.append("arabic_name", arName);
    formData.append("image", image);
    request(formData);
  }, [engName, arName, image, request]);

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
        <InputText
          label={t("category_name_in_english")}
          value={engName}
          setValue={(e:any) => setEngName(e.target.value)}
        />
        <InputText
          label={t("category_name_in_arabic")}
          value={arName}
          setValue={(e: any) => setArName(e.target.value)}
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
