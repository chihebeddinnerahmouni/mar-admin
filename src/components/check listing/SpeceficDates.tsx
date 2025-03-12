import { useTranslation } from "react-i18next";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";

const SpeceficDates = ({ prices }: any) => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === "ar" ? ar : enUS;

  // console.log(prices);

  return (
    <div className="w-full p-4 bg-white mt-5 rounded-10 shadow-sm relative">
      <p className="text-sm font-medium text-writingMainDark">
        {t("specefic_dates")}
      </p>

      <div className="preferedDate mt-3 flex items-center gap-4">
        <MdOutlineTipsAndUpdates className="text-writingGrey text-[30px] min-w-[40px]" />
        <div className="text flex flex-col gap-2 w-full">
          {prices[0].date_specific_price.length > 0 ? (
            <table className="prices w-full">
              <thead className="border-b">
                <tr>
                  <th
                    className={`text-base font-semibold text-main lg:text-[18px] p-2 ${
                      i18n.language === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {t("specefic_days")}
                  </th>
                  <th className="text-sm text-writingGrey font-medium lg:text-base text-center p-2">
                    {t("price")}
                  </th>
                  <th
                    className={`text-sm text-writingGrey font-medium lg:text-base p-2 ${
                      i18n.language === "ar" ? "text-left" : "text-right"
                    }`}
                  >
                    {t("min")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {prices[0].date_specific_price.map((price: any, index: any) => (
                  <tr key={index} className="bg-white hover:bg-gray-100">
                    <td
                      className={`text-base font-semibold text-writingMainDark lg:text-[18px] p-2 ${
                        i18n.language === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      {format(new Date(price.date), "dd MMM yyyy", { locale })}
                    </td>
                    <td className="text-sm text-writingGrey font-medium lg:text-base text-center p-2">
                      {price.price} {t("rs")}
                    </td>
                    <td
                      className={`text-sm text-writingGrey font-medium lg:text-base p-2 ${
                        i18n.language === "ar" ? "text-left" : "text-right"
                      }`}
                    >
                      {price.min_hours} {t("hours")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-sm text-writingGrey font-medium lg:text-base text-center p-2">
              {t("no_specific_dates")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeceficDates;
