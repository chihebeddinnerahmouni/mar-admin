import Name from "../../components/check listing/Name";
import Desc from "../../components/check listing/Desc";
import Images from "../../components/check listing/Images";
import Prices from "../../components/check listing/Prices";
import SpeceficDates from "../../components/check listing/SpeceficDates";
import Region from "../../components/check listing/Region";
import Guests from "../../components/check listing/Guests";
import Availability from "../../components/check listing/Availability";
import Features from "../../components/check listing/Features";
import Category from "../../components/check listing/Category";
import Location from "../../components/check listing/Location";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingLine from "../../components/ui/LoadingLine";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LoadingButton from "../../components/ui/LoadingButton";



const CheckListing = () => {

  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const { listingId } = useParams<{ listingId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const url = import.meta.env.VITE_SERVER_URL_LISTING as string;


  useEffect(() => {
   axios
     .get(`${url}/api/listing/listings/${listingId}`)
     .then((res) => {
       console.log(res.data);
       if (res.data.validated === true) {
        return  Swal.fire("error", "listing_already_accepted", "error").then(() => {
            navigate("/listings");
          });
       }
       setListing(res.data);
       setLoading(false);
     })
     .catch((err) => {
       console.log(err);
       if (err.status === 404) {
         Swal.fire("error", "theres_no_boat_match_this_id", "error").then(
           () => {
             navigate("/listings");
           }
         );
       } else if (err.message === "Network Error") {
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
  }, [listingId]);



  const accept = () => {

    setLoadingButton(true);
    axios
      .put(
        `${url}/api/listing/listings/${listingId}/status`,
        {
          validated: true,
          blocked: false,
          block_reason: "This is a test reason",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        Swal.fire("success", "listing_accepted", "success")
        .then(() => {
          navigate("/listings");
        })
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
        // Swal.fire("error", "error_occured", "error");
      })
      .finally(() => {
        setLoadingButton(false);
      });
   }



  if (loading) return (
    <div className="w-full h-screen">
      <LoadingLine />
    </div>
  )



  
  return (
    <div className="p-4 md:p-8 lg:max-w-[700px] mx-auto pb-10 px-4 md:px-[40px]">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text">
        Details of {listing.owner.name} {listing.owner.surname}'s Listing
      </h1>
      <p className="text-sm md:text-base text-gray-600 mb-8">
        This is what {listing.owner.name} uploaded as informations for his/her
        listsing.
      </p>

      <div className="buttons bg-creme h-[60px] flex justify-end items-center gap-4 mb-8 sticky top-[60px] lg:top-[80px] z-10">
        <button
          className="bg-green-500 text-white w-[90px] h-10 rounded hover:bg-green-600"
          onClick={accept}
        >
          {loadingButton ? <LoadingButton /> : "Accept"}
        </button>
        <button className="bg-main text-white w-[90px] h-10 rounded hover:bg-mainHover">
          Refuse
        </button>
      </div>

      <Name title={listing.title} />
      <Desc description={listing.description} />
      <Images images={listing.Images} />
      <Category category={listing.category} />
      <Features features={listing.Features} />
      <Prices prices={listing.Prices} />
      <SpeceficDates prices={listing.Prices} />
      <Region region={listing.region} />
      <Guests guests={listing.guests} />
      <Availability availabilities={listing.Availabilities} />
      <Location latitude={listing.latitude} longitude={listing.longitude} />
    </div>
  );
}

export default CheckListing




// const listing = {
//   id: 11,
//   title: "Beautiful Beach Boat",
//   description: "Enjoy a serene boat trip with scenic beach views.",
//     rating: 0,
//     guests: 10,
//     category: "Boat",
//   latitude: 25.277,
//   longitude: 55.2962,
//   validated: true,
//   blocked: false,
//   block_reason: "This is a test reason",
//   user_id: 1,
//   isFavourite: false,
//   owner: {
//     id: 1,
//     name: "zakaria",
//     surname: "amrani",
//     email: "amrazakaria4@gmail.com",
//     image: "uploads/avatars/1731949975858.jpg",
//     createdAt: "18/11/2024",
//   },
//   createdAt: "2024-11-18T17:49:19.000Z",
//   updatedAt: "2024-11-18T17:51:00.000Z",
//   Images: [
//     {
//       id: 51,
//       listing_id: 11,
//       url: "uploads/1731952159020-V-CLASS-PAGE-IMAGE.png",
//       createdAt: "2024-11-18T17:49:19.000Z",
//       updatedAt: "2024-11-18T17:49:19.000Z",
//     },
//     {
//       id: 52,
//       listing_id: 11,
//       url: "uploads/1731952159021-V-CLASS-PAGE-IMAGE.png",
//       createdAt: "2024-11-18T17:49:19.000Z",
//       updatedAt: "2024-11-18T17:49:19.000Z",
//     },
//     {
//       id: 53,
//       listing_id: 11,
//       url: "uploads/1731952159022-V-CLASS-PAGE-IMAGE.png",
//       createdAt: "2024-11-18T17:49:19.000Z",
//       updatedAt: "2024-11-18T17:49:19.000Z",
//     },
//     {
//       id: 54,
//       listing_id: 11,
//       url: "uploads/1731952159023-V-CLASS-PAGE-IMAGE.png",
//       createdAt: "2024-11-18T17:49:19.000Z",
//       updatedAt: "2024-11-18T17:49:19.000Z",
//     },
//     {
//       id: 55,
//       listing_id: 11,
//       url: "uploads/1731952159024-V-CLASS-PAGE-IMAGE.png",
//       createdAt: "2024-11-18T17:49:19.000Z",
//       updatedAt: "2024-11-18T17:49:19.000Z",
//     },
//   ],
//   region: "Al Riadh",
//     Features: [{
//         id: 1,
//         arName: "المرحاض",
//         enName: "Toilet",
//     }, {
//         id: 2,
//         arName: "المطبخ",
//         enName: "Kitchen",
//         }, {
//         id: 3,
//         arName: "المكيف",
//         enName: "Air conditioning",
//     }
//     ],
//   Benefits: [],
//   Availabilities: [
//     {
//       id: 21,
//       listing_id: 11,
//       start_date: "2024-12-01",
//       end_date: "2024-12-15",
//       reserved: true,
//       createdAt: "2024-11-18T17:49:19.000Z",
//       updatedAt: "2024-11-18T17:49:19.000Z",
//     },
//     {
//       id: 22,
//       listing_id: 11,
//       start_date: "2024-12-15",
//       end_date: "2024-12-16",
//       reserved: true,
//       createdAt: "2024-11-18T17:49:19.000Z",
//       updatedAt: "2024-11-18T17:49:19.000Z",
//     }
//   ],
//   Prices: [
//     {
//       id: 11,
//       listing_id: 11,
//       price_per_hour: 420,
//       date_specific_price: [
//         {
//           date: "2024-12-25",
//           price: 320,
//           min_hours: 3,
//         },
//         {
//           date: "2024-12-31",
//           price: 300,
//           min_hours: 2,
//         },
//       ],
//       min_hours: 2,
//       max_hours: 6,
//       createdAt: "2024-11-18T17:49:19.000Z",
//       updatedAt: "2024-11-18T17:49:19.000Z",
//     },
//   ],
//   priceRange: {
//     min: null,
//     max: null,
//   },
//   reviews: [],
//   averageRatings: {
//     route_experience: null,
//     value: null,
//     communication: null,
//     vessel_equipment: null,
//     departure_return: null,
//     listing_accuracy: null,
//   },
// };