import image from "../assets/images/image_of_no_found_page";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaAnchor, FaShip } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NoPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div
      className="w-full flex justify-center items-center h-screen py-0 px-4"
      style={{
        background: "linear-gradient(to bottom, #FF7F89, #FFA6B0)",
      }}
    >
      <div className="content w-full md:w-[500px] flex flex-col items-center gap-3 lg:gap-5 text-center bg-white p-6 rounded-lg shadow-lg">
        <img
          src={image}
          alt="Boat"
          className="w-1/2 md:w-1/3 h-[200px] object-cover lg:w-1/4 mb-4 rounded-full border-4 border-white shadow-md"
        />
        <FaAnchor className="text-main text-6xl mb-4" />
        <p className="text-[26px] font-semibold text-writingMainDark lg:text-[26px]">
          {t("page_not_found")}
        </p>
        <p className="text-[18px] text-main lg:text-[20px]">
          {t("sailed_into_uncharted_waters")}
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-main text-white rounded-lg hover:bg-mainHover transition duration-300 flex items-center gap-2"
        >
          <FaShip />
          {t("go_back_home")}
        </button>
      </div>
    </div>
  );
};

export default NoPage;

// import React from "react";
// import { useTranslation } from "react-i18next";
// import { FaAnchor, FaShip } from "react-icons/fa";

// const NoPage: React.FC = () => {
//   const { t } = useTranslation();

//   return (
//     <div className="w-full flex justify-center items-center h-screen bg-gradient-to-b from-blue-300 to-blue-500 py-0 px-4">
//       <div className="content w-full md:w-[500px] flex flex-col items-center gap-3 lg:gap-5 text-center bg-white p-6 rounded-lg shadow-lg">
//         <img
//           src={image}
//           alt="Boat"
//           className="w-1/2 md:w-1/3 lg:w-1/4 mb-4 rounded-full border-4 border-white shadow-md"
//         />
//         <FaAnchor className="text-blue-700 text-6xl mb-4" />
//         <p className="text-[26px] font-semibold text-blue-900 lg:text-[26px]">
//           {t("page_not_found")}
//         </p>
//         <p className="text-[18px] text-blue-700 lg:text-[20px]">
//           {t("sailed_into_uncharted_waters")}
//         </p>
//         <a
//           href="/?page=1"
//           className="mt-4 px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition duration-300 flex items-center gap-2"
//         >
//           <FaShip />
//           {t("go_back_home")}
//         </a>
//       </div>
//     </div>
//   );
// };

// export default NoPage;