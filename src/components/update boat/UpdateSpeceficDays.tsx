import { useTranslation } from "react-i18next";
import React from "react";
// import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NumbersHandlers from "../../components/ui/NumbersHandlers";
import { axios_toast_error } from "../../functions/axios_toast_error";
import ModalComp from "../ui/modals/ModalComp";
import ButtonFunc from "../ui/buttons/Button";
import Title from "../ui/modals/Title";
import InputNumber from "../ui/inputs/InputNumber";
import InputDate from "../ui/inputs/InputDate";
import { toast } from "react-hot-toast";

interface UpdatePricesProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  prices: any;
}

const UpdateSpecDates: React.FC<UpdatePricesProps> = ({
  setIsOpen,
  prices,
}) => {
  const { t } = useTranslation();
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const { myBoatId } = useParams<{ myBoatId: string }>();
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState<string>("");
  const [price, setPrice] = useState<any>("");
  const [minHours, setMinHours] = useState(0);
  const [loading, setLoading] = useState(false);
  const [maxHours, setMaxHours] = useState(0);
  const [specificDates, setSpecificDates] = useState<any>(
    prices[0].date_specific_price
  );

  const handleAddDate = () => {
    setShowForm(true);
  };

  const handleSaveDate = () => {
    const check = !date || price <= 0 || minHours <= 0 || maxHours <= 0;
    if (check) {
      return toast.error(t("please_enter_valid_values_for_all_fields"), {
        style: { border: "1px solid #FF385C", color: "#FF385C" },
      });
    }
    if (minHours > maxHours) {
      return toast.error(t("minimum_hours_should_be_less_than_maximum_hours"), {
        style: { border: "1px solid #FF385C", color: "#FF385C" },
      });
    }
    const newDate: any = {
      date: date,
      price,
      min_hours: minHours,
      max_hours: maxHours,
    };

    setSpecificDates([...specificDates, newDate]);
    setShowForm(false);
    setDate("");
    setPrice(0);
    setMinHours(0);
    setMaxHours(0);
  };

  // console.log(specificDates)

  // send the data to the server
  const send = () => {
    setLoading(true);
    prices[0].date_specific_price = specificDates;
    const formData = new FormData();
    formData.append("prices", JSON.stringify(prices));

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
      <Title title={t("do_u_have_specefic_dates")} />

      <button
        onClick={handleAddDate}
        className="mb-5 text-main font-bold hover:text-mainHover"
      >
        {t("add_specific_date")}
      </button>
      {showForm && (
        <Form
          date={date}
          setDate={setDate}
          price={price}
          setPrice={setPrice}
          minHours={minHours}
          setMinHours={setMinHours}
          maxHours={maxHours}
          setMaxHours={setMaxHours}
          setShowForm={setShowForm}
          handleSaveDate={handleSaveDate}
          t={t}
        />
      )}
      <Result specificDates={specificDates} t={t} />
      <div className="mt-5 w-full">
        <ButtonFunc text={t("send")} onClick={send} loading={loading} />
      </div>
    </ModalComp>
  );
};

export default UpdateSpecDates;

const Form = ({
  date,
  setDate,
  price,
  setPrice,
  minHours,
  setMinHours,
  maxHours,
  setMaxHours,
  setShowForm,
  handleSaveDate,
  t,
}: {
  date: string;
  setDate: (e: any) => void;
  price: number;
  setPrice: (e: any) => void;
  minHours: number;
  setMinHours: (e: any) => void;
  maxHours: number;
  setMaxHours: (e: any) => void;
  setShowForm: (e: any) => void;
  handleSaveDate: () => void;
  t: any;
}) => {
  return (
    <div className="mb-5 p-4 rounded w-full mx-auto shadow-hoverShadow">
      <div className="mb-5">
        <label
          htmlFor="date"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          {t("select_date")}
        </label>
        <InputDate
          value={date}
          setValue={(e: any) => setDate(e.target.value)}
          minDate={new Date().toISOString().split("T")[0]}
        />
      </div>

      <div className="">
        <label
          htmlFor="pricePerHour"
          className="block mt-4 mb-1 text-sm font-medium text-gray-700"
        >
          {t("price_per_hour")}
        </label>
        <InputNumber
          value={price.toString()}
          setValue={(e: any) => setPrice(e.target.value)}
          label="Enter price"
        />
      </div>

      <div className="prices w-full flex justify-evenly my-10">
        <div className="">
          <p className="block mb-2">{t("min_hours")}</p>
          <NumbersHandlers value={minHours} setValue={setMinHours} />
        </div>
        <div className="">
          <p className="block mb-2">{t("max_hours")}</p>
          <NumbersHandlers value={maxHours} setValue={setMaxHours} />
        </div>
      </div>

      <div className="mt-6 flex gap-2 justify-end">
        <div className="">
          <ButtonFunc
            text={t("cancel")}
            onClick={() => setShowForm(false)}
            color="gray"
          />
        </div>
        <div className="">
          <ButtonFunc
            text={t("save")}
            onClick={handleSaveDate}
            color="green"
          />
        </div>
      </div>
    </div>
  );
};

const Result = ({ specificDates, t }: { specificDates: any; t: any }) => {
  return (
    <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3 w-full">
      {specificDates.map((specificDate: any, index: any) => (
        <div key={index} className="p-2 border border-gray-300 rounded">
          <p>
            {t("date")}: {specificDate.date}
          </p>
          <p>
            {t("price")}: {specificDate.price}
          </p>
          <p>
            {t("min_hours")}: {specificDate.min_hours}
          </p>
          <p>
            {t("max_hours")}: {specificDate.max_hours}
          </p>
        </div>
      ))}
    </div>
  );
};
