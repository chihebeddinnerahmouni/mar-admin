import React from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ModalComp from "../ui/modals/ModalComp";
import Title from "../ui/modals/Title";
import ButtonFunc from "../ui/buttons/Button";
import { useMutation } from "@tanstack/react-query";
import { axios_toast_error } from "../../functions/axios_toast_error";

interface DeleteModalProps {
  setClose: () => void;
  blocked: any;
  id: number;
  title: string;
}

const toggleBlock = async (id: number, blocked: boolean) => {
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const { data } = await axios.put(
    `${url}/api/listing/listings/${id}/status`,
    {
      blocked: !blocked,
      block_reason: "This is a test reason",
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }
  );
  return data;
};

const BlockUnblocModal: React.FC<DeleteModalProps> = ({
  setClose,
  blocked,
  title,
  id,
}) => {
  const { t } = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationFn: () => toggleBlock(id, blocked),
    onSuccess: () => {
      window.location.reload();
    },
    onError: (err) => {
      axios_toast_error(err, t);
    },
  });

  return (
    <ModalComp onClose={setClose}>
      <Title title={t("block_boat")} />

      <p className="text-gray-500 text-center mt-5 lg:text-lg">
        {t("are_you_sure_you_want_to")}{" "}
        <strong className={`${blocked ? "text-green-400" : "text-red-400"}`}>
          {blocked ? t("unblock") : t("block")}
        </strong>
        {title} ?
      </p>
      <div className="buttons flex w-full mt-7 gap-2">
        <ButtonFunc text={t("cancel")} color="gray" onClick={setClose} />
        <ButtonFunc
          text={blocked ? t("unblock") : t("block")}
          onClick={() => mutate()}
          loading={isPending}
          {...(blocked && { color: "green" })}
        />
      </div>
    </ModalComp>
  );
};

export default BlockUnblocModal;
