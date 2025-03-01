import { useCallback } from "react";
import axios from "axios";
import LoadingLine from "../components/ui/LoadingLine";
import { useTranslation } from "react-i18next";
import RegionsTable from "../components/regions/RegionsTable";
import { useQuery } from "@tanstack/react-query";
import { axios_error_handler } from "../functions/axios_error_handler";

const Regions = () => {
  const { t } = useTranslation();

  const fetchData = useCallback(async () => {
    const url = import.meta.env.VITE_SERVER_URL_LISTING;
    const response = await axios.get(`${url}/api/region/regions`);
    return response.data;
  }, []);

  const { data, error, isLoading } = useQuery({
    queryKey: ["getRegions"],
    queryFn: fetchData,
  });

  if (isLoading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    );
  }

  if (error) {
    axios_error_handler(error, t);
    return null;
  }

  return (
    <div className="p-4 md:p-8 lg:max-w-[1100px] px-4 md:px-[40px] lg:px-[100px] mx-auto">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
        {t("regions_management")}
      </h1>
      <p className="text-sm md:text-base text-gray-600 mb-6">
        {t("regions_management_description")}
      </p>
      <RegionsTable regions={data} />
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
