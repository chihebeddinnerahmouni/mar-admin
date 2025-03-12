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
import { useParams } from "react-router-dom";
import LoadingLine from "../../components/ui/LoadingLine";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { axios_error_handler } from "../../functions/axios_error_handler";
import { useEffect } from "react";
import ButtonsCont from "../../containers/listing/ButtonsCont";

const url = import.meta.env.VITE_SERVER_URL_LISTING as string;
const fetshListing = async ( listingId: string) => {
  const {data} = await axios.get(`${url}/api/listing/listings/${listingId}`);
  return data;
}

const CheckListing = () => {
  const { listingId } = useParams<{ listingId: string }>();
  const { t } = useTranslation();

  const { data, error, isLoading } = useQuery({
    queryKey: ["getListing", listingId],
    queryFn: () => fetshListing(listingId!),
  });

  
  
  useEffect(() => {
    if (error) axios_error_handler(error, t);
  }, [error]);
  if (error) return null;



if (isLoading)
  return (
    <div className="w-full h-screen">
      <LoadingLine />
    </div>
  );

  

  
  return (
    <div className="p-4 md:p-8 lg:max-w-[700px] mx-auto pb-10 px-4 md:px-[40px]">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text">
        {t("details_of")} {data.title}
      </h1>
      <p className="text-sm md:text-base text-gray-600 mb-8">
        {t("this_is_what")} {data.owner.name} {t("has_entered_as_informations")}
      </p>
      <ButtonsCont listingId={data.id} />

      <Name title={data.title} />
      <Desc description={data.description} />
      <Images images={data.Images} />
      <Category category={data.category} />
      <Features features={data.Features} />
      <Prices prices={data.Prices} />
      <SpeceficDates prices={data.Prices} />
      <Region region={data.region} />
      <Guests guests={data.guest} />
      <Availability availabilities={data.Availabilities} />
      <Location latitude={data.latitude} longitude={data.longitude} />
    </div>
  );
}

export default CheckListing;




// const listingTest = {
//   id: 25,
//   title: "قارب خاص للرحلات الرومانسية",
//   description:
//     "استمتع بجو هادئ ورومانسي على هذا القارب المصمم خصيصًا للأزواج. يتميز بتصميم مريح مع إضاءة خافتة ومقاعد مريحة، مما يجعله مثاليًا لقضاء أوقات خاصة تحت ضوء القمر.",
//   rating: 0,
//   latitude: 36.461,
//   longitude: 4.53837,
//   validated: true,
//   blocked: false,
//   block_reason: "This is a test reason",
//   user_id: 4,
//   isFavourite: false,
//   owner: {
//     id: 4,
//     name: "Osama",
//     surname: "Alghadi",
//     email: "Osama@gmail.com",
//     image: "uploads/avatars/1739987979837.jpg",
//     createdAt: "19/02/2025",
//   },
//   createdAt: "2025-02-19T18:10:20.000Z",
//   updatedAt: "2025-03-01T16:24:35.000Z",
//   Images: [
//     {
//       id: 117,
//       listing_id: 25,
//       url: "/public/map.png",
//       createdAt: "2025-02-19T18:10:20.000Z",
//       updatedAt: "2025-02-19T18:10:20.000Z",
//     },
//     {
//       id: 118,
//       listing_id: 25,
//       url: "/public/map.png",
//       createdAt: "2025-02-19T18:10:20.000Z",
//       updatedAt: "2025-02-19T18:10:20.000Z",
//     },
//     {
//       id: 119,
//       listing_id: 25,
//       url: "/public/map.png",
//       createdAt: "2025-02-19T18:10:20.000Z",
//       updatedAt: "2025-02-19T18:10:20.000Z",
//     },
//     {
//       id: 120,
//       listing_id: 25,
//       url: "/public/map.png",
//       createdAt: "2025-02-19T18:10:20.000Z",
//       updatedAt: "2025-02-19T18:10:20.000Z",
//     },
//     {
//       id: 121,
//       listing_id: 25,
//       url: "/public/map.png",
//       createdAt: "2025-02-19T18:10:20.000Z",
//       updatedAt: "2025-02-19T18:10:20.000Z",
//     },
//   ],
//   region: "Jeddah",
//   Features: [
//     {
//       id: 1,
//       name: "full bathroom",
//       arabic_name: "حمام كامل",
//       image: "uploads/features/1739965026155-boat.png",
//       createdAt: "2025-02-19T11:37:06.000Z",
//       updatedAt: "2025-02-19T11:37:06.000Z",
//       ListingFeatures: {
//         createdAt: "2025-02-19T18:10:20.000Z",
//         updatedAt: "2025-02-19T18:10:20.000Z",
//         feature_id: 1,
//         listing_id: 25,
//       },
//     },
//     {
//       id: 2,
//       name: "GPS Navigation",
//       arabic_name: "نظام تحديد المواقع",
//       image: "uploads/features/1739986020000-boat.png",
//       createdAt: "2025-02-19T17:27:00.000Z",
//       updatedAt: "2025-02-19T17:27:00.000Z",
//       ListingFeatures: {
//         createdAt: "2025-02-19T18:10:20.000Z",
//         updatedAt: "2025-02-19T18:10:20.000Z",
//         feature_id: 2,
//         listing_id: 25,
//       },
//     },
//     {
//       id: 3,
//       name: "Life Jackets",
//       arabic_name: "سترات النجاة",
//       image: "uploads/features/1739986034738-boat.png",
//       createdAt: "2025-02-19T17:27:14.000Z",
//       updatedAt: "2025-02-19T17:27:14.000Z",
//       ListingFeatures: {
//         createdAt: "2025-02-19T18:10:20.000Z",
//         updatedAt: "2025-02-19T18:10:20.000Z",
//         feature_id: 3,
//         listing_id: 25,
//       },
//     },
//     {
//       id: 6,
//       name: "Bluetooth Sound System",
//       arabic_name: "نظام صوت بلوتوث",
//       image: "uploads/features/1739986073682-boat.png",
//       createdAt: "2025-02-19T17:27:53.000Z",
//       updatedAt: "2025-02-19T17:27:53.000Z",
//       ListingFeatures: {
//         createdAt: "2025-02-19T18:10:20.000Z",
//         updatedAt: "2025-02-19T18:10:20.000Z",
//         feature_id: 6,
//         listing_id: 25,
//       },
//     },
//     {
//       id: 5,
//       name: "Sunshade Canopy",
//       arabic_name: "مظلة الشمس",
//       image: "uploads/features/1739986062025-boat.png",
//       createdAt: "2025-02-19T17:27:42.000Z",
//       updatedAt: "2025-02-19T17:27:42.000Z",
//       ListingFeatures: {
//         createdAt: "2025-02-19T18:10:20.000Z",
//         updatedAt: "2025-02-19T18:10:20.000Z",
//         feature_id: 5,
//         listing_id: 25,
//       },
//     },
//     {
//       id: 4,
//       name: "Fishing Equipment",
//       arabic_name: "معدات الصيد",
//       image: "uploads/features/1739986049880-boat.png",
//       createdAt: "2025-02-19T17:27:29.000Z",
//       updatedAt: "2025-02-19T17:27:29.000Z",
//       ListingFeatures: {
//         createdAt: "2025-02-19T18:10:20.000Z",
//         updatedAt: "2025-02-19T18:10:20.000Z",
//         feature_id: 4,
//         listing_id: 25,
//       },
//     },
//     {
//       id: 7,
//       name: "Underwater Lights",
//       arabic_name: "أضواء تحت الماء",
//       image: "uploads/features/1739986085361-boat.png",
//       createdAt: "2025-02-19T17:28:05.000Z",
//       updatedAt: "2025-02-19T17:28:05.000Z",
//       ListingFeatures: {
//         createdAt: "2025-02-19T18:10:20.000Z",
//         updatedAt: "2025-02-19T18:10:20.000Z",
//         feature_id: 7,
//         listing_id: 25,
//       },
//     },
//     {
//       id: 8,
//       name: "Luxury Seating",
//       arabic_name: "مقاعد فاخرة",
//       image: "uploads/features/1739986096820-boat.png",
//       createdAt: "2025-02-19T17:28:16.000Z",
//       updatedAt: "2025-02-19T17:28:16.000Z",
//       ListingFeatures: {
//         createdAt: "2025-02-19T18:10:20.000Z",
//         updatedAt: "2025-02-19T18:10:20.000Z",
//         feature_id: 8,
//         listing_id: 25,
//       },
//     },
//     {
//       id: 9,
//       name: "Diving Platform",
//       arabic_name: "منصة الغوص",
//       image: "uploads/features/1739986109570-boat.png",
//       createdAt: "2025-02-19T17:28:29.000Z",
//       updatedAt: "2025-02-19T17:28:29.000Z",
//       ListingFeatures: {
//         createdAt: "2025-02-19T18:10:20.000Z",
//         updatedAt: "2025-02-19T18:10:20.000Z",
//         feature_id: 9,
//         listing_id: 25,
//       },
//     },
//     {
//       id: 11,
//       name: "Wi-Fi Internet",
//       arabic_name: "إنترنت واي فاي",
//       image: "uploads/features/1739986166887-boat.png",
//       createdAt: "2025-02-19T17:29:26.000Z",
//       updatedAt: "2025-02-19T17:29:26.000Z",
//       ListingFeatures: {
//         createdAt: "2025-02-19T18:10:20.000Z",
//         updatedAt: "2025-02-19T18:10:20.000Z",
//         feature_id: 11,
//         listing_id: 25,
//       },
//     },
//     {
//       id: 10,
//       name: "Cooler & Ice Box",
//       arabic_name: "صندوق تبريد وثلج",
//       image: "uploads/features/1739986121490-boat.png",
//       createdAt: "2025-02-19T17:28:41.000Z",
//       updatedAt: "2025-02-19T17:28:41.000Z",
//       ListingFeatures: {
//         createdAt: "2025-02-19T18:10:20.000Z",
//         updatedAt: "2025-02-19T18:10:20.000Z",
//         feature_id: 10,
//         listing_id: 25,
//       },
//     },
//   ],
//   Benefits: [],
//   Availabilities: [],
//   Prices: [
//     {
//       id: 23,
//       listing_id: 25,
//       price_per_hour: 1800,
//       date_specific_price: [],
//       min_hours: 1,
//       max_hours: 6,
//       createdAt: "2025-02-19T18:10:20.000Z",
//       updatedAt: "2025-02-19T18:10:20.000Z",
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