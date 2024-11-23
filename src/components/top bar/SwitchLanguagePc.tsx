import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";



const SwitchLanguagePc = () => {

     const { i18n } = useTranslation();
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
    <div className="language hidden items-center gap-2 lg:flex lg:mx-5">
      <label className="toggle-btn">
        <input type="checkbox" onChange={changeLanguage} checked={isChecked} />
        <span className="toggle-text"></span>
      </label>
    </div>
  );
};

export default SwitchLanguagePc;
