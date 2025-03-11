import { useTranslation } from "react-i18next";
import React from "react";
import NumbersHandlers from "../../components/ui/NumbersHandlers";
import axios from "axios";
import { useParams } from "react-router-dom";
import { axios_toast_error } from "../../functions/axios_toast_error";
import ModalComp from "../ui/modals/ModalComp";
import ButtonFunc from "../ui/buttons/Button";
import Title from "../ui/modals/Title";
import InputNumber from "../ui/inputs/InputNumber";
import { toast } from "react-hot-toast";

interface UpdatePricesProps {
  prices: any;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdatePrices: React.FC<UpdatePricesProps> = ({ setIsOpen, prices }) => {
  const { t } = useTranslation();
  const [price, setPrice] = React.useState(prices[0].price_per_hour);
  const [minHours, setMinHours] = React.useState(prices[0].min_hours);
  const [maxHours, setMaxHours] = React.useState(prices[0].max_hours);
  const { myBoatId } = useParams<{ myBoatId: string }>();
  const url = import.meta.env.VITE_SERVER_URL_LISTING;

  const handleContinue = () => {
    const check = [price, maxHours].every((val) => val !== 0);
    if (!check) {
      return toast.error(t("please_enter_valid_values_for_all_fields"), {
        style: { border: "1px solid #FF385C", color: "#FF385C" },
      });
    }
    if (minHours > maxHours) {
      return toast.error(t("minimum_hours_should_be_less_than_maximum_hours"), {
        style: { border: "1px solid #FF385C", color: "#FF385C" },
      });
    }

    const newPrices = [
      {
        price_per_hour: price,
        date_specific_price: [],
        min_hours: minHours,
        max_hours: maxHours,
      },
    ];

    const pricesString = JSON.stringify(newPrices);
    const formData = new FormData();
    formData.append("prices", pricesString);

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
        axios_toast_error(err, t);
      });
  };

  return (
    <ModalComp onClose={() => setIsOpen(false)}>
      <Title title={t("set_prices")} />

      <div className="price w-full">
        <label
          htmlFor="pricePerHour"
          className="block mt-4 mb-1 text-sm font-medium text-gray-700"
        >
          {t("price_per_hour")}
        </label>
        <InputNumber
          value={price}
          setValue={(e: any) =>
            setPrice(Number(e.target.value) >= 0 ? Number(e.target.value) : 0)
          }
          label={t("enter_price")}
        />
      </div>

      <div className="hours flex w-full justify-around mt-5 mb-3 lg:mt-10">
        <div className="minHours flex flex-col items-center">
          <p className="mb-3 text-sm lg:text-base">{t("min_hours")}</p>
          <NumbersHandlers value={minHours} setValue={setMinHours} />
        </div>
        <div className="maxhours flex flex-col items-center">
          <p className="mb-3 text-sm lg:text-base">{t("max_hours")}</p>
          <NumbersHandlers value={maxHours} setValue={setMaxHours} />
        </div>
      </div>
      <div className="mt-6 w-full">
        <ButtonFunc onClick={handleContinue} text={t("send")} />
      </div>
    </ModalComp>
  );
};

export default UpdatePrices;
