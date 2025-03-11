import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import InputText from "../ui/inputs/InputText";
import ButtonFunc from "../ui/buttons/Button";
import ModalComp from "../ui/modals/ModalComp";
import Title from "../ui/modals/Title";
import { axios_toast_error } from "../../functions/axios_toast_error";
import {toast} from "react-hot-toast";

interface UpdatePricesProps {
  setClose: () => void;
}

const AddFeature: React.FC<UpdatePricesProps> = ({ setClose }) => {
  const { t } = useTranslation();
  const [engName, setEngName] = useState("");
  const [arName, setArName] = useState("");
  const [image, setImage] = useState<any>();
  const [imagePreview, setImagePreview] = useState<any>();
  const [loading, setLoading] = useState(false);

  const url = import.meta.env.VITE_SERVER_URL_LISTING;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleContinue = () => {
    const check = !engName || !image || !arName;
    if (check) return toast.error(t("please_fill_all_fields"), {
      style: { border: "1px solid #FF385C", color: "#FF385C" },
    });

    setLoading(true);

    const formData = new FormData();
    formData.append("name", engName);
    formData.append("arabic_name", arName);
    formData.append("image", image);

    axios
      .post(`${url}/admin/listing/features`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        axios_toast_error(err, t);
      });
  };

  return (
    <ModalComp onClose={setClose}>
      <div className="bg-white relative flex flex-col items-center">
        <Title title={t("add_feature")} />
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
        <div className="mt-3 w-full flex gap-3">
          <InputText
            label={t("english_name")}
            value={engName}
            setValue={(e: any) => setEngName(e.target.value)}
          />
          <InputText
            label={t("arabic_name")}
            value={arName}
            setValue={(e: any) => setArName(e.target.value)}
          />
        </div>
        <div className="mt-5 w-full flex gap-2 justify-end">
          <div className="w-[100px]">
            <ButtonFunc text={t("cancel")} onClick={setClose} color="grey" />
          </div>
          <div className="w-[100px]">
            <ButtonFunc
              text={t("save")}
              onClick={handleContinue}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </ModalComp>
  );
};

export default AddFeature;
