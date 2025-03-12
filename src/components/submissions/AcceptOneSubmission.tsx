import React from "react";
import { useState } from "react";
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

const AcceptOneSubmission: React.FC<DeleteModalProps> = ({
  setClose,
  user,
}) => {

  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const { t } = useTranslation();


  
  const submit = () => { 
    setLoading(true);
    axios
      .put(
        `${url}/api/submit/user-submissions/${user.id}/accept/document`,
        {},
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
  }


  return (
    <ModalComp onClose={setClose}>
      <Title title={t("accept_submission")} />
      <p className="text-gray-500 text-center lg:text-lg">
        {t("are_you_sure_you_want_to")}{" "}
        <strong className="text-green-400">{t("accept")}</strong> ?
      </p>

      <div className="buttons flex w-full justify-end mt-4 gap-2">
        <div className="">
          <ButtonFunc
            onClick={setClose}
            text={t("cancel")}
            color="grey"
          />
        </div>
        <div className="">
          <ButtonFunc
            onClick={submit}
            text={t("accept")}
            loading={loading}
            color="green"
          />
        </div>
      </div>
    </ModalComp>
  );
};

export default AcceptOneSubmission;
