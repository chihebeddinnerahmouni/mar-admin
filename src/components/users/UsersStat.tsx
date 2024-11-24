import React from "react";
import { BsGraphUpArrow } from "react-icons/bs";
import { BsGraphDownArrow } from "react-icons/bs";
import { useTranslation } from "react-i18next";

interface ItemP {
  Item: {
    id: number;
    title: string;
    icon: React.ElementType;
    number: number;
    growth: number;
    state: string;
    from: string;
    color: string;
    bgColor: string;
  };
}

const UsersStat: React.FC<ItemP> = ({ Item }) => {

  const IconComponent = Item.icon;
  const { i18n, t } = useTranslation();

  return (
    <div className="min-w-[200px] p-4 bg-white shadow-sm border rounded-10 relative transition-transform transform hover:scale-[102%] cursor-default md:flex-grow ">
      <p className="text-sm text-nowrap font-semibold opacity-70 lg:text-base">
        {t(Item.title)}
      </p>
      <p className="font-bold text-[22px] lg:text-[32px] mt-2">{Item.number}</p>

      <div
        className={`icon absolute top-2 p-2 rounded-20 lg:p-3 ${i18n.language === "ar" ? "left-2" : "right-2"}`}
        style={{ backgroundColor: Item.bgColor }}
      >
        <IconComponent
          className="text-[35px] lg:text-[45px]"
          style={{ color: Item.color }}
        />
      </div>

      <div className="flex items-center mt-5 gap-1">
        {Item.state === "up" ? (
          <BsGraphUpArrow className="text-green-500 lg:text-lg" />
        ) : (
          <BsGraphDownArrow className="text-red-500 lg:text-lg" />
        )}
        <p
          className={`text-sm lg:text-lg ${
            Item.state === "up" ? "text-green-500" : "text-red-500"
          }`}
        >
          {Item.growth}%
        </p>
        <p className="text-sm lg:text-lg">{t("from")} {Item.from}</p>
      </div>
    </div>
  );
};

export default UsersStat;
