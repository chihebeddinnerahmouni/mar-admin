import { useTranslation } from "react-i18next";
import React from "react";
import InputText from "../../components/ui/inputs/InputText";

interface Props {
  firstName: string;
  lastName: string;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const Names: React.FC<Props> = ({
  firstName,
  lastName,
  setFirstName,
  setLastName,
}) => {
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-col gap-1">
      <p className="font-semibold">{t("name")}</p>
      <div className="names w-full flex gap-2">
        <InputText
          value={firstName}
          setValue={(e: any) => setFirstName(e.target.value)}
          label={t("first_name")}
        />
        <InputText
          value={lastName}
          setValue={(e: any) => setLastName(e.target.value)}
          label={t("last_name")}
        />
      </div>
    </div>
  );
};

export default Names;
