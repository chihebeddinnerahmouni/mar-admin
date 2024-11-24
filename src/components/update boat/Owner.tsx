import { useTranslation } from "react-i18next";



const Owner = ({ details }: any) => {
  const url = import.meta.env.VITE_SERVER_URL_USERS;
  const { t } = useTranslation();


  return (
    <div className="w-full p-3 bg-white mt-5 rounded-10 shadow-sm flex items-center gap-4">
      <img
        src={url + "/" + details.owner.image}
        className="w-[60px] h-[60px] object-cover object-center rounded-50"
        alt="profile"
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
