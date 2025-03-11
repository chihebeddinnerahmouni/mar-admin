import { useTranslation } from "react-i18next";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import UpdateReleasedModal from "../transactions/UpdateReleasedModal";
import { useState } from "react";



const BalanceSection = ({ released, unreleased }: { released: number; unreleased: number }) => {


  const { t } = useTranslation();
  const [isRealesedModalOpen, setIsRealesedModalOpen] = useState(true);

    return (
      <div className="flex flex-col w-full">
        <button
          onClick={() => setIsRealesedModalOpen(true)}
          className="text-main p-2 mb-2 mx-auto font-medium underline hover:text-mainHover"
        >
          {t("update_balance")}
        </button>
        <div className="balance-section flex flex-col md:flex-row justify-center items-center mb-8 gap-4 md:gap-7">
          <div
            className="w-full released-balance flex items-center p-3 rounded-lg shadow-sm bg-white border border-green-900 transform transition duration-300 hover:scale-[102%] max-w-[300px] gap-4"
            onClick={() => setIsRealesedModalOpen(true)}
          >
            <FaCheckCircle className="text-green-700" size={32} />
            <div>
              <h2 className="text-2xl font-bold text-green-900">
                {t("released_balance")}
              </h2>
              <p className="text-xl text-green-800">{released}</p>
            </div>
          </div>

          {isRealesedModalOpen && (
            <UpdateReleasedModal
              setClose={() => setIsRealesedModalOpen(false)}
            />
          )}

          <div className="unreleased-balance w-full flex items-center bg-white border border-main p-3 rounded-lg shadow-sm transform transition duration-300 hover:scale-[102%] max-w-[300px] gap-4">
            <FaTimesCircle className="text-main" size={32} />
            <div>
              <h2 className="text-2xl font-bold text-main">
                {t("unreleased_balance")}
              </h2>
              <p className="text-xl text-main">{unreleased}</p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default BalanceSection;







// import { useTranslation } from "react-i18next";
// import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
// import UpdateReleasedModal from "../transactions/UpdateReleasedModal";
// import { useState } from "react";




// const BalanceSection = ({ released, unreleased }: { released: number; unreleased: number }) => {


//   const { t } = useTranslation();
//   const [isRealesedModalOpen, setIsRealesedModalOpen] = useState(true);
//   const [isUnrealesedModalOpen, setIsUnrealesedModalOpen] = useState(false);

//     return (
//       <div className="balance-section flex flex-col md:flex-row justify-center mt-10 items-center mb-8 gap-4 md:gap-7">
//         <div className="w-full released-balance flex items-center p-3 rounded-lg shadow-sm bg-white border border-green-900 transform transition duration-300 hover:scale-[102%] max-w-[300px] gap-4"
//         onClick={() => setIsRealesedModalOpen(true)}
//         >
//           <FaCheckCircle className="text-green-700" size={32} />
//           <div>
//             <h2 className="text-2xl font-bold text-green-900">
//               {t("released_balance")}
//             </h2>
//             <p className="text-xl text-green-800">{released}</p>
//           </div>
//         </div>

//         {isRealesedModalOpen && <UpdateReleasedModal setClose={setIsRealesedModalOpen} released={released} />}

//         <div className="unreleased-balance w-full flex items-center bg-white border border-main p-3 rounded-lg shadow-sm transform transition duration-300 hover:scale-[102%] max-w-[300px] gap-4">
//           <FaTimesCircle className="text-main" size={32} />
//           <div>
//             <h2 className="text-2xl font-bold text-main">
//               {t("unreleased_balance")}
//             </h2>
//             <p className="text-xl text-main">{unreleased}</p>
//           </div>
//         </div>
//       </div>
//     );
// };

// export default BalanceSection;