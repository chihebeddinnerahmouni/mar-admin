import { useTranslation } from "react-i18next";
import React from "react";
// import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { HiOutlineMinus } from "react-icons/hi";
import axios from "axios";
import { useParams } from "react-router-dom";
import { axios_toast_error } from "../../functions/axios_toast_error";
import ModalComp from "../ui/modals/ModalComp";
import ButtonFunc from "../ui/buttons/Button";
import Title from "../ui/modals/Title";
import InputDate from "../ui/inputs/InputDate";
import { toast } from "react-hot-toast";

interface UpdatePricesProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  availabilities: any;
}

const UpdateAvailability: React.FC<UpdatePricesProps> = ({
  setIsOpen,
  availabilities,
}) => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showForm, setShowForm] = useState(false);
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const { myBoatId } = useParams<{ myBoatId: string }>();
  const [specificDatesOff, setSpecificDatesOff] = useState<
    {
      start_date: string;
      end_date: string;
      reserved: boolean;
    }[]
  >(availabilities);

  const handleSaveDate = () => {
    if (!startDate || !endDate) {
      return toast.error(t("please_enter_valid_values_for_all_fields"), {
        style: { border: "1px solid #FF385C", color: "#FF385C" },
      });
    }
    const newDate = {
      start_date: startDate.toISOString().split("T")[0],
      end_date: endDate.toISOString().split("T")[0],
      reserved: true,
    };
    setSpecificDatesOff([...specificDatesOff, newDate]);
    setStartDate(null);
    setEndDate(null);
  };

  const handleRemoveDate = (index: number) => {
    const updatedDates = specificDatesOff.filter((_, i) => i !== index);
    setSpecificDatesOff(updatedDates);
  };

  // send the data to the server
  const send = () => {
    const formData = new FormData();
    formData.append("availability", JSON.stringify(specificDatesOff));
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
      <Title title={t("unavailable_to_work")} />
      <button
        onClick={() => setShowForm(true)}
        className="mb-5 text-main font-medium underline"
      >
        {t("add_specific_date")}
      </button>
      {showForm && (
        <Form
          startDate={startDate ? startDate.toISOString().split("T")[0] : ""}
          setStartDate={(date) => setStartDate(new Date(date))}
          endDate={endDate ? endDate.toISOString().split("T")[0] : ""}
          setEndDate={(date) => setEndDate(new Date(date))}
          handleSaveDate={handleSaveDate}
          setShowForm={setShowForm}
          t={t}
        />
      )}
      <Table
        specificDatesOff={specificDatesOff}
        t={t}
        handleRemoveDate={handleRemoveDate}
      />

      <div className="w-full mt-5">
        <ButtonFunc text={t("send")} onClick={send} />
      </div>
    </ModalComp>
  );
};

export default UpdateAvailability;

const Form = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleSaveDate,
  setShowForm,
  t,
}: {
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  handleSaveDate: () => void;
  setShowForm: (showForm: boolean) => void;
  t: any;
}) => {
  return (
    <div className="mb-5 p-6 border border-gray-300 rounded-lg shadow-hoverShadow flex flex-col gap-4">
      <div className="w-full">
        <label className="block mb-1 text-lg font-medium text-gray-700">
          {t("select_start_date")}
        </label>
        <InputDate
          value={startDate}
          setValue={(e) => setStartDate(e.target.value)}
          minDate={new Date().toISOString().split("T")[0]}
        />
      </div>
      <div className="w-full">
        <label className="block mb-1 text-lg font-medium text-gray-700">
          {t("select_end_date")}
        </label>
        <InputDate
          value={endDate}
          setValue={(e) => setEndDate(e.target.value)}
          minDate={startDate}
        />
      </div>
      <div className="mt-5 flex gap-2 justify-end">
        <div className="">
          <ButtonFunc
            text={t("cancel")}
            onClick={() => setShowForm(false)}
            color="grey"
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

const Table = ({
  specificDatesOff,
  t,
  handleRemoveDate,
}: {
  specificDatesOff: any;
  t: any;
  handleRemoveDate: (index: number) => void;
}) => {
  return (
    <div className="mt-5">
      <table className="w-full border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-center">{t("start")}</th>
            <th className="p-2 text-center">{t("end")}</th>
            <th className="p-2 text-center">{t("remove")}</th>
          </tr>
        </thead>
        <tbody>
          {specificDatesOff.map((specificDate: any, index: number) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="p-2 text-center">{specificDate.start_date}</td>
              <td className="p-2 text-center">{specificDate.end_date}</td>
              <td className="p-2 text-center">
                <HiOutlineMinus
                  className="text-[20px bg-red-200 text-red-500 rounded-50 mx-auto cursor-pointer"
                  onClick={() => handleRemoveDate(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
