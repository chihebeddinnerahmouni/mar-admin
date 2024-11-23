import React from "react";
import StarRatings from "react-star-ratings";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaBan } from "react-icons/fa";
import axios from "axios";

const ShipDetails = ({ ship }: any) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const urlUser = import.meta.env.VITE_SERVER_URL_USERS;

// console.log(ship);

  const navigateTo = () => {
    navigate(`boat-details/${ship.id}`);
  };


  // Delete, Block and Update functions
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    Swal.fire({
      title: t("Are you sure?"),
      text: t(`You want to delete ${ship.title} won't be able to revert this!`),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: t("Yes, delete it!"),
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${url}/api/listing/listings/${ship.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          })
          .then(() => {
            Swal.fire(t("Deleted!"), t("Your file has been deleted."), "success");
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
            Swal.fire("Error!", err.message, "error");
          });
      }
    });
  };


  // Block function
  const handleBlock = (e: React.MouseEvent) => {
    e.stopPropagation();
    Swal.fire({
      title: t("Do you want to block this listing?"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: t("Yes, block it!"),
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `${url}/api/listing/listings/${ship.id}/status`,
            {
              validated: true,
              blocked: true,
              block_reason: "This is a test reason",
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
              },
            }
          )
          .then((res) => {
            Swal.fire(
              t("Blocked!"),
              t("The listing has been blocked."),
              "success"
            );
            // window.location.reload();
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
            Swal.fire("Error!", err.message, "error");
          });

      }
    });
  };



  // Update function
  const handleUpdate = (e: React.MouseEvent) => {
    e.stopPropagation();
    Swal.fire({
      title: t("Do you want to update this boat?"),
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("Yes, update it!"),
    }).then((result) => {
      if (result.isConfirmed) {
        window.open(`/boats/update-boat/${ship.id}`, "_blank");
      }
    });
  };




  return (
    <div
      className="relative w-full group rounded-[12px] cursor-pointer max-w-[500px] 2xl:max-w-[500px] bg-creme transition-transform duration-300 hover:scale-[102%]"
      onClick={navigateTo}
    >
      <div className="relative">
        <img
          // src={ship.Images[0].url}
          src={`${url}/${ship.Images[0].url}`}
          className="w-full h-[200px] object-cover object-center rounded-[12px] lg:h-[190px] 2xl:h-[250px] transition-opacity duration-300 hover:opacity-100"
          alt="boat"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75 rounded-[12px] transition-opacity duration-300 hover:opacity-0"></div>
        <div className="absolute top-2 right-2 flex gap-2 opacity-100 group-hover:opacity-100 transition duration-300 lg:opacity-0">
          <button
            className="text-white bg-main p-2 rounded-full hover:bg-mainHover"
            onClick={handleUpdate}
          >
            <FaEdit />
          </button>
          <button
            className="text-white bg-main p-2 rounded-full hover:bg-mainHover"
            onClick={handleDelete}
          >
            <FaTrash />
          </button>
          <button
            className="text-white bg-main p-2 rounded-full hover:bg-mainHover"
            onClick={handleBlock}
          >
            <FaBan />
          </button>
        </div>
      </div>
      <div className="texts mt-3 text-writingMainDark px-3">
        <div className="titleRate flex w-full justify-between items-center">
          <p className="font-semibold text-[16px] lg:text-[16px] w-[55%] ellipsesCss lg:w-[55%] xl:w-[55%]">
            {ship.title}
          </p>
          <StarRatings
            rating={Math.floor(ship.rating)}
            starRatedColor="#FFD700"
            starEmptyColor="#dddcdc"
            numberOfStars={5}
            name="rating"
            starDimension="17px"
            starSpacing="1px"
          />
        </div>
        <p className="mt-1 w-full text-writingGrey font-medium text-sm lg:text-[14px] text-nowrap ellipsesCss">
          {ship.description}
        </p>
        <div className="priceGuests flex items-center justify-between mt-2">
          <p className="text-writingMainDark font-bold text-[16px]">
            ${ship.Prices[0].min_price}-{ship.Prices[0].max_price} {t("hour")}
          </p>
          <p className="text-writingGrey text-[13px] lg:text-[13px]">
            {ship.guests} {t("guests")}
          </p>
        </div>
        {ship.user && (
          <div className="profilePic absolute w-[60px] h-[70px] rounded-10 bg-white top-[-35px] left-[20px] flex items-center justify-center shadow-smallShadow hover:shadow-smallHoverShadow lg:h-[80px] lg:w-[65px]">
            <img
              src={
                ship.user.profilePicture
                  ? `${urlUser}/${ship.user.profilePicture}`
                  : "/anonyme.jpg"
              }
              className="w-[47px] h-[47px] object-cover object-center rounded-50 lg:w-[55px] lg:h-[55px]"
              alt="owner"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ShipDetails;