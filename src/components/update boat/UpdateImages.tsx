import ReactModal from "react-modal";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import Swal from "sweetalert2";
// import axios from "axios";
// import { useParams } from "react-router-dom";
import { FaMinusCircle, FaCamera } from "react-icons/fa";


interface UpdatePricesProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  images: any;
}

const UpdateImages: React.FC<UpdatePricesProps> = ({ setIsOpen, images }) => {
    const { t } = useTranslation();
      const [imageList, setImageList] = useState(images);
  // const { myBoatId } = useParams<{ myBoatId: string }>();
  const url = import.meta.env.VITE_SERVER_URL_LISTING;

  const removeImage = (index: number) => {
    const newImageList = imageList.filter((_: any, i: any) => i !== index);
    setImageList(newImageList);
    };
    

    const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const newImages = Array.from(event.target.files).map((file) => ({
          url: URL.createObjectURL(file),
        }));
        setImageList([...imageList, ...newImages]);
      }
    };

    const handleContinue = () => {
      
        if (imageList.length < 5) {
          Swal.fire({
            title: t("ops"),
            text: t("please_add_at_least_5_images"),
            timer: 3000,
            timerProgressBar: true,
            width: 400,
            customClass: {
              confirmButton: "custom-confirm-button",
            },
          });
          return;
        }

    // const formData = new FormData();
    // formData.append("title", newTitle);

    // axios
    //   .put(`${url}/api/listing/listings/${myBoatId}`, formData, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    //     },
    //   })
    //   .then(() => {
    //     Swal.fire({
    //       title: t("great"),
    //       text: t("prices_updated_successfully"),
    //       icon: "success",
    //       timer: 2000,
    //       showConfirmButton: false,
    //       timerProgressBar: true,
    //       customClass: {
    //         confirmButton: "custom-confirm-button",
    //       },
    //     });
    //     setIsOpen(false);
    //     window.location.reload();
    //   })
    //   .catch(() => {
    //     Swal.fire({
    //       title: t("oops"),
    //       text: t("something_went_wrong_try_again"),
    //       icon: "error",
    //       timer: 2000,
    //       timerProgressBar: true,
    //       customClass: {
    //         confirmButton: "custom-confirm-button",
    //       },
    //     });
    //   });
  };

  return (
    <ReactModal
      isOpen={true}
      onRequestClose={() => setIsOpen(false)}
      className="flex flex-col items-center justify-center w-full bg-white p-3 rounded-10 shadow-hardShadow md:w-[500px] "
      overlayClassName="fixed inset-0 backdrop-blur-[7px] bg-opacity-20 bg-black z-20 flex items-center justify-center px-4"
    >
      <p className="mb-5 text-[25px] font-bold">{t("update_images")}</p>
      <div className="grid grid-cols-3 gap-4 w-full max-h-[400px] overflow-auto">
        {imageList.map((image: any, index: number) => (
          <div key={index} className="relative">
            <img
              src={image.id ? url + "/" + image.url : image.url}
              alt={`Boat image ${index + 1}`}
              className="w-full h-24 md:h-32 object-cover object-center rounded-lg shadow-sm"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-2 left-2 text-red-500 text-xl"
            >
              <FaMinusCircle />
            </button>
          </div>
        ))}
        <label className="relative flex items-center justify-center w-full h-24 md:h-32 bg-gray-200 rounded-lg shadow-sm cursor-pointer">
          <FaCamera className="text-gray-500 text-2xl" />
          <input
            type="file"
            multiple
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleAddImage}
          />
        </label>
      </div>
      <button
        onClick={handleContinue}
        className="w-full py-2 bg-main text-white rounded-lg shadow-md hover:bg-mainHover transition duration-200 ease-in-out mt-5"
      >
        {t("save")}
      </button>
    </ReactModal>
  );
};

export default UpdateImages;
