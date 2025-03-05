import ListingTable from "../../components/listings/listingTable";
import LoadingLine from "../../components/ui/LoadingLine";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { axios_error_handler } from "../../functions/axios_error_handler";

const fetschData = async () => {
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const { data } = await axios.get(`${url}/api/listing/listings/unvalidated/get`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  return data;
}

const MakeListings = () => {
  const { t } = useTranslation();

  const { data, isLoading, error } = useQuery({
    queryKey: ["getInvListings"],
    queryFn: () => fetschData(),
  });

  if (isLoading) {
    return <div className="w-full h-screen">
      <LoadingLine />
    </div>
  }

  if (error) {
    console.log(error);
    axios_error_handler(error, t);
    return null;
  }



  return (
    <div className="p-4 md:p-8 lg:max-w-[1000px] mx-auto px-4 md:px-[40px]">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text">
        Listings Management
      </h1>
      <p className="text-sm md:text-base text-gray-600 mb-8">
        Explore and manage Listings with detailed insights into each type of
        boat available for rental.
      </p>
      <ListingTable rows={data} />
    </div>
  );
}

export default MakeListings

