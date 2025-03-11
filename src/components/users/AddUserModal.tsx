import React, { useState } from "react";
import ReactModal from "react-modal";
import { useTranslation } from "react-i18next";
import InputText from "../ui/inputs/InputText";
import InputEmail from "../ui/inputs/InputEmail";
import InputPassword from "../ui/inputs/InputPassword";
import InputTel from "../ui/inputs/InputTel";
import ButtonFunc from "../ui/buttons/Button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { axios_error_handler } from "../../functions/axios_error_handler";
import { toast } from "react-hot-toast";
import ModalComp from "../ui/modals/ModalComp";

interface DeleteModalProps {
  setClose: () => void;
}
ReactModal.setAppElement("#root");

const createUser = async (body: any) => {
  const URL = import.meta.env.VITE_SERVER_URL_USERS as string;
  const { data } = await axios.post(`${URL}/api/user/register`, body);
  return data;
};

const AddUserModal: React.FC<DeleteModalProps> = ({ setClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { t } = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error) => {
      axios_error_handler(error, t);
    },
  });

  const handleAddUser = () => {
    const array = [
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
    ];
    const check = array.some((item) => item === "");
    if (check)
      return toast.error(t("please_fill_all_fields"), {
        style: {
          border: "1px solid #FF0000",
          color: "#FF0000",
        },
      });
    if (password !== confirmPassword)
      return toast.error(t("passwords_do_not_match"), {
        style: {
          border: "1px solid #FF0000",
          color: "#FF0000",
        },
      });

    const body = {
      name: firstName,
      surname: lastName,
      email,
      password,
      phoneNumber: phone,
    };
    mutate(body);
  };

  return (
    <ModalComp onClose={setClose}>
      <div className="space-y-4">
        <div className="flex gap-4 items-center w-full">
          <InputText
            label={t("first_name")}
            value={firstName}
            setValue={(e: any) => setFirstName(e.target.value)}
          />
          <InputText
            label={t("last_name")}
            value={lastName}
            setValue={(e: any) => setLastName(e.target.value)}
          />
        </div>

        <div className="flex gap-4 items-center w-full">
          <InputEmail
            label={t("email")}
            value={email}
            setValue={(e: any) => setEmail(e.target.value)}
          />
          <InputTel
            label={t("phone")}
            value={phone}
            setValue={(e: any) => setPhone(e)}
          />
        </div>

        <div className="flex gap-4 items-center w-full">
          <InputPassword
            label={t("password")}
            value={password}
            setValue={(e: any) => setPassword(e.target.value)}
          />
          <InputPassword
            label={t("confirm_password")}
            value={confirmPassword}
            setValue={(e: any) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="mt-5 w-full">
          <ButtonFunc
            text={t("save")}
            onClick={handleAddUser}
            loading={isPending}
          />
        </div>
      </div>
    </ModalComp>
    
  );
};

export default AddUserModal;
