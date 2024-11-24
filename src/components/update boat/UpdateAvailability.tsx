import ReactModal from "react-modal";
import { useTranslation } from "react-i18next";
import React from "react";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { HiOutlineMinus } from "react-icons/hi";
import { format } from "date-fns";
import axios from "axios";
import { useParams } from "react-router-dom";

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
    if (!startDate || !endDate) return alert(t("please_fill_all_fields"));
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
        Swal.fire({
          title: t("great"),
          icon: "success",
        });
        setIsOpen(false);
        window.location.reload();
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          Swal.fire({
            icon: "error",
            title: t("network_error"),
            text: t("please_try_again"),
            customClass: {
              confirmButton: "custom-confirm-button",
            },
          }).then(() => {
            window.location.reload();
          });
        }
      });
  };

  return (
    <ReactModal
      isOpen={true}
      onRequestClose={() => setIsOpen(false)}
      className="flex flex-col items-center justify-center w-full bg-white p-3 rounded-10 shadow-hardShadow max-w-[400px] md:w-[400px] max-h-screen md:p-5"
      style={{
        content: {
          maxHeight: "calc(100vh - 100px)",
          overflow: "auto",
        },
      }}
      overlayClassName="fixed inset-0 backdrop-blur-[7px] bg-opacity-20 bg-black z-20 flex items-center justify-center p-4"
    >
      <div className="dates w-full">
        <div className="my-5">
          <label className="block mb-2 text-lg font-medium text-gray-700">
            {t("select_start_date")}
          </label>
          <DatePicker
            selected={startDate}
            minDate={new Date()}
            isClearable
            todayButton="Today"
            dateFormat={"dd MMM yyyy"}
            placeholderText={t("select_a_date")}
            onChange={(date) => setStartDate(date)}
            className="p-3 border border-gray-300 rounded-lg focus:border-main focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out outline-none w-[130%] md:w-[147%]"
          />
        </div>
        <div className="mb-5 ">
          <label className="block mb-2 text-lg font-medium text-gray-700">
            {t("select_end_date")}
          </label>
          <DatePicker
            selected={endDate}
            minDate={startDate || new Date()}
            isClearable
            dateFormat={"dd MMM yyyy"}
            placeholderText={t("select_a_date")}
            onChange={(date) => setEndDate(date)}
            className="p-3 border border-gray-300 rounded-lg focus:border-main focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out outline-none w-[130%] md:w-[147%]"
          />
        </div>
      </div>

      {/* dates */}
      <div className="mt-5 pr-1 w-full max-h-[300px] overflow-auto">
        <table className="min-w-full bg-white  border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-start">{t("from")}</th>
              <th className="px-4 py-2 border-b text-center">{t("to")}</th>
              <th className="px-4 py-2 border-b text-end">{t("remove")}</th>
            </tr>
          </thead>
          <tbody>
            {specificDatesOff.map((specificDate, index) => (
              <tr key={index} className="text-sm">
                <td className="px-4 py-2 text-start">
                  {format(new Date(specificDate.start_date), "dd MMM yyyy")}
                </td>
                <td className="px-4 py-2 text-center">
                  {format(new Date(specificDate.end_date), "dd MMM yyyy")}
                </td>
                <td className="text-center px-4 py-2 flex justify-center">
                  <HiOutlineMinus
                    className="text-[20px] bg-red-200 text-red-500 rounded-50"
                    onClick={() => handleRemoveDate(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="buttons w-full flex gap-2 mt-5">
        <button
          onClick={handleSaveDate}
          className="w-full py-2 text-main border border-main rounded-lg shadow-md hover:border-mainHover hover:text-mainHover transition duration-200 ease-in-out"
        >
          {t("save")}
        </button>
        <button
          onClick={send}
          className="w-full py-2 bg-main text-white rounded-lg shadow-md hover:bg-mainHover transition duration-200 ease-in-out"
        >
          {t("send")}
        </button>
      </div>
    </ReactModal>
  );
};

export default UpdateAvailability;
