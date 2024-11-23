import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const SwitchLangMobile = () => {
  const { i18n, t } = useTranslation();
  const [isChecked, setIsChecked] = useState(
    localStorage.getItem("toggleChecked") === "true"
  );

  useEffect(() => {
    const newLang = isChecked ? "ar" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("i18nextLng", newLang);
  }, [isChecked, i18n]);

  const changeLanguage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    localStorage.setItem("toggleChecked", String(e.target.checked));
  };

  return (
    <div className="language flex items-center gap-2 text-writingMainDark lg:hidden">
      <p>{t("language")}</p>
      <label className="toggle-btn-mobile">
        <input type="checkbox" onChange={changeLanguage} checked={isChecked} />
        <span className="toggle-text-mobile"></span>
      </label>
    </div>
  );
};

export default SwitchLangMobile;
