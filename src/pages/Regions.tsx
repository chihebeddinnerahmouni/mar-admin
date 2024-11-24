import RegionComp from "../components/regions/RegionComp";
import AddRegionModal from "../components/regions/AddRegionModal";
import {
  useState,
  useEffect
} from "react";
import axios from "axios";
import LoadingLine from "../components/ui/LoadingLine";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";







const Regions = () => {

  const [isAddRegionOpen, setIsAddRegionOpen] = useState(false);
  const [regionsArray, setRegionsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const { t } = useTranslation();

  useEffect(() => {
     axios
       .get(`${url}/api/region/regions`)
       .then((response) => {
         setRegionsArray(response.data);
         setLoading(false);
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
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    )
  }



  return (
    <div className="p-4 md:p-8 lg:max-w-[1100px] px-4 md:px-[40px] lg:px-[100px] mx-auto">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
        {t("regions_management")}
      </h1>
      <p className="text-sm md:text-base text-gray-600 mb-6">
        {t("regions_management_description")}
      </p>

      {/* Add Region Button */}
      <div className="flex justify-end mb-6">
        <button
          className="bg-main hover:bg-mainHover text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
          onClick={() => setIsAddRegionOpen(true)}
        >
          + {t("add_region")}
        </button>
      </div>

      {isAddRegionOpen && <AddRegionModal setClose={setIsAddRegionOpen} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regionsArray.map((region: any, index: number) => (
          <div key={index} className="flex flex-col items-center">
            <RegionComp region={region} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Regions;
// const regions_array = [
//   {
//     id: 1,
//     name: "Riyadh",
//     photo:
//       "https://i0.wp.com/www.touristsaudiarabia.com/wp-content/uploads/2023/05/shutterstock_1224851173.jpg?resize=800%2C534&ssl=1",
//   },
//   {
//     id: 2,
//     name: "Jeddah",
//     photo:
//       "https://i0.wp.com/www.touristsaudiarabia.com/wp-content/uploads/2023/05/shutterstock_1224851173.jpg?resize=800%2C534&ssl=1",
//   },
//   {
//     id: 3,
//     name: "Dammam",
//     photo:
//       "https://i0.wp.com/www.touristsaudiarabia.com/wp-content/uploads/2023/05/shutterstock_1224851173.jpg?resize=800%2C534&ssl=1",
//   },
//   {
//     id: 4,
//     name: "Makkah",
//     photo:
//       "https://i0.wp.com/www.touristsaudiarabia.com/wp-content/uploads/2023/05/shutterstock_1224851173.jpg?resize=800%2C534&ssl=1",
//   },
// ];