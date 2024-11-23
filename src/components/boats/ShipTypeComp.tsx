import React from "react";
import { useTranslation } from "react-i18next";

interface ShipTypeCompProps {
  shipType: any;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const ShipTypeComp: React.FC<ShipTypeCompProps> = ({
  shipType,
  selected,
  setSelected,
}) => {

  const { t } = useTranslation();
    const url = import.meta.env.VITE_SERVER_URL_CATEGORY;


  return (
    <div
      className={`flex h-full flex-col items-center justify-center gap-1 cursor-pointer lg:gap-2 ${
        selected === shipType.id
          ? "border-b-[1px] border-b-writingMainDark"
          : ""
      }`}
      onClick={() => setSelected(shipType.id)}
    >
      <img
        src={`${url}/${shipType.image}`}
        // src={shipType.image}
        className="w-[20px] h-[20px] object-center object-cover lg:w-[30px] lg:h-[30px]"
        alt="Type"
      />
      <p
        className={`text-[12px] font-medium  lg:text-sm ${
          selected === shipType.id ? "text-writingMainDark" : "text-writingGrey"
        }`}
      >
        {t(shipType.name)}
      </p>
    </div>
  );
};

export default ShipTypeComp;
