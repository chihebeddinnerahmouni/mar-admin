import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import InputPassword from "../../components/ui/inputs/InputPassword";

const Password = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-col gap-2">
      <p className="font-semibold">{t("password")}</p>
      <InputPassword
        value={"password"}
        setValue={() => {}}
        label={t("password")}
        readOnly={true}
      />
      <Link
        to={"/account/change-password"}
        className="text-[13px] text-main font-medium hover:underline"
      >
        {t("change_password")}
      </Link>
    </div>
  );
};
export default Password;
