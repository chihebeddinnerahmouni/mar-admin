import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { axios_error_handler } from "../../functions/axios_error_handler";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ButtonFunc from "../../components/ui/buttons/Button";

const url = import.meta.env.VITE_SERVER_URL_LISTING;

const responseFunc = async (
  values: {
    validated: boolean;
    blocked: boolean;
    block_reason: string;
  },
  listingId: string
) => {
  const { data } = await axios.put(
    `${url}/api/listing/listings/${listingId}/status`,
    values,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }
  );
  return data;
};

const ButtonsCont = ({
  listingId,
}: {
  listingId: number;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      values,
      listingId,
    }: {
      values: { validated: boolean; blocked: boolean; block_reason: string };
      listingId: string;
    }) => responseFunc(values, listingId),
    onError: (error) => {
      axios_error_handler(error, t);
    },
    onSuccess: () => {
      navigate("/listings");
    },
  });

  const response = (resp: boolean) => {
    mutate({
      values: {
        validated: resp,
        blocked: !resp,
        block_reason: "This is a test reason",
      },
      listingId: listingId.toString(),
    });
  };

  return (
        <div className="buttons bg-creme h-[60px] flex justify-end items-center gap-4 mb-8 sticky top-[60px] lg:top-[80px] z-10">
          <div className="w-[100px]">
            <ButtonFunc text={t("refuse")} onClick={() =>response(false)} />
          </div>
          <div className="w-[100px]">
            <ButtonFunc
              onClick={() => response(true)}
              text={t("accept")}
              loading={isPending}
              color="green"
            />
          </div>
        </div>
  );
};

export default ButtonsCont;
