import { useTranslation } from "react-i18next";

interface NumbersHandlersProps { 
    value: number;
    setValue: (value: number) => void;
}

const NumbersHandlers:React.FC<NumbersHandlersProps> = ({value, setValue}) => {


    const { i18n } = useTranslation();

    const handleIncrement = () => {
        setValue(value + 1);
    };

    const handleDecrement = () => {
        setValue(value > 0 ? value - 1 : 0);
    };


  return (
    <div className="left w-[113px] relative flex items-center justify-center gap-4">
      <button
        className={`absolute w-[35px] h-[35px] rounded-50 border-1 ${
          value === 0
            ? "border-lightGrey text-lightGrey"
            : "border-main text-main"
        } ${i18n.language === "en" ? "left-0" : "left-0"}`}
        onClick={handleDecrement}
      >
        -
      </button>

      <p>{value}</p>

      <button
        className={`absolute right-0 w-[35px] h-[35px] rounded-50 border-1 border-main text-main ${
          i18n.language === "en" ? "right-0" : "left-0"
        }`}
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
}

export default NumbersHandlers
