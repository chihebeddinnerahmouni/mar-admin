import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ModalComp from "../ui/modals/ModalComp";
import Title from "../ui/modals/Title";
import { toast } from "react-hot-toast";
import ButtonFunc from "../ui/buttons/Button";
import InputText from "../ui/inputs/InputText";
import { axios_toast_error } from "../../functions/axios_toast_error";

interface AddQstProps {
  setClose: () => void;
}

const AddQuestionCat: React.FC<AddQstProps> = ({ setClose }) => {
  const [arName, setArName] = useState("");
  const [enName, setEnName] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const url = import.meta.env.VITE_SERVER_URL_HELP;

  const handleSubmit = () => {
    if (!arName || !enName) return toast.error(t("please_fill_all_fields"), {
      style: { border: "1px solid #FF385C", color: "#FF385C" },
    });
    setLoading(true);
    axios
      .post(`${url}/categories`, {
        name: enName,
        arabic_name: arName,
      })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        axios_toast_error(err, t);
      });
    setClose;
  };

  return (
    <ModalComp onClose={setClose}>
      <Title title={t("add_category")} />
      <div className="mb-4 flex gap-2">
        <InputText
          label={t("arabic_name")}
          value={arName}
          setValue={(e: any) => setArName(e.target.value)}
        />
        <InputText
          label={t("english_name")}
          value={enName}
          setValue={(e: any) => setEnName(e.target.value)}
        />
      </div>

      <div className="flex gap-2 justify-end mt-5">
        <div className="">
          <ButtonFunc
            text={t("cancel")}
            color="grey"
            onClick={setClose}
          />
        </div>
        <div className="">
          <ButtonFunc
            text={t("save")}
            onClick={handleSubmit}
            loading={loading}
          />
        </div>
      </div>
    </ModalComp>
  );
};

export default AddQuestionCat;
