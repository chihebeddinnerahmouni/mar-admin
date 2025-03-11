import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import LoadingButton from "../ui/LoadingButton";
import axios from "axios";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import ModalComp from "../ui/modals/ModalComp";
import { useParams } from "react-router-dom";
import { axios_toast_error } from "../../functions/axios_toast_error";
import InputNumber from "../ui/inputs/InputNumber";
import InputDate from "../ui/inputs/InputDate";
import Title from "../ui/modals/Title";
import ButtonFunc from "../ui/buttons/Button";
import { useQuery, useMutation } from "@tanstack/react-query";
import {toast} from "react-hot-toast";

interface DeleteModalProps {
  setClose: () => void;
}
const url = import.meta.env.VITE_SERVER_URL_LISTING;

const fetshBalance = async (userId: string) => {
  const res = await axios.get(`${url}/api/transactions/balances/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  return res.data;
}

const SendData = async (userId: string, data: any) => { 
  const res = await axios.post(`${url}/api/transactions/balances/${userId}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  return res.data;
}



const UpdateReleasedModal: React.FC<DeleteModalProps> = ({ setClose }) => {
  const {
    // i18n,
    t } = useTranslation();
  const [balance, setBalance] = useState<number>(0);
  const [releaseDate, setReleaseDate] = useState<string>("");
  const [releaseOption, setReleaseOption] = useState("release");
  const { userId } = useParams<{ userId: string }>();
  const mainColor = "#FF385C";


  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => SendData(userId!, data),
    onError: (error) => {
      axios_toast_error(error, t);
    },
    onSuccess: () => {
      setClose();
    },
  })

  const { data, error, isLoading } = useQuery({
    queryKey: ["getUserBalances", userId],
    queryFn: () => fetshBalance(userId!),
    enabled: !!userId,
  })

  useEffect(() => {
    if (error) axios_toast_error(error, t);
  }, [error]);
  
  useEffect(() => { 
    if (data) {
      setBalance(data.balances[0].balance_amount);
    }
  }, [data]);


  const handleSubmit = () => {

    if (!balance || !releaseDate) return toast.error(t("please_fill_all_fields"), {
      style: { border: "1px solid #FF385C", color: "#FF385C" },
    });

    const data = {
      balance: balance,
      releaseDate: releaseDate,
      releaseOption: releaseOption,
    };
    mutate(data);
  };

  return (
    <ModalComp onClose={setClose}>
      {isLoading ? (
        <LoadingButton />
      ) : (
        <>
          <Title title={t("update_balance")} />
          <div className="mt-4 space-y-4">
            <InputNumber
              label={t("balance")}
              value={balance.toString()}
              // value={"767"}
              setValue={(e: any) => setBalance(Number(e.target.value))}
            />
            <InputDate
              value={releaseDate}
              setValue={(e: any) => setReleaseDate(e.target.value)}
            />
          </div>

          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <RadioGroup
              row
              value={releaseOption}
              onChange={(e) => setReleaseOption(e.target.value)}
            >
              <FormControlLabel
                value="release"
                control={
                  <Radio
                    sx={{
                      color: mainColor,
                      "&.Mui-checked": {
                        color: mainColor,
                      },
                    }}
                  />
                }
                label={t("release")}
              />
              <FormControlLabel
                value="unrelease"
                control={
                  <Radio
                    sx={{
                      color: mainColor,
                      "&.Mui-checked": {
                        color: mainColor,
                      },
                    }}
                  />
                }
                label={t("unrelease")}
              />
            </RadioGroup>
          </FormControl>

          <div className="buttons flex gap-2 mt-4">
            <ButtonFunc onClick={setClose} text={t("cancel")} color="grey" />
            <ButtonFunc
              onClick={handleSubmit}
              text={t("send")}
              loading={isPending}
            />
          </div>
        </>
      )}
    </ModalComp>
  );
};

export default UpdateReleasedModal;
