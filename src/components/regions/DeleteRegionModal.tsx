import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { axios_error_handler } from "../../functions/axios_error_handler";
import ModalComp from "../ui/modals/ModalComp";
import Title from "../ui/modals/Title";
import ButtonFunc from "../ui/buttons/Button";

interface DeleteModalProps {
  setClose: () => void;
  region: {
    id: number;
    name: string;
    arabic_name: string;
  };
}

const DeleteRegionModal: React.FC<DeleteModalProps> = ({
  setClose,
  region,
}) => {
  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const { i18n, t } = useTranslation();

  const handleSubmit = () => {
    setLoading(true);
    axios
      .delete(`${url}/api/region/regions/${region.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        axios_error_handler(err, t);
        setLoading(false);
      });
  };

  return (
    <ModalComp onClose={setClose}>
      <Title title={t("delete_region")} />
      <p>
        {t("are_you_sure_you_want_to")}{" "}
        <span className="text-red-500 font-semibold">{t("delete")}</span>{" "}
        <strong>
          {i18n.language === "ar" ? region.arabic_name : region.name}
        </strong>
        ?
      </p>
      <div className="flex gap-2 justify-end mt-5">
        <div className="">
          <ButtonFunc onClick={setClose} color="grey" text={t("cancel")} />
        </div>
        <div className="">
          <ButtonFunc
            onClick={handleSubmit}
            text={t("delete")}
            loading={loading}
          />
        </div>
      </div>
    </ModalComp>
  );
};

export default DeleteRegionModal;
