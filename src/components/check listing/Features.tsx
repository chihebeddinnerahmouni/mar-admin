import { MdFeaturedVideo } from "react-icons/md";
import { useTranslation } from "react-i18next";

const Guests = ({ features }: any) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="w-full p-4 bg-white mt-5 rounded-10 shadow-sm relative">
      <div className="preferedDate flex items-center gap-4">
        <MdFeaturedVideo className="text-writingGrey text-[30px] min-w-[40px]" />
        <div className="datesAgain">
          <p className="font-bold">{t("features")}</p>
          <div className="flex gap-1">
            {features.map((feature: any) => (
              <span key={feature.id} className="text-writingGrey">
                {i18n.language === "ar" ? feature.arabic_name : feature.name}{" "}
                {features.indexOf(feature) === features.length - 1 ? "." : ","}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`absolute top-1 flex gap-2 ${
          i18n.language === "ar" ? "left-2" : "right-2"
        }`}
      ></div>
    </div>
  );
};

export default Guests;
