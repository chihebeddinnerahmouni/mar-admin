import ListingTable from "../../components/listings/listingTable";
import LoadingLine from "../../components/ui/LoadingLine";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";


const MakeListings = () => {

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const url = import.meta.env.VITE_SERVER_URL_LISTING;




  useEffect(() => {
    axios
      .get(url + "/api/listinglistings/unvalidated", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((res) => {
        setRequests(res.data);
        console.log(res.data);
        // setLoading(false);
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
        // setLoading(false);
      });
  }, []);



  if (loading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    );
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
      <ListingTable rows={requests} />
    </div>
  );
}

export default MakeListings


// const requests = [
//   {
//     id: 1,
//     name: "chiheb rahmouni",
//     image: "https://",
//     email: "chihebrahmouni30@gmail.com",
//     phone: "0773781669",
//     boatName: "boat amazing world trips",
//   },
//   {
//     id: 2,
//     name: "dounia saidi",
//     image: "https://",
//     email: "chihebrahmouni30@gmail.com",
//     phone: "0773781669",
//     boatName: "boat amazing world trips",
//   },
//   {
//     id: 3,
//     name: "filali raouf",
//     image: "https://",
//     email: "chihebrahmouni30@gmail.com",
//     phone: "0773781669",
//     boatName: "boat amazing world trips",
//   },
//   {
//     id: 4,
//     name: "islem fortas",
//     image: "https://",
//     email: "chihebrahmouni30@gmail.com",
//     phone: "0773781669",
//     boatName: "boat amazing world trips",
//   },
// ];