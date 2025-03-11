import { useEffect, useState, useCallback } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ProfilePic from "../../components/user account/ProfilePic";
import Names from "../../components/user account/Names";
import Email from "../../components/user account/Email";
import Password from "../../components/user account/Password";
import Phone from "../../components/user account/Phone";
import ButtonFuc from "../../components/ui/buttons/Button";
import { axios_error_handler } from "../../functions/axios_error_handler";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import LoadingLine from "../../components/ui/LoadingLine";


interface ResponseData {
  message: string;
}

const fetshUserData = async (userId: string) => {
  const url = import.meta.env.VITE_SERVER_URL_USERS;
  const response = await axios.get(`${url}/api/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  return response.data;
}

const updateUserProfile = async (userData: any, userId: string) => {
  const url = import.meta.env.VITE_SERVER_URL_USERS;
  const response = await axios.put<ResponseData>(
    `${url}/admin/user/profile/${userId}`,
    {
      name: userData.firstName,
      surname: userData.lastName,
      phoneNumber: `+${userData.phone}`,
      languageSpoken: "arabic",
      description: "I am a user, hi!",
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }
  );
  return response.data;
};




const Account = () => {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const { userId } = useParams();

  const { mutate, isPending } = useMutation({
    mutationFn: (userData: any) => updateUserProfile(userData, userId!),
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error: any) => {
      axios_error_handler(error, t);
    },
  });

  const { data: user, isLoading, error } = useQuery({
    queryKey: ["getUser", userId],
    queryFn: () => fetshUserData(userId!),
  });

  useEffect(() => { 
    if (error) axios_error_handler(error, t);
  }, [error]);

  useEffect(() => { 
    if (user) {
      setFirstName(user.name);
      setLastName(user.surname);
      setPhone(user.phoneNumber);
    }
  }, [user]);



  const send = useCallback(() => {
    const array = [firstName, lastName, phone];
    if (array.some((item) => item === ""))
      return toast.error(t("please_fill_all_fields"), {
        style: { border: "1px solid #FF385C", color: "#FF385C" },
      });
    mutate({ firstName, lastName, phone });
  }, [firstName, lastName, phone, mutate]);


  if (error) return null
  if (isLoading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    );
  }

  return (
    <div className="w-full px-4 flex justify-center">
      <div className="content w-full mt-[100px] flex flex-col gap-4 pb-10 md:gap-6 md:w-[450px] lg:w-[550px] lg:mt-[170px]">
        <ProfilePic profilePic={user?.profilePicture} />
        <Names
          firstName={firstName}
          lastName={lastName}
          setFirstName={setFirstName}
          setLastName={setLastName}
        />
        <Email email={user.email ? user.email : ""} />
        <Password />
        <Phone phone={phone} setPhone={setPhone} />
        <ButtonFuc text={t("save")} onClick={send} loading={isPending} />
      </div>
    </div>
  );
};

export default Account;
