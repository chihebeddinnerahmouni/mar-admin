import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { axios_error_handler } from "../../../functions/axios_error_handler";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ButtonFunc from "../../../components/ui/buttons/Button";

const url = import.meta.env.VITE_SERVER_URL_LISTING;

const sendData = async (submittionId: string) => {
  const { data } = await axios.put(
    `${url}/api/submit/user-submissions/${submittionId}/accept`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }
  );
  return data;
};

const ButtonsCont = ({
  status,
  submittionId,
}: {
  status: string;
  submittionId: string;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: () => sendData(submittionId!),
    onSuccess: () => {
      navigate("/documents");
    },
    onError: (err) => {
      axios_error_handler(err, t);
    },
  });

  const accept = () => {
    if (isPending) return;
    mutate();
  };

  return (
    <>
      {status === "pending" && (
        <div className="buttons bg-creme h-[60px] flex justify-end items-center gap-4 mb-8 sticky top-[60px] lg:top-[80px] z-10">
          <div className="w-[100px]">
            <ButtonFunc text={t("refuse")} onClick={() => console.log(",")} />
          </div>
          <div className="w-[100px]">
            <ButtonFunc
              onClick={accept}
              text={t("accept")}
              loading={isPending}
              color="green"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ButtonsCont;
