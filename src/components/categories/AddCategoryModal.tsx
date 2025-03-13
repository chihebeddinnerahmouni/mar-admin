import { useTranslation } from "react-i18next";
import React, { useState, useCallback } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import InputText from "../ui/inputs/InputText";
import { axios_error_handler } from "../../functions/axios_error_handler";
import ButtonFunc from "../ui/buttons/Button";
import ModalComp from "../ui/modals/ModalComp";
import Title from "../ui/modals/Title";
import { toast } from "react-hot-toast";


interface UpdatePricesProps {
  setClose: () => void;
  refetch: any;
}

const AddCategoryModal: React.FC<UpdatePricesProps> = ({
  setClose,
  refetch,
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
        refetch();
        setClose();
      })
      .catch((err) => {
        axios_error_handler(err, t);
        setLoading(false);
      });
  }, []);

  const handleContinue = useCallback(() => {
    const check = !engName || !image || !arName;
    if (check)
      return toast.error(t("please_fill_all_fields"), {
        style: { border: "1px solid #FF385C", color: "#FF385C" },
      });
    setLoading(true);
    const formData = new FormData();
    formData.append("name", engName);
    formData.append("arabic_name", arName);
    formData.append("image", image);
    request(formData);
  }, [engName, arName, image, request]);

  return (
    <ModalComp onClose={setClose}>
      <div className="bg-white rounded-[5px] shadow-sm flex flex-col items-center relative">
        <Title title={t("add_category")} />
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
        <div className="inputs mt-4 flex gap-4 w-full">
          <InputText
            label={t("category_name_in_english")}
            value={engName}
            setValue={(e: any) => setEngName(e.target.value)}
          />
          <InputText
            label={t("category_name_in_arabic")}
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

export default AddCategoryModal;
