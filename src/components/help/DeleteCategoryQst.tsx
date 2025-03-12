import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import ModalComp from "../ui/modals/ModalComp";
import Title from "../ui/modals/Title";
import ButtonFunc from "../ui/buttons/Button";
import { axios_toast_error } from "../../functions/axios_toast_error";



interface DeleteModalProps {
  setClose: () => void;
  cat: {
    name: string;
    arabic_name: string;
    id: number;
  };
}


const DeleteCategoryQst: React.FC<DeleteModalProps> = ({
  setClose,
  cat,
}) => {
  const { i18n, t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const url = import.meta.env.VITE_SERVER_URL_HELP;


  const handleSubmit = () => {
    setLoading(true);
    axios
      .delete(`${url}/categories/${cat.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        axios_toast_error(err, t);
        setLoading(false);
      });
  };


  return (
    <ModalComp onClose={setClose}>
      <Title title={t("delete_category")} />
      <p>
        {t("are_you_sure_you_want_to")}{" "}
        <span className="text-red-500 font-semibold">{t("delete")}</span> {" "}
        <strong>{i18n.language === "ar" ? cat.arabic_name : cat.name}</strong>?
      </p>
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

export default DeleteCategoryQst;
