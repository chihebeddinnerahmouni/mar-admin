import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import React from "react";


interface EmailProps {
  email: string;
}


const Email: React.FC<EmailProps> = ({ email }) => {
  
  const { t } = useTranslation();

  return (
    <div className="w-full flex flex-col gap-1">
      <p className="font-semibold">{t("email")}</p>
      <input
        type="text"
        value={email}
        className="email bg-emptyInput w-[100%] p-1 rounded-[5px] border-1 border-darkGrey outline-none"
        placeholder={t("email")}
        readOnly
      />
      <Link to={"/account/change-email"} className="text-[13px] text-main font-medium hover:underline">{t("change_email_address")}</Link>
    </div>
  );
}

export default Email;
