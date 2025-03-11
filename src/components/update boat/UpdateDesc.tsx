import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ModalComp from "../../components/ui/modals/ModalComp";
import { axios_toast_error } from "../../functions/axios_toast_error";
import MultiLineInput from "../../components/ui/inputs/MultiLine";
import ButtonFunc from "../ui/buttons/Button";
import Title from "../ui/modals/Title";

interface UpdatePricesProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  description: string;
}

const UpdateName: React.FC<UpdatePricesProps> = ({
  setIsOpen,
  description,
}) => {
  const { t } = useTranslation();
  const { myBoatId } = useParams<{ myBoatId: string }>();
  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const [newTitle, setTitle] = useState(description);
  const [isDescValid, setIsDescValid] = useState(true);
  const min = 60;
  const max = 500;

  // console.log(prices);

  const handleContinue = () => {
    if (newTitle.length < min || newTitle.length > max)
      return setIsDescValid(false);

    setLoading(true);

    const formData = new FormData();
    formData.append("description", newTitle);

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
      <div className="w-full">
        <Title title={t("describe_your_boat")} />
        <MultiLineInput
          value={newTitle}
          setValue={(e: any) => {
            setIsDescValid(true);
            setTitle(e.target.value);
          }}
          label={t("description")}
          error={!isDescValid}
          helperText={
            !isDescValid &&
            t("description_must_be_between_60_and_500_characters")
          }
        />
        <div className="mt-5 w-full">
          <ButtonFunc
            onClick={handleContinue}
            text={t("save")}
            loading={loading}
          />
        </div>
      </div>
    </ModalComp>
  );
};

export default UpdateName;
