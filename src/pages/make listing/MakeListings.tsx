import ListingTable from "../../components/listings/listingTable";
import LoadingLine from "../../components/ui/LoadingLine";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { axios_error_handler } from "../../functions/axios_error_handler";
import { useEffect } from "react";

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

  useEffect(() => {
    if (error) axios_error_handler(error, t);
  }, [error]);
  if (error) return null;



  if (isLoading) {
    return <div className="w-full h-screen">
      <LoadingLine />
    </div>
  }




  return (
    <div className="p-4 md:p-8 lg:max-w-[1000px] mx-auto px-4 md:px-[40px]">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text">
        {t("listings_management")}
      </h1>
      <p className="text-sm md:text-base text-gray-600 mb-8">
        {t("explore_and_manage_listings")}
      </p>
      <ListingTable rows={data.listings} />
      {/* <ListingTable rows={sampleData} /> */}
    </div>
  );
}

export default MakeListings

// const sampleData = [
//   {
//     id: 1,
//     profilePic: "https://via.placeholder.com/40",
//     name: "John Doe",
//     phone: "123-456-7890",
//     email: "john.doe@example.com",
//     ownerName: "John Doe",
//     title: "Luxury Yacht",
//     user: {
//       phoneNumber: "123-456-7890",
//       email: "john.doe@example.com",
//       name: "John",
//       surname: "Doe"
//     },
//     Images: [
//       { url: "https://via.placeholder.com/150" }
//     ]
//   },
//   {
//     id: 2,
//     profilePic: "https://via.placeholder.com/40",
//     name: "Jane Smith",
//     phone: "987-654-3210",
//     email: "jane.smith@example.com",
//     ownerName: "Jane Smith",
//     title: "Speed Boat",
//     user: {
//       phoneNumber: "987-654-3210",
//       email: "jane.smith@example.com",
//       name: "Jane",
//       surname: "Smith"
//     },
//     Images: [
//       { url: "https://via.placeholder.com/150" }
//     ]
//   }
// ];

