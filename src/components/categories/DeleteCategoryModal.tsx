import React, { useState} from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { axios_error_handler } from "../../functions/axios_error_handler";
import ModalComp from "../ui/modals/ModalComp";
import Title from "../ui/modals/Title";
import ButtonFunc from "../ui/buttons/Button";

interface DeleteModalProps {
  setClose: () => void;
  category: {
    id: number;
    name: string;
    arabic_name: string;
  };
}


const DeleteCategoryModal: React.FC<DeleteModalProps> = ({
  setClose,
  category
}) => {

  const { i18n, t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_SERVER_URL_CATEGORY;

  const handleSubmit = () => {
    setLoading(true);
      axios
        .delete(url + "/admin/categories/" + category.id, {
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
      <Title title={t("delete_category")} />
      <div>
        {t("are_you_sure_you_want_to_delete_the_category")}{" "}
        <strong>
          {i18n.language === "ar" ? category.arabic_name : category.name}
        </strong>
        ?
      </div>
      
      <div className="flex mt-4 gap-2 justify-end">
        <div className="">
          <ButtonFunc
            onClick={setClose}
            text={t("cancel")}
            color="grey"
          />
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

export default DeleteCategoryModal;
