import { useTranslation } from "react-i18next";
import { MdOutlineEventBusy } from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
// import UpdateAvailability from "./UpdateAvailability";
import { useState } from "react";
import UpdateAvailability from "./UpdateAvailability";

const Availability = ({ availabilities }: any) => {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.language === "ar" ? ar : undefined;
  const isArabic = i18n.language === "ar";
  const [isOpen, setIsOpen] = useState(false);
  const [visibleRows, setVisibleRows] = useState(4);

  const handleSeeMore = () => {
    console.log(isOpen);
    setVisibleRows((prev) => prev + 4);

  };

  const handleSeeLess = () => {
    setVisibleRows(4);
  };

  return (
    <div className="w-full p-6 bg-white mt-5 rounded-lg shadow-sm relative">

      {isOpen && <UpdateAvailability setIsOpen={setIsOpen} availabilities={availabilities} />}  
      <p className="text-lg font-semibold text-gray-800">
        {t("out_of_service")}
      </p>
      <div className="preferedDate mt-4 flex items-center gap-4">
        <div className="icon">
          <MdOutlineEventBusy className="text-writingGrey text-[32px]" />
        </div>

        <div className="w-full">
          <table className="w-full border-collapse max-h-[200px] overflow-auto">
            <thead className="border-b-2 border-gray-200">
              <tr>
                <th className="text-sm text-gray-600 font-medium lg:text-base text-center p-2">
                  {t("start")}
                </th>
                <th
                  className={`text-sm text-gray-600 font-medium lg:text-base p-2 `}
                >
                  {t("end")}
                </th>
              </tr>
            </thead>
            <tbody>
              {availabilities
                .slice(0, visibleRows)
                .map((availability: any, index: any) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    <td className="text-sm font-medium lg:text-base text-center py-2">
                      {format(
                        new Date(availability.start_date),
                        "dd MMM yyyy",
                        {
                          locale: currentLocale,
                        }
                      )}
                    </td>
                    <td
                      className={`text-sm font-medium lg:text-base py-2 text-center`}
                    >
                      {format(new Date(availability.end_date), "dd MMM yyyy", {
                        locale: currentLocale,
                      })}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            {visibleRows < availabilities.length && (
              <button onClick={handleSeeMore} className="text-writingGrey mx-2">
                {t("more")}
              </button>
            )}
            {visibleRows > 4 && (
              <button onClick={handleSeeLess} className="text-writingGrey mx-2">
                {t("hide")}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* the button */}
      <button
        className={`absolute top-2 ${isArabic ? "left-2" : "right-2"}`}
        onClick={() => setIsOpen(true)}
      >
        <HiOutlineDotsHorizontal className="text-gray-500 text-2xl" />
      </button>

      {/* the form */}
      {/* {isOpen && (
        <UpdateAvailability
          setIsOpen={setIsOpen}
          availabilities={availabilities}
        />
      )} */}
    </div>
  );
};

export default Availability;
