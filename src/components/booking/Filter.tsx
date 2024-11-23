import { useEffect, useState, useRef } from "react"
import { useTranslation } from "react-i18next"
import { FaChevronDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa6";
import options from "../../assets/files/filter_categories";

const Filter = ({selectedFilter, setSelectedFilter}: any) => {

  const { t } = useTranslation()
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
  // const [selectedFilter, setSelectedFilter] = useState<string>(options[0]);



  return (
    <div className="relative w-full">
      <button
        className="flex items-center gap-3 text-sm text-main"
        onClick={(e) => {
          e.stopPropagation();
          setIsFilterOpen(!isFilterOpen);
        } }
      >
        <span>{t(selectedFilter)}</span>{" "}
        {isFilterOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {isFilterOpen && (
        <Menu
          setSelectedFilter={setSelectedFilter}
          setIsFilterOpen={setIsFilterOpen}
          isFilterOpen={isFilterOpen}
        />
      )}
    </div>
  );
}

export default Filter


const Menu = ({ setIsFilterOpen, setSelectedFilter, isFilterOpen }: any) => {

  const { t, i18n } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isFilterOpen]);


  return (
    <div
      ref={ref}
      className={`menu absolute z-10 ${
        i18n.language === "en" ? "right-32 left-0" : "left-32 right-0"
      } top-7 py-3 px-3 rounded-[5px] shadow-hardShadow bg-white flex flex-col items-start gap-2`}
    >
      {options.map((option, index) => (
        <button
          className="text-sm opacity-80 hover:opacity-100"
          key={index}
          onClick={() => {
            setSelectedFilter(option);
            setIsFilterOpen(false);
          }}
        >
          {t(option)}
        </button>
      ))}
    </div>
  );
};