import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import InputText from "../ui/inputs/InputText";
import { axios_toast_error } from "../../functions/axios_toast_error";
import ModalComp from "../ui/modals/ModalComp";
import ButtonFunc from "../ui/buttons/Button";
import Title from "../ui/modals/Title";

interface UpdatePricesProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}

const UpdateName: React.FC<UpdatePricesProps> = ({ setIsOpen, title }) => {
  const { t } = useTranslation();
  const { myBoatId } = useParams<{ myBoatId: string }>();
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const [loading, setLoading] = useState(false);
  const [newTitle, setTitle] = useState(title);
  const [isTitleValid, setIsTitleValid] = useState(true);
  const min = 12;
  const max = 40;

  const handleContinue = () => {
    if (newTitle.length < min || newTitle.length > max)
      return setIsTitleValid(false);

    setLoading(true);
    const formData = new FormData();
    formData.append("title", newTitle);
    axios
      .put(`${url}/api/listing/listings/${myBoatId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        axios_toast_error(err, t);
      });
  };

  return (
    <ModalComp onClose={() => setIsOpen(false)}>
      <Title title={t("name_your_boat")} />
      <InputText
        value={newTitle}
        setValue={(e: any) => {
          setIsTitleValid(true);
          setTitle(e.target.value);
        }}
        label={t("boat_name")}
        error={!isTitleValid}
        helperText={
          !isTitleValid && t("name_must_be_between_12_and_50_characters")
        }
      />
      <div className="mt-5 w-full">
        <ButtonFunc
          onClick={handleContinue}
          text={t("save")}
          loading={loading}
        />
      </div>
    </ModalComp>
  );
};

export default UpdateName;
