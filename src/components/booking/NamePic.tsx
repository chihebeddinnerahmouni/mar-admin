import { useNavigate } from "react-router-dom";

const BoatNameAndPic = ({ details }: any) => {
  const navigate = useNavigate();
    const url = import.meta.env.VITE_SERVER_URL_LISTING;
    

  const handleClick = () => {
    navigate(`/boat-details/${details.listingDetails.id}`);
  };

  return (
    <div
      className="w-full p-2 bg-white mt-5 rounded-10 shadow-sm flex items-start gap-4 cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={`${url}/${details.listingDetails.image}`}
        className="w-[130px] h-[90px] object-cover object-center rounded-10"
        alt="profile"
      />

      <div className="text">
        <p className="text-[18px] lg:text-[22px] font-semibold">
          {details.listingDetails.name}
        </p>
      </div>
    </div>
  );
};

export default BoatNameAndPic;
