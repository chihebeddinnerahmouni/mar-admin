import { useTranslation } from "react-i18next";
import Tooltip from "@mui/material/Tooltip";

const Offer = ({ offer }: any) => {
  const { t } = useTranslation();

  // console.log(offer);

  return (
    <div className="w-full p-3 bg-white mt-5 rounded-10 shadow-sm lg:p-6">
      {/* total */}
      <div className="total flex w-full justify-between text-sm lg:text-[18px]">
        <p className="font-semibold">{t("total")}</p>
        <p className="font-semibold">
          {offer.total_cost} {t("rs")}
        </p>
      </div>

      <hr className="mt-2 mb-4 border border-dashed lg:mt-4 lg:mb-6" />

      {/* base cost */}
      <div className="total flex w-full justify-between text-writingGrey text-sm lg:text-base relative">
        <Tooltip title="Add" arrow>
          <span className="font-medium underline cursor-pointer">
            {t("base_cost")}
          </span>
        </Tooltip>
        <p className="font-medium">
          {offer.base_cost} {t("rs")}
        </p>
      </div>

      {/* fees */}
      <div className="total flex w-full justify-between text-writingGrey mt-2 text-sm lg:text-base lg:mt-4 relative">
        <Tooltip title="Add jzjgvgzr iueg iug  lieug iyeg riu mie iug euggfmu uu ezmoug moz " arrow>
          <span className="font-medium underline cursor-pointer">
            {t("service_fee")}
          </span>
        </Tooltip>
        <p className="font-medium">
          {offer.payment_service_fee} {t("rs")}
        </p>
      </div>

      <hr className="mt-4 mb-2 border border-dashed" />

      {/* total */}
      <div className="total flex w-full justify-between text-sm lg:text-base">
        <p className="">{t("total")}</p>
        <p className="">
          {offer.total_cost} {t("rs")}
        </p>
      </div>
    </div>
  );
}

export default Offer;