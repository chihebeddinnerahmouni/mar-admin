import ReactModal from "react-modal";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";

interface UpdatePricesProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  description: string;
}

const UpdateName: React.FC<UpdatePricesProps> = ({
  setIsOpen,
  description,
}) => {
  const { t } = useTranslation();
  const { myBoatId } = useParams<{ myBoatId: string }>();
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const [newTitle, setTitle] = useState(description);

  // console.log(prices);

  const handleContinue = () => {
    const formData = new FormData();
    formData.append("description", newTitle);

    axios
      .put(`${url}/api/listing/listings/${myBoatId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then(() => {
        Swal.fire({
          title: t("great"),
          text: t("prices_updated_successfully"),
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
      .catch(() => {
        Swal.fire({
          title: t("oops"),
          text: t("something_went_wrong_try_again"),
          icon: "error",
          timer: 2000,
          timerProgressBar: true,
          customClass: {
            confirmButton: "custom-confirm-button",
          },
        });
      });
  };

  return (
    <ReactModal
      isOpen={true}
      onRequestClose={() => setIsOpen(false)}
      className="flex flex-col items-center justify-center w-full bg-white p-3 rounded-10 shadow-hardShadow md:w-[500px]"
      overlayClassName="fixed inset-0 backdrop-blur-[7px] bg-opacity-20 bg-black z-20 flex items-center justify-center px-4"
    >
        <p className="mb-5 text-[25px] font-bold">{t("describe_your_boat")}</p>

        <textarea
          value={newTitle}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t("boat_name")}
          className="bg-emptyInput w-full h-14 p-1 rounded-[5px] border-1 border-gray-300 outline-main md:h-20 lg:h-28 lg:text-[18px] lg:p-2"
        />
        <button
          onClick={handleContinue}
          className="w-full py-2 bg-main text-white rounded-lg shadow-md hover:bg-mainHover transition duration-200 ease-in-out mt-5"
        >
          {t("save")}
        </button>
    </ReactModal>
  );
};

export default UpdateName;
