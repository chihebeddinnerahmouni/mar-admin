import ReactModal from "react-modal";
import { useTranslation } from "react-i18next";
import React from "react";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
// import { HiOutlineMinus } from "react-icons/hi";
// import { format } from "date-fns";
import axios from "axios";
import { useParams } from "react-router-dom";
import NumbersHandlers from "../../components/ui/NumbersHandlers";


interface UpdatePricesProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    prices: any;
}

const UpdateSpeceficDays: React.FC<UpdatePricesProps> = ({
  setIsOpen,
  prices
}) => {
  const { t } = useTranslation();
  // const [startDate, setStartDate] = useState<Date | null>(null);
  // const [endDate, setEndDate] = useState<Date | null>(null);
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
    const { myBoatId } = useParams<{ myBoatId: string }>();
        const [showForm, setShowForm] = useState(false);
        const [date, setDate] = useState<Date | null>(null);
        const [price, setPrice] = useState<any>("");
        const [minHours, setMinHours] = useState(0);
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
         return Swal.fire({
           title: "Oops...",
           text: "Please enter valid values for all fields!",
           customClass: {
             confirmButton: "custom-confirm-button",
           },
         });
       }
       if (minHours > maxHours) {
         return Swal.fire({
           title: "Oops...",
           text: "Minimum hours should be less than maximum hours!",
           customClass: {
             confirmButton: "custom-confirm-button",
           },
         });
       }
       const newDate: any = {
         date: date.toISOString().split("T")[0],
         price,
         min_hours: minHours,
         max_hours: maxHours,
       };

       setSpecificDates([...specificDates, newDate]);
       setShowForm(false);
       setDate(null);
       setPrice(0);
       setMinHours(0);
       setMaxHours(0);
     };

 
    // console.log(specificDates)


  // send the data to the server
    const send = () => {
      

        prices[0].date_specific_price = specificDates;
        // console.log(prices)

    const formData = new FormData();
    formData.append("prices", JSON.stringify(prices));

    axios
      .put(`${url}/api/listing/listings/${myBoatId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then(() => {
        Swal.fire({
          title: t("great"),
          text: t("availability_updated_successfully"),
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          timerProgressBar: true,
          customClass: {
            confirmButton: "custom-confirm-button",
          },
        });
        setIsOpen(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
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
      <p className="text-[25px] font-bold mb-5">
        {t("do_u_have_specefic_dates")}
      </p>

      <button
        onClick={handleAddDate}
        className="mb-5 text-main font-bold hover:text-mainHover"
      >
        {t("add_specific_date")}
      </button>
      {showForm && (
        <div className="mb-5 p-4 rounded w-full">
          <div className="mb-5">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              {t("select_date")}
            </label>
            <input
              onChange={(e) => setDate(new Date(e.target.value))}
              type="date"
              id="date"
              min={new Date().toISOString().split("T")[0]}
              className="mt-1 w-full border border-gray-300 rounded-10 p-2 focus:bg-emptyInput outline-main "
            />
          </div>

          <div className="">
            <label
              htmlFor="pricePerHour"
              className="block mt-4 text-sm font-medium text-gray-700"
            >
              {t("price_per_hour")}
            </label>
            <input
              type="number"
              value={price}
              id="pricePerHour"
              placeholder="Enter price"
              className="mt-1 w-full border border-gray-300 rounded-10 p-2 focus:bg-emptyInput outline-main "
              onChange={(e) =>
                setPrice(
                  Number(e.target.value) >= 0 ? Number(e.target.value) : 0
                )
              }
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

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2 hover:bg-gray-400"
            >
              {t("cancel")}
            </button>
            <button
              onClick={handleSaveDate}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {t("save_date")}
            </button>
          </div>
        </div>
      )}

      <div className="mb-5 w-full flex overflow-auto bg-red-200">
        {specificDates.map((specificDate: any, index: any) => (
          <div key={index} className="p-2 border rounded w-full bg-white">
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

      <button
        onClick={send}
        className="w-full py-2 bg-main text-white rounded-lg shadow-md hover:bg-mainHover transition duration-200 ease-in-out"
      >
        {t("send")}
      </button>
    </ReactModal>
  );
};

export default UpdateSpeceficDays;
