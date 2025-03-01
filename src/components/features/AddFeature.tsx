import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import InputText from "../ui/inputs/InputText";
import ButtonFunc from "../ui/buttons/Button";


interface UpdatePricesProps {
    setClose: React.Dispatch<React.SetStateAction<boolean>>;
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
    if (check) return alert(t("please_fill_all_fields"));

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
            // console.log(res.data);
            setLoading(false);
            Swal.fire({
              title: t("great"),
              text: t("success"),
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
            setLoading(false);
            // console.log(err.response.data);
            Swal.fire({
              title: t("oops"),
              text: t(err.response.data),
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
      <div className="mb-5 bg-white p-5 rounded-[10px] shadow-md relative flex flex-col items-center">
        <div className="cancel absolute top-2 right-2">
          <IconButton
            size="small"
            sx={{ color: "red" }}
            onClick={() => setClose(false)}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <p className="mb-5 text-[25px] font-bold">{t("add_feature")}</p>

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
        <div className=" w-full flex gap-3">
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
        <div className="w-full mt-5">
          <ButtonFunc
            text={t("save")}
            onClick={handleContinue}
            loading={loading}
          />
        </div>
      </div>
    );
};

export default AddFeature;