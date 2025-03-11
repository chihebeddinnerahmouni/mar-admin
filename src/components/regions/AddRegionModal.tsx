import React, { useState, useCallback } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import InputText from "../ui/inputs/InputText";
import { axios_error_handler } from "../../functions/axios_error_handler";
import ModalComp from "../ui/modals/ModalComp";
import Title from "../ui/modals/Title";
import ButtonFunc from "../ui/buttons/Button";
import {toast} from "react-hot-toast";

interface UpdateModalProps {
  setClose: () => void;
}


const AddRegionModal: React.FC<UpdateModalProps> = ({ setClose }) => {
  const [loading, setLoading] = useState(false);
  const [enName, setEnName] = useState("");
  const [arName, setArName] = useState("");
  const { t } = useTranslation();

  const sendData = useCallback(async () => {
    const url = import.meta.env.VITE_SERVER_URL_LISTING;
    axios
      .post(
        `${url}/api/region/regions`,
        {
          name: enName,
          arabic_name: arName,
          description: "Marissa",
        },
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
        axios_error_handler(err, t);
        setLoading(false);
      });
  }, [enName, arName]);

  const handleSubmit = useCallback(() => {
    const check = enName && arName;
    if (!check) return toast.error(t("please_fill_all_fields"), {
      style: { border: "1px solid #FF385C", color: "#FF385C" },
    });
    setLoading(true);
    sendData();
  }, [enName, arName, sendData, t]);

  return (
    <ModalComp onClose={setClose}>
      <Title title={t("add_region")} />
        <div className="flex gap-2">
          <InputText
            label={t("english_name")}
            value={enName}
            setValue={(e: any) => setEnName(e.target.value)}
          />
          <InputText
            label={t("arabic_name")}
            value={arName}
            setValue={(e: any) => setArName(e.target.value)}
          />
        </div>

        <div className="button mt-5 w-full flex justify-end gap-2">
          <div className="">
            <ButtonFunc onClick={setClose} color="grey" text={t("cancel")} />
          </div>
          <div className="">
            <ButtonFunc
              onClick={handleSubmit}
              text={t("save")}
              loading={loading}
            />
          </div>
        </div>
    </ModalComp>
  );
};
export default AddRegionModal;
