import React, {useState} from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import ModalComp from "../ui/modals/ModalComp";
import Title from "../ui/modals/Title";
import { axios_toast_error } from "../../functions/axios_toast_error";
import ButtonFunc from "../ui/buttons/Button";


interface DeleteModalProps {
  setClose: () => void;
  feature: {
    name: string;
    arabic_name: string;
      id: number
  };
}


const DeleteFeatureModal: React.FC<DeleteModalProps> = ({
  setClose,
  feature,
}) => {

  const { i18n, t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const url = import.meta.env.VITE_SERVER_URL_LISTING;



  const handleSubmit = () => {
    setLoading(true);
    axios
      .delete(`${url}/admin/listing/features/${feature.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        axios_toast_error(error, t);
        setLoading(false);
      });
  };    
  return (
    <ModalComp onClose={setClose}>
      <Title title={t("delete_feature")} />
      <div>
        {t("are_you_sure_you_want_to")}{" "}
        <span className="text-red-500 font-semibold">{t("delete")}</span>{" "}
        <strong>
          {i18n.language === "ar" ? feature.arabic_name : feature.name}
        </strong>
        ?
      </div>
      <div className="flex mt-4 gap-2 justify-end">
        <div className="">
          <ButtonFunc onClick={setClose} text={t("cancel")} color="grey" />
        </div>
        <div className="">
          <ButtonFunc
            color="red"
            onClick={handleSubmit}
            text={t("delete")}
            loading={loading}
          />
        </div>
      </div>
    </ModalComp>
  );
};


export default DeleteFeatureModal;
