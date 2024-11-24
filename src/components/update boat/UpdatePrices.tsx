import ReactModal from "react-modal"
import { useTranslation } from "react-i18next"
import React from "react"
import Swal from "sweetalert2"
import NumbersHandlers from "../../components/ui/NumbersHandlers"
import axios from "axios"
import { useParams } from "react-router-dom"

interface UpdatePricesProps {
    prices: any
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    }



const UpdatePrices: React.FC<UpdatePricesProps> = ({ setIsOpen , prices }) => {
    
    const { t } = useTranslation();
    const [price, setPrice] = React.useState(prices[0].price_per_hour);
    const [minHours, setMinHours] = React.useState(prices[0].min_hours);
  const [maxHours, setMaxHours] = React.useState(prices[0].max_hours);
const { myBoatId } = useParams<{ myBoatId: string }>();
        const url = import.meta.env.VITE_SERVER_URL_LISTING;

  // console.log(prices);

    const handleContinue = () => {
        const check = [price, minHours, maxHours].every((val) => val !== 0);
        if (!check) return alert(t("please_fill_all_fields"));
    
        if (minHours > maxHours) {
            return Swal.fire({
              title: t("ops"),
              text: t("min_hours_cannot_be_greater_than_max_hours"),
              customClass: {
                confirmButton: "custom-confirm-button",
              },
            });
      }

      const newPrices = [
        {
          price_per_hour: price,
          date_specific_price: [],
          min_hours: minHours,
          max_hours: maxHours
        },
      ];

      const pricesString = JSON.stringify(newPrices); 
      const formData = new FormData();
      formData.append("prices",pricesString);
     

      axios.put(`${url}/api/listing/listings/${myBoatId}`,formData , {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
        .then(() => { 
          Swal.fire({
            icon: "success",
            title: t("greate"),
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
      className="flex flex-col items-center justify-center w-full bg-white p-3 rounded-10 shadow-hardShadow md:w-[500px]"
      overlayClassName="fixed inset-0 backdrop-blur-[7px] bg-opacity-20 bg-black z-20 flex items-center justify-center px-4"
    >
        <p className="text-[25px] font-bold mb-5">{t("set_prices")}</p>

        <div className="price w-full">
          <label
            htmlFor="pricePerHour"
            className="block mt-4 text-sm font-medium text-gray-700"
          >
            {t("price_per_hour")}
          </label>
          <input
            type="number"
            placeholder={t("price_per_hour") + "..."}
            value={price}
            id="pricePerHour"
            className="mt-1 w-full border border-gray-300 rounded-10 p-2 outline-main focus:bg-emptyInput"
            onChange={(e) =>
              setPrice(Number(e.target.value) >= 0 ? Number(e.target.value) : 0)
            }
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

          {/* <ContinueButton onClick={handleContinue} /> */}
            <button
                onClick={handleContinue}
              className="w-full mt-5 py-2 bg-main text-white rounded-10"
          >
              {t("save")}
            </button>
    </ReactModal>
  );
}

export default UpdatePrices
