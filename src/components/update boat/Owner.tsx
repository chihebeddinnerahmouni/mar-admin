import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";




const Owner = ({ details }: any) => {
  const url = import.meta.env.VITE_SERVER_URL_USERS;
  const { t } = useTranslation();


  return (
    <div className="w-full p-3 bg-white mt-5 rounded-10 shadow-sm flex items-center gap-4">
      <LazyLoadImage
        src={details.owner.image ? url + "/" + details.owner.image : "/anonyme.jpg"}
        alt="profile"
        className="w-[60px] h-[60px] object-cover object-center rounded-50"
        effect="blur"
      />

      <p className="lg:text-[18px]">
        <span className="font-semibold">{t("owner")}: </span>
        <span className="text-writingGrey">
          {details.owner.name} {details.owner.surname}
        </span>
      </p>
    </div>
  );
};

export default Owner;
