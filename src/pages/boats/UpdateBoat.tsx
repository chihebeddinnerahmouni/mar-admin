import { useTranslation } from "react-i18next";
import Owner from "../../components/update boat/Owner";
import NamePic from "../../components/update boat/NamePic";
import Desc from "../../components/update boat//Desc";
import Validated from "../../components/update boat/Validated";
import Prices from "../../components/update boat/Prices";
import Region from "../../components/update boat/Region";
import Guests from "../../components/update boat/Guests";
import Availability from "../../components/update boat/Availability";
import SpeceficDates from "../../components/update boat/SpeceficDates";
import axios from "axios";
import LoadingLine from "../../components/ui/LoadingLine";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Images from "../../components/update boat/Images";
import Reviews from "../../components/update boat/Reviews";

const UpdateBoat = () => {
  const { t } = useTranslation();
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { boatId } = useParams<{ boatId: string }>();
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const navigate = useNavigate();

  useEffect(() => {
    // setLoading(true);

    // setDetails(one);
    // setLoading(false);

    axios
      .get(`${url}/api/listing/listings/${boatId}`)
      .then((res) => {
        console.log(res.data);
        setDetails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.status === 404) {
          Swal.fire("error", "theres_no_boat_match_this_id", "error").then(
            () => {
              navigate("/");
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
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    );
  }

  // console.log(details);

  return (
    <>
      <div className="content pb-10 pt-5 px-4 md:px-10 md:mx-auto md:w-[650px]">
        <p className="text-[18px] lg:text-[20px] font-medium text-writingGrey mt-2 w-full self-start ellipsesCss">
          {details.title}
        </p>

        <Owner details={details} />
        <Validated
          blocked={details.blocked}
          title={details.title}
          id={details.id}
        />
        <NamePic
          title={details.title}
          image={`${url}/${details.Images[0].url}`}
        />
        <Desc description={details.description} />
        <Images images={details.Images} />
        <Prices prices={details.Prices} />
        <SpeceficDates prices={details.Prices} />
        <Region region={details.region} />
        <Guests guests={details.guests} />
        <Availability availabilities={details.Availabilities} />
        <Reviews reviews={details.reviews} />
      </div>
    </>
  );
};

export default UpdateBoat;

// const one = {
//   id: 65,
//   title: "Beautiful Beachgfhgfh g",
//   description:
//     "Enjoy a serene boat trip with scenic beach views. Enjoy a serene boat trip with scenic beach views. Enjoy a serene boat trip with scenic beach views.    Enjoy a serene boat trip with scenic beach views  Enjoy a serene boat trip with scenic beach views. Enjoy a serene boat trip with scenic beach views.  Enjoy a serene boat trip with scenic beach views",
//   rating: 0,
//   latitude: 36.1907,
//   longitude: 5.4419,
//   validated: true,
//   blocked: false,
//   block_reason: "This is a test reason",
//   user_id: 4,
//   category_id: 3,
//   guests: 3,
//   region_id: 1,
//   createdAt: "2024-11-02T17:15:25.000Z",
//   updatedAt: "2024-11-05T11:53:15.000Z",
//   Images: [
//     {
//       url: "https://getmyboat-user-images1.imgix.net/images/541b31cb-082a-4327-8ecd-eafa185e2c7c/-processed.jpg?ixlib=js-3.8.0&q=50&fit=crop&auto=format%2Ccompress&w=426&h=276&dpr=1",
//     },
//     {
//       url: "https://getmyboat-user-images1.imgix.net/images/541b31cb-082a-4327-8ecd-eafa185e2c7c/-processed.jpg?ixlib=js-3.8.0&q=50&fit=crop&auto=format%2Ccompress&w=426&h=276&dpr=1",
//     },
//     {
//       url: "https://getmyboat-user-images1.imgix.net/images/541b31cb-082a-4327-8ecd-eafa185e2c7c/-processed.jpg?ixlib=js-3.8.0&q=50&fit=crop&auto=format%2Ccompress&w=426&h=276&dpr=1",
//     },
//     {
//       url: "https://getmyboat-user-images1.imgix.net/images/541b31cb-082a-4327-8ecd-eafa185e2c7c/-processed.jpg?ixlib=js-3.8.0&q=50&fit=crop&auto=format%2Ccompress&w=426&h=276&dpr=1",
//     },
//     {
//       url: "https://getmyboat-user-images1.imgix.net/images/541b31cb-082a-4327-8ecd-eafa185e2c7c/-processed.jpg?ixlib=js-3.8.0&q=50&fit=crop&auto=format%2Ccompress&w=426&h=276&dpr=1",
//     },
//     {
//       url: "https://getmyboat-user-images1.imgix.net/images/541b31cb-082a-4327-8ecd-eafa185e2c7c/-processed.jpg?ixlib=js-3.8.0&q=50&fit=crop&auto=format%2Ccompress&w=426&h=276&dpr=1",
//     },
//     {
//       url: "https://getmyboat-user-images1.imgix.net/images/541b31cb-082a-4327-8ecd-eafa185e2c7c/-processed.jpg?ixlib=js-3.8.0&q=50&fit=crop&auto=format%2Ccompress&w=426&h=276&dpr=1",
//     },
//     {
//       url: "https://getmyboat-user-images1.imgix.net/images/541b31cb-082a-4327-8ecd-eafa185e2c7c/-processed.jpg?ixlib=js-3.8.0&q=50&fit=crop&auto=format%2Ccompress&w=426&h=276&dpr=1",
//     },
//     {
//       url: "https://getmyboat-user-images1.imgix.net/images/541b31cb-082a-4327-8ecd-eafa185e2c7c/-processed.jpg?ixlib=js-3.8.0&q=50&fit=crop&auto=format%2Ccompress&w=426&h=276&dpr=1",
//     },
//     {
//       url: "https://getmyboat-user-images1.imgix.net/images/541b31cb-082a-4327-8ecd-eafa185e2c7c/-processed.jpg?ixlib=js-3.8.0&q=50&fit=crop&auto=format%2Ccompress&w=426&h=276&dpr=1",
//     },
//     {
//       url: "https://getmyboat-user-images1.imgix.net/images/541b31cb-082a-4327-8ecd-eafa185e2c7c/-processed.jpg?ixlib=js-3.8.0&q=50&fit=crop&auto=format%2Ccompress&w=426&h=276&dpr=1",
//     },
//   ],
//   Availabilities: [
//     {
//       id: 95,
//       listing_id: 65,
//       start_date: "2024-12-01",
//       end_date: "2024-12-15",
//       reserved: true,
//       createdAt: "2024-11-05T11:53:36.000Z",
//       updatedAt: "2024-11-05T11:53:36.000Z",
//     },
//     {
//       id: 96,
//       listing_id: 65,
//       start_date: "2024-12-15",
//       end_date: "2024-12-16",
//       reserved: true,
//       createdAt: "2024-11-05T11:53:36.000Z",
//       updatedAt: "2024-11-05T11:53:36.000Z",
//     },
//   ],

//   reviews: [
//     {
//       user: {
//         image: "uploads\\avatars\\1730826334068.jpg",
//         name: "chiheb Rahmouni",
//         createdAt: "2024 Nov 10",
//       },
//       review_content: "This is a test review",
//     },
//     {
//       user: {
//         image: "uploads\\avatars\\1730826334068.jpg",
//         name: "chiheb Rahmouni",
//         createdAt: "2024 Nov 10",
//       },
//       review_content:
//         "This is a test review, This is a test review,iyg iygiyigilg igy iutpit egfie ffefe esdfzrh iziuzgbozfpiu o*zînizyu ihnqfepuypçzuiuzg pi This is a test review, This is a test review,iyg iygiyigilg igy iutpit egfie ffefe esdfzrh iziuzgbozfpiu o*zînizyu ihnqfepuypçzuiuzg pi ",
//     },
//   ],

//   Region: {
//     id: 1,
//     name: "Al Riadh",
//     description: "dfsdgflkmj fsd dfglkmdfjglmkdjf gdfg fqdlgjf ",
//     createdAt: "2024-10-28T18:18:31.000Z",
//     updatedAt: "2024-10-28T18:18:31.000Z",
//   },
//   Prices: [
//     {
//       id: 51,
//       listing_id: 65,
//       price_per_hour: 250,
//       date_specific_price: [],
//       min_hours: 2,
//       max_hours: 6,
//       createdAt: "2024-11-05T11:53:36.000Z",
//       updatedAt: "2024-11-05T11:53:36.000Z",
//       min_price: 500,
//       max_price: 1500,
//     },
//   ],
//   Reviews: [],
//   Features: [
//     {
//       id: 4,
//       name: "test",
//       image: "uploads\\features\\1730308420735-hirbae.jpg",
//       createdAt: "2024-10-30T17:13:40.000Z",
//       updatedAt: "2024-10-30T17:13:40.000Z",
//       ListingFeatures: {
//         createdAt: "2024-11-02T17:15:25.000Z",
//         updatedAt: "2024-11-02T17:15:25.000Z",
//         feature_id: 4,
//         listing_id: 65,
//       },
//     },
//     {
//       id: 3,
//       name: "Bath",
//       image: "uploads\\features\\1730308411205-hirbae.jpg",
//       createdAt: "2024-10-30T17:13:31.000Z",
//       updatedAt: "2024-10-30T17:13:31.000Z",
//       ListingFeatures: {
//         createdAt: "2024-11-02T17:15:25.000Z",
//         updatedAt: "2024-11-02T17:15:25.000Z",
//         feature_id: 3,
//         listing_id: 65,
//       },
//     },
//     {
//       id: 2,
//       name: "حمام كامل\n",
//       image: "uploads\\features\\1730307320483-hirbae.jpg",
//       createdAt: "2024-10-30T16:55:20.000Z",
//       updatedAt: "2024-10-30T16:55:20.000Z",
//       ListingFeatures: {
//         createdAt: "2024-11-02T17:15:25.000Z",
//         updatedAt: "2024-11-02T17:15:25.000Z",
//         feature_id: 2,
//         listing_id: 65,
//       },
//     },
//     {
//       id: 7,
//       name: "chiheb",
//       image: "uploads\\features\\1730308455477-hirbae.jpg",
//       createdAt: "2024-10-30T17:14:15.000Z",
//       updatedAt: "2024-10-30T17:14:15.000Z",
//       ListingFeatures: {
//         createdAt: "2024-11-02T17:15:25.000Z",
//         updatedAt: "2024-11-02T17:15:25.000Z",
//         feature_id: 7,
//         listing_id: 65,
//       },
//     },
//   ],
//   user: {
//     id: 4,
//     name: "chiheb",
//     surname: "rahmouni",
//     email: "chihebrahmouni31@gmail.com",
//     password: "$2b$10$YwQuV7647Uf9heF2gsiQwevN8jONFUT6YZdEmm8scjrCXuwTZiaL.",
//     phoneNumber: "+2130778731669",
//     profilePicture: "uploads\\avatars\\1730826334068.jpg",
//     dateOfBirth: null,
//     address: null,
//     isAuthorized: "none",
//     role: "user",
//     lastLogin: null,
//     isVerified: false,
//     preferences: null,
//     block: false,
//     suspend: false,
//     contact: true,
//     createdAt: "2024-11-05T12:20:13.000Z",
//     description: "im ready",
//     languageSpoken: "English",
//     updatedAt: "2024-11-05T17:05:34.000Z",
//   },
//   totalReviews: 0,
// };
