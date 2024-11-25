import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";



const Password = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-col gap-2">
      <p className="font-semibold">{t("password")}</p>
      <input
        type="password"
        value={"password"}
        className="firstname bg-emptyInput w-full p-1 rounded-[5px] border-1 border-darkGrey outline-none"
        placeholder={t("password")}
        readOnly
      />
      <Link
        to={"/account/change-password"}
        className="text-[13px] text-main font-medium hover:underline"
      >
        {t("change_password")}
      </Link>
    </div>
  );
}
export default Password;
