import { useTranslation } from "react-i18next";
import InputTel from "../../components/ui/inputs/InputTel";

const Phone = ({ phone, setPhone }: any) => {
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-col gap-1">
      <p className="font-semibold">{t("phone")}</p>
      <div dir="ltr">
        <InputTel value={phone} setValue={setPhone} label={t("phone")} />
      </div>
    </div>
  );
};

export default Phone;
