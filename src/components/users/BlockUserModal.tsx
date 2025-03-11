import ReactModal from "react-modal";
import React from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { axios_error_handler } from "../../functions/axios_error_handler";
import ModalComp from "../ui/modals/ModalComp";
import ButtonFunc from "../ui/buttons/Button";

interface DeleteModalProps {
  setClose: () => void;
  user: any;
}
ReactModal.setAppElement("#root");

const BlockModal: React.FC<DeleteModalProps> = ({
  setClose,
  user,
}) => {
  const url = import.meta.env.VITE_SERVER_URL_USERS;
  const [loading, setLoading] = React.useState(false);
  const { t } = useTranslation();

  const block = async () => {
    setLoading(true);
    const endPoint = user.block
      ? "/admin/user/unblock/" + user.id
      : "/admin/user/block/" + user.id;
    axios
      .post(url + endPoint, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        axios_error_handler(err, t);
      });
  };

  return (
    <ModalComp onClose={setClose}>
      <img
        src={
          user.profilePicture ? url + "/" + user.profilePicture : "/anonyme.jpg"
        }
        className="w-20 h-20 rounded-full mx-auto object-cover object-center lg:w-24 lg:h-24"
        alt="profile picture"
      />

      <h1 className="text-2xl font-bold text-center mt-4 lg:text-3xl">
        {user.name} {user.surname}
      </h1>
      <p className="text-gray-500 text-center mt-1 lg:text-lg">
        {t("are_you_sure_you_want_to")}{" "}
        <span
          className={`font-semibold ${
            user.block ? "text-green-500" : "text-red-500"
          }`}
        >
          {user.block ? t("unblock") : t("block")}
        </span>{" "}
        <span className="font-semibold">{user.name + " " + user.surname}</span>
      </p>

      <div className="buttons flex w-full mt-7 gap-2">
        <ButtonFunc
          onClick={() => {setClose()}}
          text={t("cancel")}
          color="grey"
        />
        <ButtonFunc
          onClick={block}
          text={user.block ? t("unblock") : t("block")}
          color={user.block ? "green" : "red"}
          loading={loading}
        />
      </div>
    </ModalComp>
  );
};

export default BlockModal;
