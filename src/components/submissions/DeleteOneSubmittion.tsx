import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ModalComp from "../ui/modals/ModalComp";
import Title from "../ui/modals/Title";
import { axios_toast_error } from "../../functions/axios_toast_error";
import ButtonFunc from "../ui/buttons/Button";

interface DeleteModalProps {
  setClose: () => void;
  user: any;
}

const DeleteOneSubmittion: React.FC<DeleteModalProps> = ({
  setClose,
  user,
}) => {
  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const { t } = useTranslation();

  const handleDelete = () => {
    setLoading(true);
    axios
      .put(
        `${url}/api/submit/user-submissions/${user.id}/refuse`,
        {
          reason: "Refused by admin",
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
        axios_toast_error(err, t);
        setLoading(false);
      });
  };

  return (
    <ModalComp onClose={setClose}>
      <Title title={t("refuse_submission")} />
      <p className="text-gray-500 text-center mt-5 lg:text-lg">
        {t("are_you_sure_you_want_to")}{" "}
        <strong className="text-red-400">{t("refuse")}</strong> ?
      </p>

      <div className="buttons flex w-full mt-3 justify-end gap-2">
        <div className="">
          <ButtonFunc onClick={setClose} text={t("cancel")} color="grey" />
        </div>
        <div className="">
          <ButtonFunc
            onClick={handleDelete}
            text={t("refuse")}
            loading={loading}
          />
        </div>
      </div>
    </ModalComp>
  );
};

export default DeleteOneSubmittion;
